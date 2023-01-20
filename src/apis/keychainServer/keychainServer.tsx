import axios from 'axios';


export const getQualifiedCollections = async () => {
   return axios({
    url: "https://keychain.kaizencorps.com/api/v1/collection/all",
    method: 'GET',
   })
}
