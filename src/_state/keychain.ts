import {atom, selector, selectorFamily} from 'recoil';
import {PublicKey} from "@solana/web3.js";
import { getNFTsForOwner } from "../types/utils/chain-utils";
import {consoleLog} from "../_helpers/debug";
import { KeychainState, NFT, WalletState } from '../types/NFT';


export const keychainAtom = atom<KeychainState | null>({
    key: 'keychain',
    default: null
});

export const nftsAtom = selector<NFT[]>({
    key: 'nfts',
    get: async ({get}) => {
        const nfts: NFT[] = [];
        const keychainState: KeychainState = get(keychainAtom);
        if (keychainState && keychainState.exists) {
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


