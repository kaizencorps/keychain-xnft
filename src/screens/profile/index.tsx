import React, {FC, ReactElement, useState} from "react";

//Components
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { HeaderText, NormalText, SubHeaderText, BannerText } from "../../components/ui/text";
import { NewWallet } from "../../components/wallet-header";

//Data
import {keychainAtom} from "../../_state/keychain";
import {useRecoilValue} from "recoil";

//SVGs
import AccountCircle from "../../assets/svgs/Icons/account-circle";

//Types
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { RootStackParamList } from "../../nav/homeStack";

//Styles
import * as Theme from '../../constants/theme';

interface Props extends BottomTabScreenProps<RootStackParamList, 'Profile'> {}


const Profile : FC<any> = (props: Props) : ReactElement => {

  const keychain = useRecoilValue(keychainAtom);

  const goToWalletCreation = () => props.navigation.navigate('AddNewWallet')

  console.log("Keychain??? ", keychain);

  return (
    <View style={styles.con}>
      <View style={styles.maxCon}>
        <View style={styles.topCon}>
          {keychain ?
            <AccountCircle height={150} width={150} color={Theme.COLORS.INACTIVE_GRAY} />
          :
            <Image />
          }
          <BannerText style={{ color: Theme.COLORS.LABEL_TEXT_WHITE }}>Placeholder</BannerText>
          <NormalText style={{ color: Theme.COLORS.ACTIVE_PINK }}>--- NFTs</NormalText>
          <NormalText style={{ color: Theme.COLORS.ACTIVE_PINK }}>--- Collections</NormalText>
        </View>
        <View style={styles.botCon}>
          <View style={styles.profileCon}>
            <NormalText style={{ color: Theme.COLORS.INACTIVE_GRAY }}>PROFILE WALLETS</NormalText>
            {[null, null, null].map(() => <NewWallet func={goToWalletCreation}/>)}
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  con: {
    flex: 1,
    backgroundColor: Theme.COLORS.BACKGROUND_BLACK,
    justifyContent: 'center',
    alignItems: 'center',
  },
  maxCon: {
    width: '100%',
    height: '100%',
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
  }
});

export default Profile;
