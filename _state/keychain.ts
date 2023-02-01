import {atom, selector, selectorFamily} from 'recoil';
import {PublicKey} from "@solana/web3.js";
import {getNFTsForOwner} from "../utils/web3/chain-utils";
import {CollectionsState, KeychainState, NFT} from '../types/NFT';
import {collectionsAtom} from './_collections';
import {consoleLog} from "../_helpers/debug";

export interface WalletHoldings {
    nfts: NFT[]
}


export const keychainAtom = atom<KeychainState>({
    key: 'keychain',
    default: {
        keychainAccount: null,
        name: '',
        exists: false,
        walletAdded: false,
        walletVerified: false,
        checked: false,
        keys: [],
        nfts: [] as NFT[]
    }
});

export const numBluechipsAtom = selector<Number>({
    key: 'numCollections',
    get: ({get}) => {
        const keychain: KeychainState = get(keychainAtom);
        return keychain.nfts.filter((nft: NFT) => !!nft.collection).length
    }
})

export const walletNftsSelector = selectorFamily<NFT[], PublicKey>({
    key: 'walletHoldings',
    get: (walletAddress: PublicKey) => async ({get}) => {
        const keychain: KeychainState = get(keychainAtom);
        console.log("What is my keychain state: ", keychain)
        return keychain.nfts.filter(nft => nft.owner.equals(walletAddress));

        /* -- test: see if these guys can return independently of each other (for loading early)
        // consoleLog(`filtering nfts by wallet: ${walletAddress.toBase58()}`);
        const collectionsState: CollectionsState = get(collectionsAtom);
        return await getNFTsForOwner(walletAddress, collectionsState)
         */
    }
});


