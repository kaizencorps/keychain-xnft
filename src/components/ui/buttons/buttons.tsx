import React from 'react';

//Components
import { StyleSheet, TouchableOpacity, GestureResponderEvent, View, Platform } from 'react-native';
import { NormalText, HeaderText } from '../text/text';

//Styles
import * as Theme from '../../../constants/theme';

interface FatButtonProps {
  text: string,
  color: string,
  backgroundColor?: string,
  borderColor?: string,
  icon?: React.ReactElement,
  func?: (event: GestureResponderEvent) => void
}

interface FatDownloadButtonProps extends FatButtonProps {
  downloadUrl: string
}

interface FatPinkButtonProps {
  text: string,
  func: (event: GestureResponderEvent) => void
  icon?: React.ReactElement,
}

export const FatButton : React.FC<any> = (props: FatButtonProps) : React.ReactElement => {


  return (
    <TouchableOpacity 
      onPress={props.func} 
      style={[{ 
          backgroundColor: props.backgroundColor ?? 'transparent',
          borderColor: props.borderColor ?? props.backgroundColor 
        },
        styles.con
      ]}
    >
      <View style={styles.iconCon}>
        {!!props.icon && props.icon}
      </View>
      <NormalText style={{ color: props.color }}>{props.text}</NormalText>
    </TouchableOpacity>
  )
}

export const FatPinkButton = (props: FatPinkButtonProps) => {

  return (
    <TouchableOpacity 
      onPress={props.func} 
      style={[{ backgroundColor: Theme.COLORS.ACTIVE_PINK }, styles.con]}
    >
      <View style={styles.iconCon}>
        {!!props.icon && props.icon}
      </View>
      <View style={{ flex: 1 }}>
        <HeaderText style={{ color: Theme.COLORS.LABEL_TEXT_WHITE, textAlign: 'center' }}>{props.text}</HeaderText>
      </View>
  </TouchableOpacity>
  )
}

export const FatDownloadButton = (props: FatDownloadButtonProps) => {

  // TODO cross-domain hosting won't allow me to download this normally. Could do with with fetch probably
  return Platform.OS === 'web' ?
    <a href={props.downloadUrl} download={props.downloadUrl} target="_blank">
      <FatButton {...props} />
    </a>
  :
  // TODO RN
    <FatButton {...props} />
}

const styles = StyleSheet.create({
  con: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: Theme.SPACING.MD,
    borderRadius: Theme.BRADIUS.XL,
    marginBottom: Theme.SPACING.MD,
  },
  iconCon: {
    position: 'absolute',
    left: Theme.SPACING.MD,
    top: 0,
    bottom: 0,
    justifyContent: 'center', 
  }
})