import {SetterOrUpdater, useRecoilState, useRecoilValue, useResetRecoilState, useSetRecoilState} from 'recoil';

import {
    providerAtom,
    userAtom, walletAtom,
} from '../_state';
import {findKeychainKeyPda, findKeychainPda, findKeychainStatePda, KeychainDomainPda} from "../programs/keychain-utils";
import {consoleLog} from "../_helpers/debug";
import {PublicKey, SystemProgram} from "@solana/web3.js";
import {keychainAtom, Programs, programsAtom} from "../_state";
import {KeychainState} from "../types/NFT";
import {connection, KEYCHAIN_TREASURY} from "../types/utils/config";
import {useWalletActions} from "./wallet.actions";
import {Provider} from "@project-serum/anchor";
import {sleep} from "../utils/misc";


function useKeychainActions() {

    // hack confirmation time of 3.5 seconds
    const CONFIRM_TIME = 3500;

    const [user, setUser] = useRecoilState(userAtom);
    const wallet = useRecoilValue(walletAtom);
    const [keychain, setKeychain] = useRecoilState(keychainAtom);
    const resetKeychainState = useResetRecoilState(keychainAtom);
    const progs = useRecoilValue(programsAtom) as Programs;
    const walletActions = useWalletActions();

    const provider = useRecoilValue(providerAtom);

    function setUsername(username: string) {
        setUser({username})
    }

    // given a name for a keychain, attempts to fetch the keychain and see if it exists or not
    // 3 options here:
    // 1. keychain exists, user's key is on the keychain and needs to be verified, so we match the logged in key to one needing to be verified, and allow the user to verify
    // 2. keychain exists, but DOESN'T have connected wallet as a key. in that case, there's 2 reasons:
    //    - a. the user is trying to create a new keychain but the name is taken
    //    - b. the user is trying to access his own keychain, but hasn't added this key to it for verification yet
    // 3. no keychain with the given name exists
    async function checkKeychainByName(name: string): Promise<KeychainState> {

        const [keychainPda] = findKeychainPda(name);
        return await refreshKeychain(keychainPda);
    }

    // checks for keychain existence given a wallet address (potential key)
    /*
    async function checkKeychainByWallet() {
        consoleLog('checking keychain by wallet');
        consoleLog('got progs');
        const [keychainKeyPda ] = findKeychainKeyPda(wallet.address);
        const keychainProg = progs.keychain;

        // see if this account exists
        // let keychainKeyAcct = await connection.getAccountInfo(keychainKeyPda);

        let keychainKeyAcct = null;
        try {
            keychainKeyAcct = await keychainProg.account.keyChainKey.fetch(keychainKeyPda);
        } catch (e) {
            consoleLog('error fetching keychain key (exists?): ', e);
            // then this key doesn't exist
        }

        // see if we can get the key account - if so then this wallet is on a keychain and verified
        if (keychainKeyAcct) {
            const keychainPda  = keychainKeyAcct.keychain;
            return await refreshKeychain(keychainPda);

        } else {
            // no keychain
            // todo: change
            setKeychain(null);
            return null;
        }
    }
     */

    async function checkKeychainByKey(walletAddress: PublicKey = null): Promise<KeychainState> {

        const keychainProg = progs.keychain;

        const walletToCheck = walletAddress || wallet.address;
        const [keychainKeyPda ] = findKeychainKeyPda(walletAddress || wallet.address);

        // first: see if wallet is connected to a keychain
        let keychainKeyAcct = null;
        try {
            keychainKeyAcct = await keychainProg.account.keyChainKey.fetch(keychainKeyPda);
        } catch (e) {
            consoleLog(`error fetching keychain key (exists?): ${e}`);
            // then this key doesn't exist
        }

        if (keychainKeyAcct) {
            return await refreshKeychain(keychainKeyAcct.keychain);
        } else {
            consoleLog(`couldn't find keychain key account: ${keychainKeyPda.toBase58()}`);
            const keychainState = createKeychainState(null, '', false, false, false, []);
            setKeychain(keychainState);
            return keychainState;
        }
    }

    function createKeychainState(keychainAccount, name, exists, walletAdded, walletVerified, keys=[], checked=true): KeychainState {
        const state = {
            keychainAccount,
            name,
            exists,
            walletAdded,
            walletVerified,
            checked,
            keys
        };
        return state;
    }

    // create a new keychain
    async function createKeychain(name: string): Promise<boolean> {
        const [keychainPda] = findKeychainPda(name);
        const [keychainStatePda] = findKeychainStatePda(keychainPda);
        const [keychainKeyPda] = findKeychainKeyPda(wallet.address);

        const keychainProg = progs.keychain;

        // todo: check if keychain already exists ..?

        const txid = await keychainProg.methods.createKeychain(name).accounts({
            keychain: keychainPda,
            keychainState: keychainStatePda,
            key: keychainKeyPda,
            domain: KeychainDomainPda,
            authority: wallet.address,
            wallet: wallet.address,
            systemProgram: SystemProgram.programId,
        }).rpc();

        console.log(`created keychain txid: ${txid}`);

        setKeychain(
            createKeychainState(
                keychainPda,
                name,
                true,
                true,
                true,
                [{wallet: wallet.address, verified: true}]));

        return true;
    }

    async function resetKeychain(disconnectWallet = false): Promise<boolean> {
        if (disconnectWallet) {
            await walletActions.disconnectWallet();
        }
        resetKeychainState();
        return true;
    }

    // refresh the keychain state and return it. if an account is passed in, use it otherwise, use what's already in state
    async function refreshKeychain(keychainAccount: PublicKey = null): Promise<KeychainState> {

        const keychainProg = progs.keychain;
        let keychainPda = keychainAccount ? keychainAccount : keychain.keychainAccount;

        let keychainAcct = null;
        try {
            keychainAcct = await keychainProg.account.currentKeyChain.fetch(keychainPda);
        } catch (err) {
            consoleLog(`error fetching keychain: ${err}`);
            // then this keychain doesn't exist
        }

        if (keychainAcct) {
            const state: KeychainState = {
                keychainAccount: keychainPda as PublicKey,
                name: keychainAcct.name as string,
                exists: true,
                walletAdded: true,
                walletVerified: true,
                checked: true,
                keys: []
            }
            let walletAdded = false;
            let walletVerified = false;
            for (let x = 0; x < keychainAcct.numKeys; x++) {
                const key = keychainAcct.keys[x];
                if (key.key.equals(wallet.address)) {
                    walletAdded = true;
                    if (key.verified) {
                        walletVerified = true;
                    }
                }
                state.keys.push({
                    wallet: key.key,
                    verified: key.verified,
                    index: x
                });
            }
            state.walletVerified = walletVerified;
            state.walletAdded = walletAdded;
            setKeychain(state);
            return state;
        } else {
            // resetKeychain();
            const keychainState = createKeychainState(null, '', false, false, false, []);
            setKeychain(keychainState);
            return keychainState;
        }
    }
    async function removeKeyByIndex(index: number) {
        // get the key by index
        for (let x = 0; x < keychain.keys.length; x++) {
            if (keychain.keys[x].index === index) {
                return await removeKey(keychain.keys[x].wallet);
            }
        }
        // todo: handle unknown key ..? shouldn't happe
    }

    async function removeKey(keyWallet: PublicKey): Promise<boolean> {
        const [keychainKeyPda] = findKeychainKeyPda(keyWallet);
        const [keychainStatePda] = findKeychainStatePda(keychain.keychainAccount);

        try {
            const keychainProg = progs.keychain;
            const txid = await keychainProg.methods.removeKey(keyWallet).accounts({
                keychain: keychain.keychainAccount,
                keychainState: keychainStatePda,
                key: keychainKeyPda,
                domain: KeychainDomainPda,
                authority: wallet.address,
                treasury: KEYCHAIN_TREASURY,
            }).rpc();
            console.log(`removed key txid: ${txid}`);
            await refreshKeychain();
            return true;
        } catch (err) {
            if (isKnownError(err)) {
                // hack to "confirm" a tx
                await sleep(CONFIRM_TIME);
                await refreshKeychain();
                // don't worry be happy
                return true;
            } else {
                consoleLog(`error removing key ${keyWallet.toBase58()}: ${err}`);
                throw err;
            }
        }
    }

    // adds an unverified key to the keychain. return true if successful, false if not
    async function addKey(addingWalletAddress: PublicKey): Promise<boolean> {
        const keychainProg = progs.keychain;

        try {
            // construct the tx this way and send cause calling the .rpc() method results in a weird typeError trying to set the connection _nextClientSubscriptionId
            // though turns out this doesn't seem to help atm... maybe need to play with confirmation
            let tx = await keychainProg.methods.addKey(addingWalletAddress).accounts({
                keychain: keychain.keychainAccount,
                domain: KeychainDomainPda,
                authority: wallet.address,
            }).transaction();

            const notNullProvider = provider as Provider;
            consoleLog('sending tx...');
            let txid = await notNullProvider.sendAndConfirm(tx);

            /*
            consoleLog(`confirming tx: ${txid}`);
            const latestBlockHash = await connection.getLatestBlockhash();
            await connection.confirmTransaction(txid, {
              blockhash: latestBlockHash.blockhash,
              lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
              signature: txid,
            });
             */

            consoleLog(`tx confirmed: ${txid}`);

            // let txid = await keychainProg.methods.addKey(addingWalletAddress).accounts({
            //     keychain: keychain.keychainAccount,
            //     domain: KeychainDomainPda,
            //     authority: wallet.address,
            // }).rpc();
            console.log(`added key ${addingWalletAddress.toBase58()} to keychain ${keychain.keychainAccount}: ${txid}`);
            // now refresh the keychain state
            await refreshKeychain();
            return true;
        } catch (err) {
            if (isKnownError(err)) {
                // hack to "confirm" a tx
                await sleep(CONFIRM_TIME);
                await refreshKeychain();
                // don't worry be happy
                return true;
            } else {
                consoleLog(`error adding key ${addingWalletAddress} to keychain ${keychain.keychainAccount}: ${err}`);
                throw err;
            }
        }
    }

    // handle weird errors (that might not be real errors)
    function isKnownError(err) {
        // weird error that's not an error: TypeError: Cannot assign to read only property '_nextClientSubscriptionId'
        const errorString = err.toString();
        if (errorString.includes('_nextClientSubscriptionId')) {
            return true;
        }
        return false;
    }

    // verifies the connected wallet on the keychain. returns true if successful, false if not
    async function verifyKey(): Promise<boolean> {
        const keychainProg = progs.keychain;

        const [keyPda] = findKeychainKeyPda(wallet.address);

        try {
            let txid = await keychainProg.methods.verifyKey().accounts({
                keychain: keychain.keychainAccount,
                domain: KeychainDomainPda,
                treasury: KEYCHAIN_TREASURY,
                authority: wallet.address,
                key: keyPda,
                userKey: wallet.address,
                systemProgram: SystemProgram.programId,
            }).rpc();
            // console.log(`verified key ${wallet.address} on keychain ${keychain.keychainAccount}: ${txid}`);
            // now refresh the keychain state
            await refreshKeychain();
            return true;
        } catch (err) {
            if (isKnownError(err)) {
                // hack to "confirm" a tx
                await sleep(CONFIRM_TIME);
                await refreshKeychain();
                // don't worry be happy
                return true;
            } else {
                consoleLog(`error verifying key ${wallet.address} on keychain ${keychain.keychainAccount}: ${err}`);
                throw err;
            }
        }
    }

    return {
        setUsername,
        checkKeychainByName,
        checkKeychainByKey,
        createKeychain,
        addKey,
        verifyKey,
        resetKeychain,
        removeKey,
        refreshKeychain,
        removeKeyByIndex,
    };
}

export { useKeychainActions };
