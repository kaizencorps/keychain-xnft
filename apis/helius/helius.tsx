import axios from 'axios';
import Constants from 'expo-constants';

export const getMetadata = async (nftAddresses: string[]) => {

   return axios({
      url: "https://api.helius.xyz/v0/tokens/metadata?api-key=" + Constants.expoConfig.extra.HELIUS_API_KEY,
      method: 'POST',
      data: { mintAccounts: nftAddresses },
   })
}
