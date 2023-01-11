import React, {FC, ReactElement, useState} from "react";

//Components
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { HeaderText } from "../../components/ui/text";

//Web3
import {WalletMultiButton} from "@solana/wallet-adapter-react-ui";
import {AnchorWallet, useAnchorWallet, useWallet} from "@solana/wallet-adapter-react";

//Libs
import useAsyncEffect from "use-async-effect";

//Data
import {useWalletActions} from "../../_actions/wallet.actions";
import {consoleLog} from "../../_helpers/debug";
import {useUserActions} from "../../_actions/user.actions";
import {keychainAtom} from "../../_state/keychain";
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
        <View className="flex flex-1">
          <HeaderText>Home</HeaderText>
          <View className={'mx-auto'}>
            <WalletMultiButton>
              Connect Wallet
            </WalletMultiButton>
          </View>

        </View>
        <View className="flex flex-col justify-center items-center pb-10">
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
          <TouchableOpacity
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={handleSubmit}
          >
            Submit
          </TouchableOpacity>
          {keychain.exists && <View className={"text-white"}>Got the keychain: {keychain.keychainAccount?.toBase58()}</View>}
        </View>

      </>
  );
}

export default Home;
