import { atom } from 'recoil';
import {PublicKey} from "@solana/web3.js";
import { WalletState } from '../types/NFT';

// set to wallet's PublicKey
export const walletAtom = atom<WalletState | null>({
    key: 'wallet',
    default: null
});

