import axios from 'axios';
import {HELIUS_API_KEY} from "../../types/utils/config";

export const getMetadata = async (nftAddresses: string[]) => {
   return axios({
      url: "https://api.helius.xyz/v0/tokens/metadata?api-key=" + HELIUS_API_KEY,
      method: 'POST',
    data: { mintAccounts: nftAddresses },
   })
}
