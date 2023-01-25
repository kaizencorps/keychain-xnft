export function sleep(ms) {
   // eslint-disable-next-line no-promise-executor-return
   return new Promise((resolve) => setTimeout(resolve, ms));
}

export function chunkArray(myArray, chunkSize) {
   var results = [];
   while (myArray.length) {
      results.push(myArray.splice(0, chunkSize));
   }
   return results;
}
