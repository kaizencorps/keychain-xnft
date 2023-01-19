import { atom } from 'recoil';
import {Provider} from "@project-serum/anchor";

// wallet (anchor wallet)
export const providerAtom = atom<Provider | null>({
    key: 'provider',
    default: null,
});
