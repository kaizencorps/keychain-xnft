import axios from 'axios';

export const getMetadata = async (nftAddresses: string[]) => {
   return axios({
    url: "https://api.helius.xyz/v0/tokens/metadata?api-key=d5b4e462-afa3-4ad9-9801-6637f225b0d5", 
    method: 'POST',
    data: { mintAccounts: nftAddresses },
   })
}
