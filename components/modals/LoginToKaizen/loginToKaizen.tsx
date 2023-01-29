import React, { FC, ReactElement } from 'react';

//Components
import { View, StyleSheet } from 'react-native';
import { FatPinkButton } from '../../ui/buttons/buttons';
import ModalWrapper from '../modalWrapper';

//Web3
import { useWallet } from "@solana/wallet-adapter-react";

//Data
import { userProfileAtom } from '../../../_state';
import useAuthActions from '../../../_actions/auth/auth.actions';
import { useRecoilState } from 'recoil';
import { keychainAtom } from '../../../_state';

//Libs
import { useNavigation } from '@react-navigation/native';

//Types
import { KeychainState } from '../../../types/NFT';
import { UserProfileState } from '../../../_state';


interface Props {
  showModal: boolean,
  toggleModal: () => void,
}

export const LoginToKaizen : FC<any> = (props: Props) : ReactElement => {

  const authActions = useAuthActions();
  const navigation = useNavigation()
  const { signMessage } = useWallet();

  const [UserProfileState, setUserProfileState] = useRecoilState(userProfileAtom);
  const [keychain] = useRecoilState<KeychainState>(keychainAtom);
  const wallet = useWallet();

  const login = async () => {
    const res = await authActions.login(signMessage, keychain.name, keychain.keychainAccount.toBase58(), wallet.publicKey.toBase58());
    if(res.data.success){
      const { accessToken, profile } = res.data.data;
      console.log("Login to kaizen gets back: ", res);
      localStorage.setItem('jwt', res.data.data.accessToken);
      const state : UserProfileState = {
        jwt: accessToken,
        profile: { 
          profileNft: {
            mint: profile.profileNft?.mint,
            pic: profile.profileNft?.pic,
          },
          favorites: profile.favorites
        },
      }
      setUserProfileState(state)
      // Setting userProfileState will force a navigation to 'Profile' screen
    }
  }

  return (
    <ModalWrapper showModal={props.showModal} toggleModal={props.toggleModal} title="Sign transaction">
      <View>
        <FatPinkButton text='VERIFY WALLET' func={login} />
      </View>
    </ModalWrapper>
  );
};

const styles = StyleSheet.create({
  con: {

  }
});

export default LoginToKaizen;