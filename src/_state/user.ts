import { atom } from 'recoil';

export interface UserState {
    username: string
}
// set to wallet's PublicKey
export const userAtom = atom<UserState>({
    key: 'user',
    default: {
        username: ''
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
