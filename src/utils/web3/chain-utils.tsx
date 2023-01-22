//Types
import { CollectionsState, NFT } from '../../types/NFT';

//Data
import { collectionsAtom } from '../../_state';
import { useRecoilState } from 'recoil';

//Web3
import { PublicKey } from '@solana/web3.js';
import { getMetadata } from '../../apis/helius/helius';
import { TOKEN_PROGRAM_ID } from '@solana/spl-token';
import { Connection } from "@solana/web3.js";
import {HELIUS_RPC_URL} from "../../types/utils/config";

const decideIfPartOfCollection = (nftData: any, collections: CollectionsState) => {
    const creators = nftData.onChainData.data.creators
    const collectionProp = nftData.collection
    // New way of verify NFT is authentic part of collection
    if(!!collectionProp && collectionProp.verified === 1){
        const collection = collections.collections.find(collection => collection.verificationAddress === collectionProp.key)
        return collection ?? null;
    // Old way of verifying NFT is authentic part of collection
    } else if(!!creators){
        const candyCreator = creators[0];
        const collection = collections.collections.find(collection => collection.verificationAddress === candyCreator.address)
        if(candyCreator.verified) return collection.name;
        else return null;
    } else return null
}

export async function getNFTsForOwner(owner: PublicKey, collections: CollectionsState): Promise<NFT[]> {
    const conn = new Connection(HELIUS_RPC_URL); // TODO use process.env

    const tokenAccounts = await conn.getParsedTokenAccountsByOwner(owner, {
        programId: TOKEN_PROGRAM_ID,
    });

    const parsedTokens = tokenAccounts.value
        .filter((t: any) => {
            const amount = t.account.data.parsed.info.tokenAmount;
            return amount.decimals === 0 && amount.uiAmount === 1;
        })
        .map((t: any) => {
            return { pubkey: t.pubkey, mint: t.account.data.parsed.info.mint };
        });

    const getTokenMetaDatas = async (tokenAddresses: string[]) => {
        return await getMetadata(tokenAddresses)
            .then(res => {
                // TODO parse out false positives

                const allNFTS: NFT [] = res.data.map((nft: any) => ({
                    owner: owner,
                    name: nft.onChainData.data.name,
                    mint: nft.mint,
                    imageUrl: nft.offChainData.image,
                    collection: decideIfPartOfCollection(nft, collections),
                    isFavorited: false // TODO
                }))

                return allNFTS;
            })
            .catch(e => [] as NFT[]);
    }

    return await getTokenMetaDatas(parsedTokens.map(tokenAccount => tokenAccount.mint));
}
