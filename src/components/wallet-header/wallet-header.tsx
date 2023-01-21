import React, { FC, ReactElement } from "react";

//Components
import { View, StyleSheet, TouchableOpacity, Image, GestureResponderEvent, ViewStyle } from 'react-native';
import { SubHeaderText } from "../ui/text/text";

//SVGs
import Numeric1Box from '../../assets/svgs/Icons/numeric-1-box';
import Numeric2Box from '../../assets/svgs/Icons/numeric-2-box';
import Numeric3Box from '../../assets/svgs/Icons/numeric-3-box';
import Numeric4Box from '../../assets/svgs/Icons/numeric-4-box';
import Numeric5Box from '../../assets/svgs/Icons/numeric-5-box';
import Plus from "../../assets/svgs/Icons/plus";
import Alert from "../../assets/svgs/Icons/alert";

//Styles
import * as Theme from '../../constants/theme';

//Utils
import { formatAddress } from "../../utils/stringFormatting";
import { KeyState } from "../../types/NFT";
import {consoleLog} from "../../_helpers/debug";

interface WalletRowProps {
  keyState: KeyState,
  func?: (event: GestureResponderEvent) => void,
  conStyle?: ViewStyle
}

interface NewWalletProps {
  func: (event: GestureResponderEvent) => void
}

interface VeryifyWalletProps {
  address: string
}


export const WalletRow : FC<any> = (props: WalletRowProps) : ReactElement => {

  const getIcon = React.useCallback(() => {
    /* TODO PENDING WALLET icon */
    if (!props.keyState.verified) {
      //then this wallet is pending
      consoleLog('--->>> todo: return the pending icon here for the WalletRow');
      // return the pending icon
    } else {
      switch(props.keyState.index){
        case 0: return <Numeric1Box color={"#D5DDF9"} />
        case 1: return <Numeric2Box color={"#D5DDF9"} />
        case 2: return <Numeric3Box color={"#D5DDF9"} />
        case 3: return <Numeric4Box color={"#D5DDF9"} />
        case 4: return <Numeric5Box color={"#D5DDF9"} />
      }
    }
  }, [])

  return (
      <TouchableOpacity
          onPress={() => props.func}
          disabled={props.func === undefined}
          style={[
            styles.con,
            { backgroundColor: Theme.COLORS.HEADER_BACKGROUND_GRAY },
            props.conStyle
          ]}
      >
        {getIcon()}
        <SubHeaderText style={{ marginLeft: Theme.SPACING.MD, color: Theme.COLORS.HEADER_GRAY }}>{formatAddress(props.keyState.wallet)}</SubHeaderText>
      </TouchableOpacity>
  )
}


export const NewWallet : FC<any> = (props: NewWalletProps) : ReactElement => {

  return(
    <TouchableOpacity onPress={props.func} style={[styles.con, { backgroundColor: Theme.COLORS.SUBTLE_PINK }]}>
      <Plus color={Theme.COLORS.ACTIVE_PINK} />
      <SubHeaderText style={{ marginLeft: Theme.SPACING.MD, color: Theme.COLORS.ACTIVE_PINK }}>Add new wallet</SubHeaderText>
    </TouchableOpacity>
  )
}

export const VerifyWallet : FC<any> = (props: VeryifyWalletProps) : ReactElement => {

  return (
    <View style={[styles.con, { backgroundColor: Theme.COLORS.SUBTLE_YELLOW }]}>
      <Alert color={Theme.COLORS.ALERT_YELLOW} />
      <SubHeaderText style={{ marginLeft: Theme.SPACING.MD, color: Theme.COLORS.HEADER_GRAY }}>{formatAddress(props.address)}</SubHeaderText>
    </View>
  )
}

const styles = StyleSheet.create({
  con: {
    width: '100%',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    padding: Theme.SPACING.MD,
    borderRadius: Theme.SPACING.SM,
    marginBottom: Theme.SPACING.SM
  }
});
