import React, { FC, ReactElement } from "react";

//Components
import { View, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { FatPinkButton } from "../components/ui/buttons/buttons";
import { HeaderText, NormalText, SubHeaderText } from "../components/ui/text/text";
import { Wallet as WalletHeader } from "../components/wallet-header/wallet-header";

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
import Wallet from '../assets/svgs/Icons/wallet';
import AccountCircle from "../assets/svgs/Icons/account-circle";

//Styles
import * as Theme from '../constants/theme';

//Utils
import { formatAddress } from "../utils/stringFormatting";
import ScreenWrapper from "../components/screenWrapper/screenWrapper";

interface Props extends BottomTabScreenProps<RootStackParamList, 'NewWalletConnect'> {}


const NewWalletConnect : FC<any> = (props: Props) : ReactElement => {

  const { address } = props.route.params;

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
    <ScreenWrapper>
      <View style={styles.maxCon}>
        <View style={styles.topCon}>
          {keychain ?
            <AccountCircle height={150} width={150} color={Theme.COLORS.INACTIVE_GRAY} />
          :
            <Image />
          }
          <SubHeaderText style={{ color: Theme.COLORS.LABEL_TEXT_WHITE }}>{user.username}</SubHeaderText>
          <WalletHeader 
            conStyle={{ width: '50%' }} 
            index={0} 
            address={keychain.keychainAccount.toBase58()}
          />
          {keychain.keys.map((wallet, i) => 
            <WalletHeader 
              conStyle={{ width: '50%' }} 
              index={i + 1} 
              address={wallet.wallet.toBase58()} 
            />
          )}
          {/* TODO PENDING WALLET */}
        </View>
        <View style={styles.botCon}>
          <View style={styles.botCont_1}>
            <View style={styles.addressCon}>
              <HeaderText style={{ color: Theme.COLORS.LABEL_TEXT_WHITE, padding:Theme.SPACING.MD}}>{formatAddress(address)}</HeaderText>
            </View>
            <NormalText style={{ color: Theme.COLORS.ALERT_YELLOW, width: '100%', textAlign: 'center'}}>
              To verify and link this wallet to your Keychain account, connect an existing verified wallet, add this wallet, then reconnect with this wallet
            </NormalText>
            {isWalletPending ?
              <FatPinkButton text="VERIFY" func={verifyWallet} />
            :
              <WalletMultiButton style={{width:'100%', backgroundColor: Theme.COLORS.ACTIVE_PINK, borderRadius:Theme.BRADIUS.XXL, display: 'flex', alignContent: 'center'}}>
                <View style={{ flexDirection: 'row', alignItems: 'center'}}>
                  <Wallet color={Theme.COLORS.LABEL_TEXT_WHITE} />
                  <HeaderText style={{ color: Theme.COLORS.LABEL_TEXT_WHITE, marginLeft: 5, textAlign: 'center', fontFamily: 'BlenderPro-Bold'}}>CONNECT WALLET</HeaderText>
                </View>
              </WalletMultiButton>
            }
          </View>
          <View style={styles.closeCon}>
            <TouchableOpacity onPress={goBack}>
              <Close color={Theme.COLORS.INACTIVE_GRAY}/>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  maxCon: {
    width: '100%',
    height: '100%',
    maxWidth: Theme.MAX_WIDTH_CON,
    minHeight: Theme.MIN_HEIGHT_CON,
    display: 'flex',
    alignSelf: 'center'
    
  },
  addressCon: {
    width: '100%',
    justifyContent: 'center', 
    alignItems: 'center', 
    padding: Theme.SPACING.MD,
    borderRadius: Theme.BRADIUS.SM,
    backgroundColor: Theme.COLORS.BACKGROUND_BLACK,
    borderColor: Theme.COLORS.ACTIVE_PINK, 
    borderWidth: 0.5 
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
    //gap: Theme.SPACING.XXL,
    justifyContent: 'space-between',
    backgroundColor: Theme.COLORS.MAIN_BACKGROUND_GRAY, 
  },
  botCont_1:{
    height: '30%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    gap: Theme.SPACING.XXL,
    
  },
  pinkText: {
    textAlign: 'center',
    marginBottom: Theme.SPACING.MD,
    color: Theme.COLORS.ACTIVE_PINK
  },
  closeCon: {
    justifyContent: 'center', 
    alignItems: 'center',
  }
});

export default NewWalletConnect;