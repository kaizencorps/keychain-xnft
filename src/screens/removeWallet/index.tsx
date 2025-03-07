import React, { FC, ReactElement } from "react";

//Components
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { BannerText, HeaderText, NormalText } from "../../components/ui/text";

//Types
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { RootStackParamList } from "../../nav/homeStack";

//SVGs
import Numeric1Box from '../../assets/svgs/Icons/numeric-1-box';
import Numeric2Box from '../../assets/svgs/Icons/numeric-2-box';
import Numeric3Box from '../../assets/svgs/Icons/numeric-3-box';
import Numeric4Box from '../../assets/svgs/Icons/numeric-4-box';
import Numeric5Box from '../../assets/svgs/Icons/numeric-5-box';

//Styles
import * as Theme from '../../constants/theme';
import Close from "../../assets/svgs/Icons/close";

//Utils
import { formatAddress } from "../../utils/stringFormatting";
import { FatButton } from "../../components/ui/buttons";

interface Props extends BottomTabScreenProps<RootStackParamList, 'RemoveWallet'> {}


const RemoveWallet : FC<any> = (props: Props) : ReactElement => {

  // const { address, index } = props.route.params;
  const address: string = "bgviruvrs78vrsv09rs"
  const index: number = 2;

  const removeWallet = () => {
    // TODO
  }

  const goBack = () => props.navigation.goBack();

  const getIcon = React.useMemo(() => {
    switch(index){
      case 1: return <Numeric1Box color={"#D5DDF9"} width={75} height={75} />
      case 2: return <Numeric2Box color={"#D5DDF9"} width={75} height={75} />
      case 3: return <Numeric3Box color={"#D5DDF9"} width={75} height={75} />
      case 4: return <Numeric4Box color={"#D5DDF9"} width={75} height={75} />
      case 5: return <Numeric5Box color={"#D5DDF9"} width={75} height={75} />
    }
  }, [index])


  return (
    <View style={styles.con}>
      <View style={styles.maxCon}>
        <View style={styles.topCon}>
          {getIcon}
          <BannerText style={{ color: Theme.COLORS.LABEL_TEXT_WHITE, marginTop: Theme.SPACING.LG, marginBottom: Theme.SPACING.SM }}>{`Wallet ${index}`}</BannerText>
          <View style={styles.addressCon}>
            <HeaderText style={{ color: Theme.COLORS.LABEL_TEXT_WHITE }}>{formatAddress(address)}</HeaderText>
          </View>
        </View>
        <View style={styles.botCon}>
          <View style={{ flex: 1, alignItems: 'center' }}>
            <NormalText style={{ color: Theme.COLORS.ACTIVE_PINK, marginBottom: Theme.SPACING.MD }}>--- NFTs</NormalText>
            <NormalText style={{ color: Theme.COLORS.ACTIVE_PINK, marginBottom: Theme.SPACING.MD }}>--- Collections</NormalText>
            <FatButton
              text="REMOVE WALLET"
              color={Theme.COLORS.SCARY_RED}
              backgroundColor={Theme.COLORS.BUTTON_BACKGROUND_GRAY}
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
    flexDirection: 'column',
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

export default RemoveWallet;
