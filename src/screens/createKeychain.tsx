import React, {FC, ReactElement, useState} from "react";

//Components
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { FatPinkButton } from "../components/ui/buttons/buttons";
import { BannerText, HeaderText, NormalText, SubHeaderText } from "../components/ui/text/text";

//Types
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { RootStackParamList } from "../nav/homeStack";

//SVGs
import Close from "../assets/svgs/Icons/close";
import Chevron from '../assets/svgs/Icons/chevron';
import Shimmer from "../assets/svgs/Icons/shimmer";

//Utils
import { formatAddress } from "../utils/stringFormatting";

//Styles
import * as Theme from '../constants/theme';
import Input from "../components/ui/inputs/inputs";


interface Props extends BottomTabScreenProps<RootStackParamList, 'CreateKeychain'> {}


const CreateKeychain : FC<any> = (props: Props) : ReactElement => {

  // const { address } = props.route.params;

  const [username, setUsername] = React.useState('')
  const [errorText, setErrorText] = React.useState('')

  const goBack = () => props.navigation.goBack();
  const goHome = () => props.navigation.navigate('Profile')

  const createKeychain = () => {
    // TODO 
    goHome();
  }

  return (
    <View style={styles.con}>
      <View style={styles.maxCon}>
        <View style={styles.topCon}>
          <Shimmer height={75} width={75} />
          <BannerText style={{ color: Theme.COLORS.LABEL_TEXT_WHITE }}>Welcome!</BannerText>
          <NormalText style={{ color: Theme.COLORS.LABEL_TEXT_WHITE, textAlign: 'center' }}>Create a new keychain account with this wallet</NormalText>
          {/* <View style={styles.addressCon}>
            <HeaderText style={{ color: Theme.COLORS.LABEL_TEXT_WHITE }}>{formatAddress(address)}</HeaderText>
          </View> */}
        </View>
        <View style={styles.botCon}>
          <View style={{ justifyContent: 'center' }}>
            <NormalText style={styles.pickText}>Pick a keychain username</NormalText>
            <Input val={username} onChangeText={setUsername} isError={errorText.length} />
            {!!errorText.length && <NormalText style={styles.errorText}>{errorText}</NormalText>}
            <FatPinkButton text="CREATE KEYCHAIN" func={createKeychain} />
          </View>
          <View style={styles.closeCon}>
            <TouchableOpacity onPress={goBack}>
              <Close color={Theme.COLORS.INACTIVE_GRAY }/>
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
    backgroundColor: Theme.COLORS.BACKGROUND_BLACK,
    justifyContent: 'center', 
    alignItems: 'center'
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
    backgroundColor: Theme.COLORS.MAIN_BACKGROUND_GRAY
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
  },
  swipeCon: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  pickText: {
    color: Theme.COLORS.ACTIVE_PINK,
    textAlign: 'center',
    marginBottom: Theme.SPACING.MD
  },
  errorText: {
    color: Theme.COLORS.SCARY_RED,
    marginBottom: Theme.SPACING.MD,
    textAlign: 'center'
  }
});

export default CreateKeychain;