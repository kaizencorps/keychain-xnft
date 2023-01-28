import axios from 'axios';


export const getQualifiedCollections = async () => {
   return axios({
     // todo: move to config
    url: "https://keychain.kaizencorps.com/api/v1/collection/all",
    method: 'GET',
   })
}
