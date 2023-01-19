import axios from 'axios';
axios.defaults.baseURL = "https://api.helius.xyz/"

const url = `v0/tokens/metadata?api-key=a29cc29b-450f-44fa-8947-2909393c67bb`

export const getMetadata = async (nftAddresses: string[]) => {
   return axios({
    url, 
    method: 'POST',
    data: { mintAccounts: nftAddresses },
   })
}
