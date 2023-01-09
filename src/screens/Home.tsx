import React, {FC, ReactElement, useState} from "react";
import {WalletMultiButton} from "@solana/wallet-adapter-react-ui";
import useAsyncEffect from "use-async-effect";
import {AnchorWallet, useAnchorWallet, useWallet} from "@solana/wallet-adapter-react";
import {useWalletActions} from "../_actions/wallet.actions";
import {consoleLog} from "../_helpers/debug";
import {useUserActions} from "../_actions/user.actions";
import {keychainAtom} from "../_state/keychain";
import {useRecoilValue} from "recoil";

const Home : FC<any> = () : ReactElement => {
  const walletActions = useWalletActions();
  const userActions = useUserActions();
  const anchorWallet: AnchorWallet | undefined = useAnchorWallet();
  const { signMessage } = useWallet();

  const [inputValue, setInputValue] = useState('');

  const keychain = useRecoilValue(keychainAtom);

  useAsyncEffect(async () => {
    // if (anchorWallet && !loggedIn) {
    if (anchorWallet) {
      // eslint-disable-next-line @typescript-eslint/no-shadow
      await walletActions.connectWallet(anchorWallet, signMessage);
    } else {
      walletActions.disconnectWallet();
    }
  }, [anchorWallet]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = () => {
    consoleLog(inputValue);
    userActions.setUsername(inputValue);
  };


  return (
      <>
        <div className="flex flex-1">
          <h2>Home</h2>
          <div className={'mx-auto'}>
            <WalletMultiButton>
              Connect Wallet
            </WalletMultiButton>
          </div>

        </div>
        <div className="flex flex-col justify-center items-center pb-10">
          <label
              className="text-center text-gray-700 font-bold"
          >
            Username:
            <input
                className="border rounded py-2 px-3 w-full"
                type="text"
                value={inputValue}
                onChange={handleChange}
            />
          </label>
          <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={handleSubmit}
          >
            Submit
          </button>
          {keychain.exists && <div className={"text-white"}>Got the keychain: {keychain.keychainAccount?.toBase58()}</div>}
        </div>

      </>
  );
}

export default Home;
