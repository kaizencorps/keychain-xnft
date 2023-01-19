import React, {FC, ReactElement, useState} from "react";

//Components
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { FatButton, FatPinkButton } from "../components/ui/buttons";
import { BannerText, HeaderText, SubHeaderText } from "../components/ui/text";

//Types
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { RootStackParamList } from "../nav/homeStack";

//SVGs
import Numeric1Box from '../assets/svgs/Icons/numeric-1-box';
import Numeric2Box from '../assets/svgs/Icons/numeric-2-box';
import Numeric3Box from '../assets/svgs/Icons/numeric-3-box';
import Numeric4Box from '../assets/svgs/Icons/numeric-4-box';
import Numeric5Box from '../assets/svgs/Icons/numeric-5-box';
import Close from "../assets/svgs/Icons/close";

//Styles
import * as Theme from '../constants/theme';

//Utils
import { formatAddress } from "../utils/stringFormatting";


interface Props extends BottomTabScreenProps<RootStackParamList, 'WalletDetails'> {
  // other props ...
}


const WalletDetails : FC<any> = (props: Props) : ReactElement => {

  const { address, index, numNFTS, numCollections } = props.route.params.wallet;

  const getIcon = React.useMemo(() => {
    switch(index){
        case 1: return <Numeric1Box color={Theme.COLORS.LABEL_TEXT_WHITE} height={75} width={75} />
        case 2: return <Numeric2Box color={Theme.COLORS.LABEL_TEXT_WHITE} height={75} width={75} />
        case 3: return <Numeric3Box color={Theme.COLORS.LABEL_TEXT_WHITE} height={75} width={75} />
        case 4: return <Numeric4Box color={Theme.COLORS.LABEL_TEXT_WHITE} height={75} width={75} />
        case 5: return <Numeric5Box color={Theme.COLORS.LABEL_TEXT_WHITE} height={75} width={75} />
    }
  }, [index])

  const removeWallet = () => {

  }

  const goBack = () => props.navigation.goBack();

  return (
    <View style={styles.con}>
      <View style={styles.topCon}>
        {getIcon}
        <BannerText style={{ color: Theme.COLORS.LABEL_TEXT_WHITE, marginTop: Theme.SPACING.LG, marginBottom: Theme.SPACING.SM }}>{`Wallet ${index}`}</BannerText>
        <View style={styles.addressCon}>
          <HeaderText style={{ color: Theme.COLORS.LABEL_TEXT_WHITE }}>{formatAddress(address)}</HeaderText>
        </View>
      </View>
      <View style={styles.botCon}>
        <View>
          <SubHeaderText style={styles.pinkText}>{`${numNFTS} NFTS`}</SubHeaderText>
          <SubHeaderText style={styles.pinkText}>{`${numCollections} Collections`}</SubHeaderText>
          <FatButton 
            text="REMOVE WALLET"
            color={Theme.COLORS.SCARY_RED}
            backgroundColor={Theme.COLORS.INACTIVE_GRAY}
            func={removeWallet}
          />
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
  addressCon: {
    justifyContent: 'center', 
    alignItems: 'center', 
    padding: Theme.SPACING.MD,
    borderRadius: Theme.BRADIUS.XL,
    backgroundColor: Theme.COLORS.BACKGROUND_BLACK
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

export default WalletDetails;