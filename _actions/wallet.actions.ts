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
    }

    async function login(signMessage: (message: Uint8Array) => Promise<Uint8Array>) {
        // todo: complete
        // algo: check the auth state to see if we're logged in yet or not. if not:
        // fetch the nonce -> sign it -> send it back to the login endpoint -> get the jwt -> store it in local storage for future requests
        // https://github.com/michaelhly/solana-py/issues/118
        const message = 'hello world';
        const encoded = new TextEncoder().encode(message);
        const signature = await signMessage(encoded);
        const decoder = new TextDecoder('utf-8');
        const sigArray = Array.from(signature);
        consoleLog('decoded: ', decoder.decode(encoded));
        consoleLog('signature: ', signature);
        consoleLog('sigarray: ', sigArray);

    }

    return {
        connectWallet,
        disconnectWallet,
        addWalletToKeychain,
        login
    };
}

export { useWalletActions };
