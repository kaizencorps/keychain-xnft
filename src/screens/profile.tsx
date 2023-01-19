import React, { FC, ReactElement} from "react";

//Components
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { NormalText, BannerText } from "../components/ui/text/text";
import { NewWallet, Wallet as WalletHeader } from "../components/wallet-header/wallet-header";

//Data
import { keychainAtom, nftsAtom } from "../_state/keychain";
import { userAtom } from "../_state/user";
import { useRecoilValue } from "recoil";

//SVGs
import AccountCircle from "../assets/svgs/Icons/account-circle";

//Types
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { RootStackParamList } from "../nav/homeStack";

//Styles
import * as Theme from '../constants/theme';

interface Props extends BottomTabScreenProps<RootStackParamList, 'Profile'> {}


const Profile : FC<any> = (props: Props) : ReactElement => {

  const keychain = useRecoilValue(keychainAtom);
  const nfts = useRecoilValue(nftsAtom);
  const user = useRecoilValue(userAtom);

  const goToWalletCreation = () => props.navigation.navigate('AddNewWallet');
  const goToLogout = () => props.navigation.navigate("Logout");
  const goToRemoveWallet = (address: string, index: number) => props.navigation.navigate('RemoveWallet', { address, index })

  
  return (
    <View style={styles.con}>
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
            <TouchableOpacity onPress={() => goToRemoveWallet(keychain.keychainAccount.toBase58(), 0)}>
              <WalletHeader index={0} address={keychain.keychainAccount.toBase58()}/>
            </TouchableOpacity>
            {keychain.keys.map((wallet, i) => 
              <TouchableOpacity key={i + 1} onPress={() => goToRemoveWallet(wallet.wallet.toBase58(), (i + 1))}>
                <WalletHeader index={i + 1} address={wallet.wallet.toBase58()} />
              </TouchableOpacity>
            )}
            {Array.apply(null, Array(4 - keychain.keys.length)).map((_, i) => <NewWallet key={i} func={goToWalletCreation}/>)}
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
