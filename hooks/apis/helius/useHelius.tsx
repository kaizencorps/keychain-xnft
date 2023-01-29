import axios from 'axios';
import Constants from 'expo-constants';

function useHelius() {

   const getMetadata = async (nftAddresses: string[]) : Promise<any> => {
      const totalNum = nftAddresses.length;
      let page = 1;
      let oldestTransaction = '';
      let transactions = [];
   
      while (transactions.length < totalNum){
         const { data } = await axios({
            url: "https://api.helius.xyz/v0/tokens/metadata?api-key=" + Constants.expoConfig.extra.HELIUS_API_KEY + `&before=${oldestTransaction}`,
            method: 'POST',
            data: { mintAccounts: nftAddresses },
         })
   
         if (data.length === 0) {
            return transactions; // Exhausted all transactions 
         }
      
         // API data is already sorted in descending order
         oldestTransaction = data[data.length - 1].signature;
         transactions.push(...data);
         page += 1;
      }
   
      // console.log(`Got ${transactions.length} total transactions!`);
      return transactions;
   }


   return {
      getMetadata
   }
}

export default useHelius;


