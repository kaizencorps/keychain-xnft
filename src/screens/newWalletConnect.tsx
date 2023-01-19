import React, { FC, ReactElement } from "react";

//Components
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { FatPinkButton } from "../components/ui/buttons/buttons";
import { HeaderText, NormalText, SubHeaderText } from "../components/ui/text/text";
import { Wallet } from "../components/wallet-header/wallet-header";

//Types
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { RootStackParamList } from "../nav/homeStack";

//Data
import { keychainAtom } from "../_state/keychain";
import { userAtom } from "../_state/user";
import { useRecoilValue } from "recoil";

//Web3
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

//SVGs
import Close from "../assets/svgs/Icons/close";
import AccountCircle from "../assets/svgs/Icons/account-circle";

//Styles
import * as Theme from '../constants/theme';

//Utils
import { formatAddress } from "../utils/stringFormatting";

interface Props extends BottomTabScreenProps<RootStackParamList, 'NewWalletConnect'> {}


const NewWalletConnect : FC<any> = (props: Props) : ReactElement => {

  // const { address } = props.route.params;
  const address = "ghusbvh89bbvvyviuh0hrs0brs";

  const keychain = useRecoilValue(keychainAtom);
  const user = useRecoilValue(userAtom);

  const [isWalletPending, toggleWalletPending] = React.useState(false);

  React.useEffect(() => {
    // TODO toggle if a wallet is pending verification
  }, [])

  const goBack = () => props.navigation.goBack();

  const verifyWallet = () => {
    // TODO 
  }

  return (
    <View style={styles.con}>
      <View style={styles.maxCon}>
        <View style={styles.topCon}>
          {keychain ?
            <AccountCircle height={150} width={150} color={Theme.COLORS.INACTIVE_GRAY} />
          :
            <Image />
          }
          <SubHeaderText style={{ color: Theme.COLORS.LABEL_TEXT_WHITE }}>{user.username}</SubHeaderText>
          {/* {keychain.keys.map(wallet => 
            <Wallet conStyle={{ width: '50%' }} />
          )} */}
          {/* TODO PENDING WALLET */}
        </View>
        <View style={styles.botCon}>
          <View>
            <View style={styles.addressCon}>
              <HeaderText style={{ color: Theme.COLORS.LABEL_TEXT_WHITE }}>{formatAddress(address)}</HeaderText>
            </View>
            <NormalText style={{ color: Theme.COLORS.ALERT_YELLOW }}>
              To verify and link this wallet to your Keychain account, connect an existing verified wallet, add this wallet, then reconnect with this wallet
            </NormalText>
            {isWalletPending ?
              <FatPinkButton text="VERIFY" func={verifyWallet} />
            :
              <WalletMultiButton>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Wallet color={Theme.COLORS.LABEL_TEXT_WHITE} address={address} />
                  <HeaderText style={{ color: Theme.COLORS.LABEL_TEXT_WHITE, marginLeft: 5 }}>CONNECT WALLET</HeaderText>
                </View>
              </WalletMultiButton>
            }
          </View>
          <View style={styles.closeCon}>
            <TouchableOpacity onPress={goBack}>
              <Close color={Theme.COLORS.INACTIVE_GRAY} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  con: {
    flex: 1,
    paddingTop: Theme.SPACING.XXL,
    backgroundColor: Theme.COLORS.USER_BACKGROUND_GRAY,
  },
  maxCon: {
    width: '100%',
    maxWidth: Theme.MAX_WIDTH_CON,
    minHeight: Theme.MIN_HEIGHT_CON,
  },
  addressCon: {
    justifyContent: 'center', 
    alignItems: 'center', 
    padding: Theme.SPACING.MD,
    borderRadius: Theme.BRADIUS.XL,
    backgroundColor: Theme.COLORS.BACKGROUND_BLACK
  },
  topCon: {
    backgroundColor: Theme.COLORS.MAIN_BACKGROUND_BLACK,
    padding: Theme.SPACING.LG,
    justifyContent: 'center', 
    alignItems: 'center'
  },
  botCon: {
    flex: 1,
    padding: Theme.SPACING.LG,
    justifyContent: 'space-between',
    flexDirection: 'row',
    backgroundColor: Theme.COLORS.MAIN_BACKGROUND_GRAY,
  },
  pinkText: {
    textAlign: 'center',
    marginBottom: Theme.SPACING.MD,
    color: Theme.COLORS.ACTIVE_PINK
  },
  closeCon: {
    width: '100%',
    justifyContent: 'center', 
    alignItems: 'center'
  }
});

export default NewWalletConnect;