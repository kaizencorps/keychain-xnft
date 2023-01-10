import { PublicKey } from '@solana/web3.js';
import axios from 'axios';
import { consoleLog } from '../_helpers/debug';
import {metaplex, RPC_URL} from "./config";
import {NFT} from "../_state/keychain";

// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
export async function getTokensByOwner(owner: PublicKey): Promise<PublicKey[]> {
    // const tokens = await conn.getParsedTokenAccountsByOwner(owner, {
    //   programId: TOKEN_PROGRAM_ID,
    // });

    // quicknode doesn't support the getParsedTokenAccountsByOwner method anymore. need to call their bs one
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    // paging
    let page = 1;
    const resultsPerPage = 40;

    const data = {
        jsonrpc: '2.0',
        id: 1,
        method: 'qn_fetchNFTs',
        params: {
            wallet: owner,
            omitFields: ['provenance', 'traits', 'description', 'collectionName', 'collectionAddress', 'creators'],
            page,
            perPage: resultsPerPage,
        },
    };

    const tokens: PublicKey[] = [];
    let fetchedTokens = null;
    do {
        // eslint-disable-next-line no-await-in-loop
        fetchedTokens = await axios.post(RPC_URL, data, config);
        consoleLog('fetchedTokens: ', fetchedTokens);
        if (fetchedTokens) {
            // eslint-disable-next-line no-restricted-syntax
            for (const asset of fetchedTokens.data.result.assets) {
                consoleLog(`got back tokenAddress: ${asset.tokenAddress}`);
                tokens.push(asset.tokenAddress as PublicKey);
            }
        }
        page += 1;
        data.params.page = page;
    } while (fetchedTokens && page <= fetchedTokens.data.result.totalPages);
    return tokens;
}


export async function getNFTsForOwner(owner: PublicKey): Promise<NFT[]> {
    const mints: PublicKey[] = await getTokensByOwner(owner);
    const nfts: NFT[] = [];
    if (mints) {
        const metadatas = await metaplex.nfts().findAllByMintList({mints})
        for (const metadata of metadatas) {
            if (metadata) {
                // could be null
                // @ts-ignore
                const metaNft = await metaplex.nfts().load({metadata});
                console.log('fetched metaplex nft: ', metaNft);
                const nft: NFT = {
                    imgUrl: metaNft.uri,
                    mdUrl: metaNft.uri,
                    mint: metaNft.mint.address
                }
                nfts.push(nft);
            }
        }
    }
    return nfts;
}

/*
export async function getNFTMetadata(mint: PublicKey, conn, pubkey) {
    // console.log('Pulling metadata for:', mint);
    try {
        const metadataPDA = await Metadata.getPDA(mint);
        const onchainMetadata = (await Metadata.load(conn, metadataPDA)).data;

        // see if this is a kai
        let cmCreator = null;
        // eslint-disable-next-line no-restricted-syntax
        for (const creator of onchainMetadata.data.creators) {
            if (creator.address === CANDY_MACHINE_ID.toBase58() && creator.verified) {
                cmCreator = creator;
                break;
            }
        }
        // couldn't find the candy machine as a creator
        if (!cmCreator) {
            return null;
        }

        const externalMetadata = (await axios.get(onchainMetadata.data.uri)).data;
        return {
            pubkey: pubkey ? new PublicKey(pubkey) : undefined,
            mint: new PublicKey(mint),
            onchainMetadata,
            externalMetadata,
        };
    } catch (e) {
        consoleLog(`failed to pull metadata for token ${mint}`);
        return null;
    }
}
*/

/*
export async function getNFTMetadataForMany(tokens, conn) {
    const promises = [];
    const returnedNfts = [];
    tokens.forEach((t) => promises.push(getNFTMetadata(t.mint, conn, t.pubkey)));
    const nfts = (await Promise.all(promises)).filter((n) => !!n);
    nfts.map((nft) => {
        returnedNfts.push(nft.onchainMetadata);
    });
    return nfts;
}
*/
