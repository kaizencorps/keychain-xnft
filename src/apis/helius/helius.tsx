import axios from 'axios';

export const getMetadata = async (nftAddresses: string[]) => {
   return axios({
    url: "https://api.helius.xyz/v0/tokens/metadata?api-key=674848c0-c368-43ca-813b-30d310940559", 
    method: 'POST',
    data: { mintAccounts: nftAddresses },
   })
}
