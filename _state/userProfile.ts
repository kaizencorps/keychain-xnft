import { atom, selector } from 'recoil';
import { PublicKey } from '@solana/web3.js';
import jwt_decode from 'jwt-decode';

export interface UserProfileState {
    jwt: string | null
    profile: {
        profileNft: { mint: string | undefined, pic: string | undefined }
        favorites: { mint: string }[]
    },
}

export const userProfileAtom = atom<UserProfileState>({
    key: 'userProfile',
    default: {
        jwt: localStorage.getItem('jwt'),
        profile: {
            profileNft: { mint: undefined, pic: undefined },
            favorites: [] as { mint: string }[]
        },
    }
});

export const isValidToken = selector<Boolean>({
    key: 'validToken',
    get: async ({get}) => {
        const userProfileState: UserProfileState = get(userProfileAtom);    
        if(userProfileState.jwt === null) return false;

        const decoded: any = jwt_decode(userProfileState.jwt);
        const expiration = decoded.exp * 1000; // gets returned in seconds, convert to millis for date comparisons
        if (decoded && 'exp' in decoded) {
            console.log("Dates? ", new Date(), new Date(expiration));
            return new Date() < new Date(expiration);
        } else return false;
    }
})