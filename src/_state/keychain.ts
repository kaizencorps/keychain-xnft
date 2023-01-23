import {atom, selector, selectorFamily} from 'recoil';
import {PublicKey} from "@solana/web3.js";
import {getNFTsForOwner} from "../utils/web3/chain-utils";
import {CollectionsState, KeychainState, NFT} from '../types/NFT';
import {collectionsAtom} from './_collections';
import {consoleLog} from "../_helpers/debug";


export const keychainAtom = atom<KeychainState>({
    key: 'keychain',
    default: {
        keychainAccount: null,
        name: '',
        exists: false,
        walletAdded: false,
        walletVerified: false,
        checked: false,
        keys: []
    }
});

export const nftsAtom = selector<NFT[]>({
    key: 'nfts',
    get: async ({get}) => {
        let nfts: NFT[] = [];
        const keychainState: KeychainState = get(keychainAtom);
        const collectionsState: CollectionsState = get(collectionsAtom);
        if (keychainState.walletVerified) {
            for (let key of keychainState.keys) {
                if (key.verified) {
                    const walletSetOfNFTS = await getNFTsForOwner(key.wallet, collectionsState);
                    nfts = nfts.concat(walletSetOfNFTS);
                }
            }
        }
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

        /* -- test: see if these guys can return independently of each other (for loading early)
        // consoleLog(`filtering nfts by wallet: ${walletAddress.toBase58()}`);
        const collectionsState: CollectionsState = get(collectionsAtom);
        return await getNFTsForOwner(walletAddress, collectionsState)
         */
    }
});


