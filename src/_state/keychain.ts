import {atom, selector, selectorFamily} from 'recoil';
import {PublicKey} from "@solana/web3.js";
import {userAtom, UserState} from "./user";
import { getNFTsForOwner } from "../utils/web3/chain-utils";
import {consoleLog} from "../_helpers/debug";
import { CollectionsState, KeychainState, NFT, WalletState } from '../types/NFT';
import {walletAtom} from "./wallet";
import { collectionsAtom } from './_collections';



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
        if (keychainState && keychainState.exists) {
            for (let key of keychainState.keys) {
                consoleLog('fetching nfts from wallet: ', key.wallet?.toBase58());
                const walletSetOfNFTS = await getNFTsForOwner(key.wallet, collectionsState);
                console.log("Some nfts returnenenene? ", walletSetOfNFTS);
                nfts = nfts.concat(walletSetOfNFTS);
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


