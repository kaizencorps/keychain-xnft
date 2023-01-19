import {SetterOrUpdater, useRecoilState, useRecoilValue, useSetRecoilState} from 'recoil';

import {
    userAtom, walletAtom,
} from '../_state';
import {findKeychainKeyPda, findKeychainPda, findKeychainStatePda, KeychainDomainPda} from "../programs/keychain-utils";
import {consoleLog} from "../_helpers/debug";
import {PublicKey, SystemProgram} from "@solana/web3.js";
import {keychainAtom, Programs, programsAtom} from "../_state";
import {KeychainState} from "../types/NFT";
import {KEYCHAIN_TREASURY} from "../types/utils/config";


function useKeychainActions() {

    const [user, setUser] = useRecoilState(userAtom);
    const wallet = useRecoilValue(walletAtom);
    const [keychain, setKeychain] = useRecoilState(keychainAtom);
    const progs = useRecoilValue(programsAtom) as Programs;

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
    async function checkKeychainByName(name: string) {

        const [keychainPda] = findKeychainPda(name);
        return await refreshKeychain(keychainPda);
    }

    // checks for keychain existence given a wallet address (potential key)
    async function checkKeychainByWallet() {
        consoleLog('checking keychain by wallet');
        consoleLog('got progs');
        const [keychainKeyPda ] = findKeychainKeyPda(wallet.address);
        consoleLog('got keychain key pda');
        const keychainProg = progs.keychain;
        consoleLog('got keychain prog');

        // see if this account exists
        // let keychainKeyAcct = await connection.getAccountInfo(keychainKeyPda);

        let keychainKeyAcct = null;
        try {
            keychainKeyAcct = await keychainProg.account.keychainKey.fetch(keychainKeyPda);
        } catch (e) {
            // then this key doesn't exist
        }

        // see if we can get the key account - if so then this wallet is on a keychain and verified
        if (keychainKeyAcct) {
            consoleLog(`found keychain key account: ${keychainKeyPda.toBase58()}`);

            const keychainPda  = keychainKeyAcct.keychain;
            return await refreshKeychain(keychainPda);

        } else {
            // no keychain
            setKeychain(null);
            return null;
        }
    }

    async function checkKeychainByKey(walletAddress: PublicKey = null) {

        consoleLog(`progs: ${progs}`);
        const keychainProg = progs.keychain;


        // first: see if wallet is connected to a keychain
        const [keychainKeyPda ] = findKeychainKeyPda(walletAddress || wallet.address);
        let keychainKeyAcct = null;
        try {
            keychainKeyAcct = await keychainProg.account.keychainKey.fetch(keychainKeyPda);
        } catch (e) {
            // then this key doesn't exist
        }

        if (keychainKeyAcct) {
            consoleLog(`found keychain key account: ${keychainKeyPda.toBase58()}`);
            return await refreshKeychain(keychainKeyAcct.keychain);
        } else {
            setKeychain(null);
            return null;
        }

    }

    // create a new keychain
    async function createKeychain(name: string) {
        const progs = useRecoilValue(programsAtom) as Programs;
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

        // todo: set the keychain state
    }

    // refresh the keychain state and return it. if an account is passed in, use it otherwise, use what's already in state
    async function refreshKeychain(keychainAccount: PublicKey = null) {

        const progs = useRecoilValue(programsAtom) as Programs;
        const keychainProg = progs.keychain;
        let keychainPda = keychainAccount ? keychainAccount : keychain.keychainAccount;

        let keychainAcct = null;
        try {
            keychainAcct = await keychainProg.account.currentKeychain.fetch(keychainPda);
        } catch (err) {
            // then this keychain doesn't exist
        }

        if (keychainAcct) {
            const state: KeychainState = {
                keychainAccount: keychainPda as PublicKey,
                name: keychainAcct.name as string,
                exists: true,
                walletAttached: true,
                walletVerified: true,
                keys: []
            }
            let walletAttached = false;
            let walletVerified = false;
            for (let x = 0; x < keychainAcct.numKeys; x++) {
                const key = keychainAcct.keys[x];
                if (key.key == wallet.address) {
                    walletAttached = true;
                    if (key.verified) {
                        walletVerified = true;
                    }
                }
                state.keys.push({
                    wallet: key.key,
                    verified: key.verified,
                });
            }
            state.walletVerified = walletVerified;
            state.walletAttached = walletAttached;
            setKeychain(state);
            return state;
        } else {
            setKeychain(null)
            return null;
        }

    }

    // adds an unverified key to the keychain. return true if successful, false if not
    async function addKey(walletAddress: string) {
        const addingWalletAddress = new PublicKey(walletAddress);

        const progs = useRecoilValue(programsAtom) as Programs;
        const keychainProg = progs.keychain;

        try {
            let txid = await keychainProg.methods.addKey(addingWalletAddress, {
                keychain: keychain.keychainAccount,
                domain: KeychainDomainPda,
                authority: wallet.address,
            });
            console.log(`added key ${addingWalletAddress} to keychain ${keychain.keychainAccount}: ${txid}`);
            // now refresh the keychain state
            await refreshKeychain();
            return true;

        } catch (err) {
            consoleLog(`error adding key ${addingWalletAddress} to keychain ${keychain.keychainAccount}: ${err}`);
            return false;
        }
    }

    // verifies the connected wallet on the keychain. returns true if successful, false if not
    async function verifyKey() {
        const progs = useRecoilValue(programsAtom) as Programs;
        const keychainProg = progs.keychain;

        const [keyPda] = findKeychainKeyPda(wallet.address);

        try {
            let txid = await keychainProg.methods.verifyKey({
                keychain: keychain.keychainAccount,
                domain: KeychainDomainPda,
                treasury: KEYCHAIN_TREASURY,
                authority: wallet.address,
                key: keyPda,
                userKey: wallet.address,
                systemProgram: SystemProgram.programId,
            });
            console.log(`verified key ${wallet.address} on keychain ${keychain.keychainAccount}: ${txid}`);
            // now refresh the keychain state
            await refreshKeychain();
            return true;
        } catch (err) {
            consoleLog(`error verifying key ${wallet.address} on keychain ${keychain.keychainAccount}: ${err}`);
            return false;
        }
    }

    return {
        setUsername,
        checkKeychainByName,
        checkKeychainByKey,
        createKeychain,
        checkKeychainByWallet,
        addKey,
        verifyKey
    };
}

export { useKeychainActions };
