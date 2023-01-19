import { atom } from 'recoil';
import {PublicKey} from "@solana/web3.js";
import { WalletState } from '../types/NFT';

// set to wallet's PublicKey
export const walletAtom = atom<WalletState>({
    key: 'wallet',
    default: {
        address: null,
    }
});

/*
export const domTokenAccountSelector = selector({
    key: 'playerDomTokenAccount',
    get: async ({ get }) => {
        const walletAddress = get(walletAtom);
        return getAssociatedTokenAddress(DOM_MINT, walletAddress, false, TOKEN_PROGRAM_ID, ASSOCIATED_TOKEN_PROGRAM_ID);
    },
});
 */
