import { atom } from 'recoil';
import { Collection, CollectionsState } from '../types/NFT';

export const collectionsAtom = atom<CollectionsState>({
    key: 'collections',
    default: {
        collections: [] as Collection[]
    }
});