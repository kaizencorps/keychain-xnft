import useKeychainServer from "hooks/apis/keychainServer/useKeychainServer";


function useAuthActions() {

  const keychainServer = useKeychainServer();

  async function login(signMessage: (message: Uint8Array) => Promise<Uint8Array>, name: string, keychainAccount: string, wallet: string) {
    console.log("Attempting login....")
    console.log("Name: ", name, "keychainAccount: ", keychainAccount);
    const nonceObj = await keychainServer.getNonce(name, keychainAccount, wallet);

    console.log("whats nonce obj look: ", nonceObj);

    const encoded = new TextEncoder().encode(nonceObj.data.data.nonce);
    const signature = await signMessage(encoded);
    const decoder = new TextDecoder('utf-8');
    const sigArray = Array.from(signature);
    console.log('decoded: ', decoder.decode(encoded));
    console.log('signature: ', signature);
    console.log('sigarray: ', sigArray);
    return await keychainServer.login(name, nonceObj.data.data.id, keychainAccount, sigArray);
  }

  return {
    login
  }
}

export default useAuthActions;
