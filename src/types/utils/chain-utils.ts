//Types
import { NFT } from '../NFT';

//Web3
import { PublicKey } from '@solana/web3.js';
import { getMetadata } from '../../apis/helius/helius';
import { TOKEN_PROGRAM_ID } from '@solana/spl-token';
import { Connection } from "@solana/web3.js";


export async function getNFTsForOwner(owner: PublicKey): Promise<NFT[]> { 
    const conn = new Connection("https://rpc.helius.xyz/?api-key=a29cc29b-450f-44fa-8947-2909393c67bb"); // TODO use process.env

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
                // TODO parse out errored responses 
                // TODO add all NFT information to recoil state
                const nfts: NFT[] = [];
                return nfts;
            })
            .catch(e => {
                const nfts: NFT[] = [];
                return nfts;
            });
    }
    
    return await getTokenMetaDatas(parsedTokens.map(tokenAccount => tokenAccount.mint));
}
