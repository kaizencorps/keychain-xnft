import { atom } from 'recoil';

// wallet (anchor wallet)
export const providerAtom = atom({
    key: 'provider',
    default: null,
});
