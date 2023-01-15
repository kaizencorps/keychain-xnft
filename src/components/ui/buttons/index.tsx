import React from 'react';

//Components
import { StyleSheet, TouchableOpacity, GestureResponderEvent, View } from 'react-native';
import { NormalText, HeaderText } from '../text';

//Styles
import * as Theme from '../../../constants/theme';

interface FatButtonProps {
  text: string,
  color: string,
  backgroundColor?: string,
  borderColor?: string,
  icon?: React.ReactElement,
  func: (event: GestureResponderEvent) => void
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
      {!!props.icon && props.icon}
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
      {!!props.icon && props.icon}
      <View style={{ flex: 1 }}>
        <HeaderText style={{ color: Theme.COLORS.LABEL_TEXT_WHITE, textAlign: 'center' }}>{props.text}</HeaderText>
      </View>
  </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  con: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: Theme.SPACING.MD,
    borderRadius: Theme.BRADIUS.XL,
    marginBottom: Theme.SPACING.MD
  }
})