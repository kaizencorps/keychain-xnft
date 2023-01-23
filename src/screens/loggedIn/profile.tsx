import React, { FC, ReactElement} from "react";

//Components
import { View, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { NormalText, BannerText } from "../../components/ui/text/text";
import { NewWallet, WalletRow } from "../../components/wallet-header/wallet-header";

//Data
import { keychainAtom, nftsAtom, userAtom } from "../../_state";
import { useRecoilValue } from "recoil";

//SVGs
import AccountCircle from "../../assets/svgs/Icons/account-circle";
import DotsVertical from "../../assets/svgs/Icons/dots-vertical";

//Types
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { RootStackParamList } from "../../nav/homeStack";

//Styles
import * as Theme from '../../constants/theme';
import ScreenWrapper from "../../components/screenWrapper/screenWrapper";
import { KeyState } from "../../types/NFT";
import { PublicKey } from "@solana/web3.js";

interface Props extends BottomTabScreenProps<RootStackParamList, 'Profile'> {}


const Profile : FC<any> = (props: Props) : ReactElement => {

  const keychain = useRecoilValue(keychainAtom);
  const nfts = useRecoilValue(nftsAtom);
  // const user = useRecoilValue(userAtom);

  const goToWalletCreation = () => props.navigation.navigate('AddNewWallet');
  const goToLogout = async () => props.navigation.navigate("Logout");
  const goToRemoveWallet = (keyState: KeyState, index: number) => props.navigation.navigate('RemoveWallet', { keyState, index })
  const goToPendingWallet = (keyStateWallet: PublicKey) => props.navigation.navigate('PendingWallet', {address: keyStateWallet});

  const determineNavDirection = (keyState: KeyState, i: number) => {
    if(keyState.verified) goToRemoveWallet(keyState, (i + 1))
    else goToPendingWallet(keyState.wallet);
  }


  return (
    <ScreenWrapper>
      <View style={styles.maxCon}>
        <View style={styles.topCon}>
          <TouchableOpacity onPress={goToLogout}>
            <AccountCircle height={150} width={150} color={Theme.COLORS.INACTIVE_GRAY} />
          </TouchableOpacity>
          <BannerText style={{ color: Theme.COLORS.LABEL_TEXT_WHITE }}>{keychain.name}</BannerText>
          <NormalText style={{ color: Theme.COLORS.ACTIVE_PINK }}>{`${nfts.length} NFTs`}</NormalText>
          {/*<NormalText style={{ color: Theme.COLORS.ACTIVE_PINK, marginBottom: Theme.SPACING.MD }}>--- Collections</NormalText>*/}
          <TouchableOpacity hitSlop={{ left: 20, bottom: 20 }} onPress={goToLogout} style={styles.dots}>
            <DotsVertical rotation={90} color={Theme.COLORS.INACTIVE_GRAY} />
          </TouchableOpacity>
        </View>
        <View style={styles.botCon}>
          <View style={styles.profileCon}>
            <NormalText style={{ color: Theme.COLORS.INACTIVE_GRAY, marginBottom: Theme.SPACING.LG }}>PROFILE WALLETS</NormalText>
            {keychain.keys.map((keyState, i) =>
              <WalletRow key={i} keyState={keyState} func={() => determineNavDirection(keyState, i)}/>
            )}
            {Array.apply(null, Array(5 - keychain.keys.length)).map((_: never, i: number) => <NewWallet key={i} func={goToWalletCreation}/>)}
          </View>
        </View>
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  maxCon: {
    width: '100%',
    minHeight: Theme.MIN_HEIGHT_CON,
    maxWidth: Theme.MAX_WIDTH_CON,
  },
  topCon: {
    backgroundColor: Theme.COLORS.BACKGROUND_BLACK,
    alignItems: 'center'
  },
  botCon: {
    alignItems: 'center',
    backgroundColor: Theme.COLORS.INACTIVE_GRAY,
    padding: Theme.SPACING.MD,
  },
  profileCon: {
    backgroundColor: Theme.COLORS.BACKGROUND_BLACK,
    padding: Theme.SPACING.SM,
    borderRadius: Theme.BRADIUS.SM,
    width: '100%',
    justifyContent: 'center',
    paddingHorizontal: Theme.SPACING.MD
  },
  dots: {
    position: 'absolute',
    top: 0,
    right: 0,
    zIndex: 999
  }
});

export default Profile;
