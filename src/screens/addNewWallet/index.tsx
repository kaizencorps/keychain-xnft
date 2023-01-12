import React, {FC, ReactElement, useState} from "react";

//Components
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Input from "../../components/ui/inputs";

//Types
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';

//SVGs
import Wallet from '../../assets/svgs/Icons/wallet';

//Styles
import * as Theme from '../../constants/theme';
import { BannerText, SubHeaderText } from "../../components/ui/text";
import Close from "../../assets/svgs/Icons/close";
import { FatPinkButton } from "../../components/ui/buttons";

// interface Props {
//   navigation: BottomTabNavigationProp<ParamList>,
//   route: RouteProp<ParamList, T>
// }


const Home : FC<any> = () : ReactElement => {

  const [input, setInput] = React.useState('')

  const submitNewWallet = () => {

  }

  const goBack = () => {}

  return (
    <View style={styles.con}>
      <View style={styles.topCon}>
        <Wallet color={Theme.COLORS.LABEL_TEXT_WHITE} height={75} width={75} />
        <BannerText style={{ color: Theme.COLORS.LABEL_TEXT_WHITE, marginTop: Theme.SPACING.LG }}>Add new wallet</BannerText>
      </View>
      <View style={styles.botCon}>
        <View>
          <SubHeaderText style={styles.pinkText}>Enter a wallet address you want to add to your keychain account</SubHeaderText>
          <Input 
            val={input}
            onChangeText={setInput}
          />
          <FatPinkButton text="SUBMIT" func={submitNewWallet} />
        </View>
        <View style={styles.closeCon}>
          <TouchableOpacity onPress={goBack}>
            <Close color={Theme.COLORS.INACTIVE_GRAY} />
          </TouchableOpacity>
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
  topCon: {
    backgroundColor: Theme.COLORS.BACKGROUND_BLACK,
    padding: Theme.SPACING.LG,
    justifyContent: 'center', 
    alignItems: 'center'
  },
  botCon: {
    flex: 1,
    padding: Theme.SPACING.LG,
    justifyContent: 'space-between',
    flexDirection: 'row'
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

export default Home;
