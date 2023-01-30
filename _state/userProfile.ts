import { atom, selector } from 'recoil';
import { PublicKey } from '@solana/web3.js';
import jwt_decode from 'jwt-decode';
import { keychainAtom } from './keychain';
import { KeychainState } from '../types/NFT';
import { NFT } from '../types/NFT';

export interface UserProfileState {
    jwt: string | null
    profile: {
        profileNft: { mint: PublicKey | undefined }
        favorites: { mint: PublicKey }[]
    },
}

export const userProfileAtom = atom<UserProfileState>({
    key: 'userProfile',
    default: {
        jwt: localStorage.getItem('jwt'),
        profile: {
            profileNft: { mint: undefined },
            favorites: [] as { mint: PublicKey }[]
        },
    }
});

export const profilePictureUrl = selector<string | undefined>({
    key: 'profilePic',
    get: async ({get}) => {
        const userProfile = get(userProfileAtom);
        if(userProfile.profile.profileNft.mint === undefined) return undefined;

        const keychainState: KeychainState = get(keychainAtom);
        const profileNft = keychainState.nfts.find(nft => nft.mint.toBase58() === userProfile.profile.profileNft.mint.toBase58())
        return !!profileNft ? profileNft.imageUrl : undefined;
    }
})

export const favoriteNfts = selector<NFT[]>({
    key: 'favoriteUrls',
    get: async ({get}) => {
        const keychainState: KeychainState = get(keychainAtom);
        return keychainState.nfts.filter(nft => nft.isFavorited);
    }
})

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