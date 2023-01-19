import {atom, selector, selectorFamily} from 'recoil';
import {PublicKey} from "@solana/web3.js";
import {userAtom, UserState} from "./user";
import { getNFTsForOwner } from "../types/utils/chain-utils";
import {consoleLog} from "../_helpers/debug";
import { KeychainState, NFT, WalletState } from '../types/NFT';
import {walletAtom} from "./wallet";


// set to wallet's PublicKey
export const keychainAtom = selector<KeychainState>({
    key: 'keychain',
    get: ({get}) => {

        const walletState: WalletState = get(walletAtom);

        // todo: logic to check for keychain existence using the username in userState

        // for now, fake a keychain
        if (walletState.address) {
            consoleLog('fake fetching keychain...');
            return {
                keychainAccount: new PublicKey('YfixBHW1YKJZHmZE9dksSZandNdz6XBvEs91w2b124T'),
                exists: true,
                keys: [
                    {
                        wallet: new PublicKey('6JUZSv2KZp5x4AurxWWWjNyADu8FPkKDp7hGnW7ckhQm'),
                        keyAccount: new PublicKey('8ND4gt665bfZQGb4tURH9ysik82eEcdEsCgw1ws571nJ'),
                        verified: true
                    },
                    {
                        wallet: new PublicKey('2f4JkzQ4jALmcX36u4H49xBGgDy86qQb9PqD6wH8WkdB'),
                        keyAccount: new PublicKey('3q2p5y1J9GGb5mVdrJm18ePkbxvJu2ifquWcWJpo7wdG'),
                        verified: true
                    },
                ]
            }
        } else {
            consoleLog('no wallet address, returning empty keychain');
            return {
                keychainAccount: null,
                exists: false,
                keys: []
            }
        }

    }
});


export const nftsAtom = selector<NFT[]>({
    key: 'nfts',
    get: async ({get}) => {
        const nfts: NFT[] = [];
        const keychainState: KeychainState = get(keychainAtom);
        if (keychainState.exists) {
            for (let key of keychainState.keys) {
                consoleLog('fetching nfts from wallet: ', key.wallet?.toBase58());
                nfts.push(...await getNFTsForOwner(key.wallet));
            }
        }
        consoleLog('setting derived nfts: ', nfts);
        return nfts;
    }
})

export interface WalletHoldings {
    nfts: NFT[]
}


export const walletNftsSelector = selectorFamily<NFT[], PublicKey>({
    key: 'walletHoldings',
    get: (walletAddress: PublicKey) => async ({get}) => {
        const nfts: NFT[] = get(nftsAtom);
        consoleLog(`filtering nfts by wallet: ${walletAddress.toBase58()}`);
        return nfts.filter(nft => nft.owner.equals(walletAddress));
    }
});


