//Types
import {CollectionsState, NFT, VERIFICATION} from '../../types/NFT';

//Web3
import {Connection, PublicKey} from '@solana/web3.js';
import {getMetadata} from '../../apis/helius/helius';
import {TOKEN_PROGRAM_ID} from '@solana/spl-token';
import {HELIUS_RPC_URL} from "../../types/utils/config";
import {consoleLog} from "../../_helpers/debug";

const decideIfPartOfCollection = (nftData: any, collections: CollectionsState) => {
    const creators = nftData.onChainData.data.creators;
    const collectionProp = nftData.onChainData.collection;
    let collection = null;
    // New way of verify NFT is authentic part of collection - metaplex collections
    if (collectionProp && collectionProp.verified) {
        collection = collections.collections.find(collection => collection.verification === VERIFICATION.COLLECTION &&
                                                                collection.verificationAddress === collectionProp.key)
    // Old way of verifying NFT is authentic part of collection
    } else if (creators) {
        const candyCreator = creators[0];
        collection = collections.collections.find(collection => collection.verification === VERIFICATION.CREATOR &&
                                                                collection.verificationAddress === candyCreator.address)
        if (!candyCreator.verified) {
            // then unset it
            collection = null;
        }
    }
    return collection ? collection.name : null;
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

        // helius limits to 100 nfts at a time so chunk it

       // todo: chunk this properly and fetch everything
        // const chunks = chunkArray(tokenAddresses, 100);
        if (tokenAddresses.length > 100) {
            tokenAddresses = tokenAddresses.slice(0, 100);
        }

        consoleLog('collections: ', collections);

        // todo: add in the chunking
        return await getMetadata(tokenAddresses)
            .then(res => {
                // TODO parse out false positives

                consoleLog('got back helius nft data: ', res.data);

                const allNFTS: NFT [] = res.data.filter((nft: any) => {
                    // filter out any non-NFTs
                    return nft && nft.onChainData && nft.offChainData
                }).map((nft: any) => ({
                    owner: owner,
                    name: nft.onChainData.data.name,
                    mint: nft.mint,
                    imageUrl: nft.offChainData.image,
                    collection: decideIfPartOfCollection(nft, collections),
                    isFavorited: false // TODO
                }));

                return allNFTS;
            })
            .catch(e => {
                consoleLog('error getting nft data: ', e);
                return [];
            });
    }

    return await getTokenMetaDatas(parsedTokens.map(tokenAccount => tokenAccount.mint));
}
