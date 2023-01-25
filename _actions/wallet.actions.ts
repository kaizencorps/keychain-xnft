import {useRecoilState, useRecoilTransaction_UNSTABLE, useSetRecoilState} from 'recoil';
import { PublicKey } from '@solana/web3.js';
import {AnchorWallet, useWallet} from '@solana/wallet-adapter-react';
// import { toast } from 'react-toastify';

import { useFetchWrapper, createErrorResponse } from '../_helpers';

import {
    // authAtom,
    walletAtom,
} from '../_state';

import { LOCAL_STORAGE_KEYS } from '../_state/_constants';
import { consoleLog } from '../_helpers/debug';
import {createProvider, getKeychainProgram} from "../programs/keychain-utils";
import {Wallet} from "@project-serum/anchor";
import {providerAtom} from "../_state";
import {programsAtom} from "../_state";
import {getNFTsForOwner} from "../utils/web3/chain-utils";

//Constants
import Constants from 'expo-constants';

function useWalletActions() {
    const baseUrl = `${Constants.expoConfig.extra.BASE_API_URL}/wallet`;
    const fetchWrapper = useFetchWrapper();
    const [wallet, setWallet] = useRecoilState(walletAtom);
    const setProvider = useSetRecoilState(providerAtom);
    const setPrograms = useSetRecoilState(programsAtom);

    // const setAuth = useSetRecoilState(authAtom);
    // const [provider, setProvider] = useRecoilState(providerAtom);

    const { disconnect } = useWallet();

    // set the wallet + provider + programs atomically
    /*
    const setWalletStates = useRecoilTransaction_UNSTABLE(({get, set}) => (anchorWallet: AnchorWallet) => {
        const walletPublicKey: PublicKey = anchorWallet.publicKey;

        consoleLog('setting provider, creating programs, connecting  wallet: ', walletPublicKey.toBase58());

        // set the wallet
        set(walletAtom, { address: walletPublicKey });

        // create and set the provider
        const provider = createProvider(anchorWallet as Wallet);
        set(providerAtom, provider);

        // create and set the keychain program

        const keychainProgram = getKeychainProgram(provider);
        consoleLog(`created keychain program: ${keychainProgram.programId.toBase58()}`);

        // todo: get the profile program
        set(programsAtom, { keychain: keychainProgram, profile: null});
    });
     */

    function setWalletStates(anchorWallet: AnchorWallet) {
        const walletPublicKey: PublicKey = anchorWallet.publicKey;

        // create and set the provider
        const provider = createProvider(anchorWallet as Wallet);
        setProvider(provider);

        // create and set the keychain program
        const keychainProgram = getKeychainProgram(provider);
        setPrograms({ keychain: keychainProgram, profile: null})

        // set this last, as other atoms that depend on the wallet also depend on the provider and programs
        const walletState = { address: walletPublicKey };
        setWallet(walletState);

    }

    // connects a wallet. returns false if the wallet doesn't get properly connected
    async function connectWallet(anchorWallet: AnchorWallet, signMessage: ((message: Uint8Array) => Promise<Uint8Array> ) | undefined = null) {

        try {
            const walletPublicKey: PublicKey = anchorWallet.publicKey;
            consoleLog('connecting wallet: ', walletPublicKey.toBase58());

            // this will set the wallet, provider, and programs atomically
            setWalletStates(anchorWallet);

            // await keychainActions.checkKeychainByKey(anchorWallet.publicKey);

            // try to get a keychain

            // test if this works
            // await getNFTsForOwner(anchorWallet.publicKey);

            // consoleLog(`setting anchor wallet:`, anchorWallet);
            // setProvider(anchorWallet);

            /* - sign message to login
            if (!walletPublicKey || !signMessage) {
                // `publicKey` will be null if the wallet isn't connected
                if (!walletPublicKey) toast('Wallet not connected!');
                // `signMessage` will be undefined if the wallet doesn't support it
                if (!signMessage) toast('Wallet does not support message signing!');
                await disconnectWallet();
                return false;
            }

            // Sign Message
            // Create a nonce --- server will need to store used nonces
            const nonce = Keypair.generate();
            // Encode nonce
            const message = new TextEncoder().encode(nonce.publicKey.toBase58());
            // Sign the bytes using the wallet
            return signMessage(message)
                .then(async (signMessageResponse) => {
                    // Verify that the bytes were signed using the private key that matches the known public key
                    if (!sign.detached.verify(message, signMessageResponse, walletPublicKey.toBytes()))
                        throw new Error('Invalid signature!');
                    const decoder = new TextDecoder('utf-8');
                    consoleLog('sign message response: ', signMessageResponse);
                    const sigArray = Array.from(signMessageResponse);
                    consoleLog('sign message response array: ', sigArray);
                    const response = await fetchWrapper.post(`${baseUrl}/connect`, {
                        walletAddress: walletPublicKey.toBase58(),
                        message: decoder.decode(message),
                        signature: sigArray,
                    });
                    consoleLog('got wallet connect response: ', response);
                    if (response && response.success) {
                        consoleLog('setting wallet atom: ', walletPublicKey.toBase58());
                        setWallet(walletPublicKey);
                        if (response.data && response.data.walletStatus) {
                            setWalletStatus(setLocalWalletStatus(response.data));
                        }
                        setAuthState(response, walletPublicKey.toBase58());
                        return response;
                    }
                    consoleLog('connect wallet error');
                    bugsnagActions.notify('Connect wallet error');
                    consoleLog('Disconnecting wallet');
                    await disconnectWallet();
                    navigate('/');
                    return false;
                })
                .catch(async (signMessageError) => {
                    consoleLog('Sign Message Error', signMessageError);
                    bugsnagActions.notify('Sign Message Error', signMessageError);
                    consoleLog('Disconnecting wallet');
                    await disconnectWallet();
                    navigate('/');
                    return false;
                })
                .finally(() => {
                    consoleLog('no longer logging in');
                    setLoggingIn(false);
                });
             */

        } catch (error) {
            consoleLog('Error connecting wallet: ', error);
            return createErrorResponse(error as string);
        }
    }


    /*
        function setAuthState(response: any, walletBase58: string) {
            if (response.data && response.data.player) {
                setLoggedIn(true);
                setPlayer(setLocalPlayerData(response.data.player));
                setAuth(createAndSetLocalAuthData(response.data.accessToken));
                setBadges(setLocalBadgesData(response.data.badges));
                analyticsActions.identify(response.data.player.id);
                analyticsActions.alias(walletBase58, response.data.player.id);
                bugsnagActions.setUser(response.data.player.id, walletBase58);
            }
            if (response.data && response.data.stats) {
                setPlayerStats(response.data.stats);
            }
        }
    */

    async function disconnectWallet() {
        await disconnect();
        setPrograms({keychain: null, profile: null});
        setProvider(null);
        setWallet(null);
        // setAuth({});
        localStorage.removeItem(LOCAL_STORAGE_KEYS.authData);
        localStorage.removeItem(LOCAL_STORAGE_KEYS.walletStatus);
    }


    // adds an unverified wallet to the player's keychain AND creates a new keychain in the same tx if it doesn't exist yet
    async function addWalletToKeychain(walletAddress: string) {
        // the wallet to add to the keychain
        let addingWalletPublicKey = null;

        // first: check that this wallet hasn't been registered yet
        const available = await fetchWrapper.post(`${baseUrl}/check-wallet`, { walletAddress }).then((response) => {
            consoleLog('check wallet response: ', response);
            return response.data.available;
        });

        if (!available) {
            consoleLog('not available');
            return createErrorResponse('That wallet is already registered.');
        }
        consoleLog('available!');

        try {
            addingWalletPublicKey = new PublicKey(walletAddress);
        } catch (err) {
            consoleLog(`invalid wallet? ${err}`);
            return createErrorResponse('Invalid Wallet Address');
        }

/*
        try {
            const keychainProgram = getKeychainProgram(provider, isIframe && launched ? xNFTConnection : connection);

            // construct the transaction
            const tx = new web3.Transaction();
            let playerKeychainPda = player.keychainAddress ? new PublicKey(player.keychainAddress) : null;
            const initialKeychainKeyPda = findKeychainKeyPda(wallet);
            let newKeychain = false;
            if (!playerKeychainPda) {
                newKeychain = true;
                // then we need to create the keychain first
                playerKeychainPda = findKeychainPda(player.username);
                consoleLog(`adding create keychain ix to tx for new keychain: ${playerKeychainPda.toBase58()}`);
                consoleLog(`keychain domain pda: ${KeychainDomainPda.toBase58()}`);

                // keychain shouldn't exist but this check won't hurt
                const accountInfo =
                    isIframe && launched
                        ? await xNFTConnection.getAccountInfo(playerKeychainPda)
                        : await connection.getAccountInfo(playerKeychainPda);
                if (!accountInfo) {
                    // expected - add the ix
                    consoleLog(`creating new keychain: ${playerKeychainPda.toBase58()}`);
                    tx.add(
                        await keychainProgram.methods
                            .createKeychain(player.username)
                            .accounts({
                                keychain: playerKeychainPda,
                                key: initialKeychainKeyPda,
                                domain: KeychainDomainPda,
                                // note: this is done by the CONNECTED wallet (to create the keychain & sign txs)
                                authority: wallet,
                                wallet,
                                systemProgram: SystemProgram.programId,
                            })
                            .instruction(),
                    );
                } else {
                    // then somehow we don't know about this keychain, but assume it's for the current player and skip the creation ix
                    // though we can add additional checks later
                }
            } // -- end block to handle keychain creation ix

            // now just add the addkey ix to the tx

            consoleLog(`keychain address: ${playerKeychainPda.toBase58()}`);

            tx.add(
                await keychainProgram.methods
                    .addKey(addingWalletPublicKey)
                    .accounts({
                        domain: KeychainDomainPda,
                        keychain: playerKeychainPda,
                        authority: wallet,
                    })
                    .instruction(),
            );

            // now send the transaction
            tx.feePayer = wallet;
            tx.recentBlockhash =
                isIframe && launched
                    ? (await xNFTConnection.getLatestBlockhash()).blockhash
                    : (await connection.getLatestBlockhash()).blockhash;
            // const signedTx = await provider.wallet.signTransaction(tx);
            // txid = await provider.connection.sendRawTransaction(signedTx.serialize());
            consoleLog(`tx: `, tx);
            consoleLog(`provider:`, provider);
            consoleLog(`program:`, keychainProgram);

            const signedTx = await provider.signTransaction(tx);
            consoleLog(`signed tx:`, signedTx);

            const txid =
                isIframe && launched
                    ? await xNFTConnection.sendRawTransaction(signedTx.serialize())
                    : await connection.sendRawTransaction(signedTx.serialize());
            const latestBlockHash =
                isIframe && launched ? await xNFTConnection.getLatestBlockhash() : await connection.getLatestBlockhash();

            const txConf =
                isIframe && launched
                    ? await xNFTConnection.confirmTransaction({
                        blockhash: latestBlockHash.blockhash,
                        lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
                        signature: txid,
                    })
                    : await connection.confirmTransaction({
                        blockhash: latestBlockHash.blockhash,
                        lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
                        signature: txid,
                    });

            consoleLog(`added wallet ${walletAddress} to keychain: ${playerKeychainPda.toBase58()}, txid: ${txid}`);
            consoleLog(`txConf: `, txConf);

            //  analytics - 1 event if keychain was created and another for the added key
            if (newKeychain) {
                analyticsActions.trackEvent(EVENTS.keychainCreated, {
                    keychain: playerKeychainPda.toBase58(),
                    playername: player.username,
                });
            }

            // we added a new key to an existing keychain
            analyticsActions.trackEvent(EVENTS.walletAdded, {
                keychain: playerKeychainPda.toBase58(),
                playername: player.username,
                wallet: wallet.toBase58(),
            });

            return await fetchWrapper
                .post(`${baseUrl}/added-wallet`, { keychainAddress: playerKeychainPda.toBase58(), walletAddress, txid })
                .then((response) => {
                    consoleLog('added unverified wallet:', response);
                    // refresh login info to get the pending wallets
                    setPlayer(setLocalPlayerData(response.data.player));
                    return createSuccessResponse(response.data);
                });
        } catch (error) {
            consoleLog('Error creating keychain account: ', error);
            toast(error, { type: 'error' });
            return createErrorResponse(error);
        }
*/
    }

    // called by an unregistered user
    async function verifyKeychainWallet(keychainAddress: string) {
/*
        try {
            const keychainProgram = getKeychainProgram(provider, isIframe && launched ? xNFTConnection : connection);
            consoleLog(`keychainaddress: `, keychainAddress);
            const keychainPda = new web3.PublicKey(keychainAddress);

            const accountInfo =
                isIframe && launched
                    ? await xNFTConnection.getAccountInfo(keychainPda)
                    : await connection.getAccountInfo(keychainPda);
            if (!accountInfo) {
                return createErrorResponse("Can't add wallet. An account for that Playername doesn't exist.");
            }

            consoleLog(`verifying wallet ${wallet.toBase58()} on keychain ${keychainPda.toBase58()}`);
            const keychainKeyPda = findKeychainKeyPda(wallet);

            const txid = await keychainProgram.methods
                .verifyKey()
                .accounts({
                    keychain: keychainPda,
                    key: keychainKeyPda,
                    domain: KeychainDomainPda,
                    treasury: KEYCHAIN_TREASURY,
                    authority: wallet,
                    systemProgram: SystemProgram.programId,
                })
                .rpc();

            consoleLog(`verified wallet ${wallet.toBase58()} on keychain, txid: ${txid}`);

            return await fetchWrapper
                .post(`${baseUrl}/verified-wallet`, {
                    keychainAddress: keychainPda.toBase58(),
                    walletAddress: wallet.toBase58(),
                    txid,
                })
                .then((response) => {
                    consoleLog(`added verified wallet: ${response}`);
                    // refresh login info to get the pending wallets
                    setPlayer(setLocalPlayerData(response.data.player));
                    if (response.data.walletStatus && response.data.walletStatus === 'VERIFIED') {
                        setWalletStatus(setLocalWalletStatus({ walletStatus: 'VERIFIED' }));
                    }
                    setAuth(createAndSetLocalAuthData(response.data.accessToken));
                    setBadges(setLocalBadgesData(response.data.badges));
                    return createSuccessResponse(response.data);
                })
                .catch((err) => {
                    consoleLog('Verified Wallet error', err);
                    return disconnectWallet();
                });
        } catch (error) {
            consoleLog('Verify keychain wallet: ', error);
            await disconnectWallet();
            return createErrorResponse('Could not verify Keychain wallet');
        }
*/
    }

    /**
     * Calls the /wallet/keychain created keychain endpoint to refresh plaer recoil state
     * @param {string} keychainAddress
     * @returns Promise<boolean>
     */
    async function createdKeychain(keychainAddress: string) {
/*
        return fetchWrapper
            .post(`${baseUrl}/keychain`, {
                keychainAddress,
            })
            .then((response) => {
                if (response.data && response.data.player) {
                    setPlayer(setLocalPlayerData(response.data.player));
                    return true;
                }
                return false;
            })
            .catch((error) => {
                consoleLog('Error with created keychain', error);
                return true;
            });
*/
    }

    return {
        connectWallet,
        disconnectWallet,
        addWalletToKeychain,
        verifyKeychainWallet,
        createdKeychain,
    };
}

export { useWalletActions };
