import { PublicKey } from '@solana/web3.js';
import axios from 'axios';
import Constants from 'expo-constants';
import { useFetchWrapper } from '../../../_helpers';
import { userRes, loginRes, getNonceRes, setProfilePicRes, addFavoriteRes } from './types';


function useKeychainServer() {

   const fetchWrapper = useFetchWrapper();

   const getQualifiedCollections = async () => {
      return axios({
       url: `${Constants.expoConfig.extra.KAIZEN_CORPS_URL}api/v1/collection/all`,
       method: 'GET',
      })
   }
   
   const getNonce = async (name: string, keychainAccount: string, wallet: string) : Promise<getNonceRes> => {
      return axios({
         url: `${Constants.expoConfig.extra.KAIZEN_CORPS_URL}api/v1/auth/login-nonce`,
         method: 'POST',
         data: { name, keychainAccount, wallet }
      })
   }

   const refreshAccessToken = async () : Promise<loginRes> => {
      return fetchWrapper.get(
         `${Constants.expoConfig.extra.KAIZEN_CORPS_URL}api/v1/auth/refresh-token`,
         { }
      )
   }
   
   const login = async (name: string, nonceId: number, keychainAccount: string, signature: number[]) : Promise<loginRes> => {
      console.log("Receiving: ", name, nonceId, keychainAccount, signature);
      return axios({
         url: `${Constants.expoConfig.extra.KAIZEN_CORPS_URL}api/v1/auth/login`,
         method: 'POST',
         data: { name, nonceId, keychainAccount, signature }
      })
   }

   const getUser = async () : Promise<userRes> => {
      return fetchWrapper.get(
         `${Constants.expoConfig.extra.KAIZEN_CORPS_URL}api/v1/user/profile`,
         { }
      )
   }
   
   const setProfilePic = async ({ mint, wallet, favorite }: { mint: PublicKey, wallet: string, favorite: boolean }) : Promise<setProfilePicRes> => {
      return fetchWrapper.post(
         `${Constants.expoConfig.extra.KAIZEN_CORPS_URL}api/v1/user/profile/nft`,
         { mint: mint.toBase58(), wallet, favorite }
      )
   }
   
   const toggleFavorite = async (mint: PublicKey, turnOn: boolean) : Promise<addFavoriteRes> => {
      return fetchWrapper.post(
         `${Constants.expoConfig.extra.KAIZEN_CORPS_URL}api/v1/nft/action`,
         { mint, action: turnOn ? 'FAVORITE' : 'UNFAVORITE' }
      )
   }

   return {
      getQualifiedCollections,
      getNonce,
      login,
      refreshAccessToken,
      setProfilePic,
      toggleFavorite,
      getUser
   }
}

export default useKeychainServer;

