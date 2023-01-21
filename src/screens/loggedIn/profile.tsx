import React, { FC, ReactElement} from "react";

//Components
import { View, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { NormalText, BannerText } from "../../components/ui/text/text";
import { NewWallet, Wallet as WalletHeader, WalletRow } from "../../components/wallet-header/wallet-header";

//Data
import { keychainAtom, nftsAtom, userAtom } from "../../_state";
import { useRecoilValue } from "recoil";

//SVGs
import AccountCircle from "../../assets/svgs/Icons/account-circle";

//Types
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { RootStackParamList } from "../../nav/homeStack";

//Styles
import * as Theme from '../../constants/theme';
import ScreenWrapper from "../../components/screenWrapper/screenWrapper";

interface Props extends BottomTabScreenProps<RootStackParamList, 'Profile'> {}


const Profile : FC<any> = (props: Props) : ReactElement => {

  const keychain = useRecoilValue(keychainAtom);
  const nfts = useRecoilValue(nftsAtom);
  const user = useRecoilValue(userAtom);

  const goToWalletCreation = () => props.navigation.navigate('AddNewWallet');
  const goToLogout = () => props.navigation.navigate("Logout");
  const goToRemoveWallet = (address: string, index: number) => props.navigation.navigate('RemoveWallet', { address, index })

  return (
    <ScreenWrapper>
      <View style={styles.maxCon}>
        <View style={styles.topCon}>
          <TouchableOpacity onPress={goToLogout}>
            {keychain ?
              <AccountCircle height={150} width={150} color={Theme.COLORS.INACTIVE_GRAY} />
            :
              <Image />
            }
          </TouchableOpacity>
          <BannerText style={{ color: Theme.COLORS.LABEL_TEXT_WHITE }}>{user.username}</BannerText>
          <NormalText style={{ color: Theme.COLORS.ACTIVE_PINK }}>{`${nfts.length} NFTs`}</NormalText>
          <NormalText style={{ color: Theme.COLORS.ACTIVE_PINK }}>--- Collections</NormalText>
        </View>
        <View style={styles.botCon}>
          <View style={styles.profileCon}>
            <NormalText style={{ color: Theme.COLORS.INACTIVE_GRAY }}>PROFILE WALLETS</NormalText>
            {keychain.keys.map((keyState, i) =>
              <TouchableOpacity key={i + 1} onPress={() => goToRemoveWallet(keyState.wallet.toBase58(), (i + 1))}>
                <WalletRow keyState={keyState}/>
              </TouchableOpacity>
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
  }
});

export default Profile;
