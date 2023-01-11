import React from 'react';

//Components
import { StyleSheet, TouchableOpacity, GestureResponderEvent } from 'react-native';
import { NormalText } from '../text';

//Styles
import * as Theme from '../../../constants/theme';

interface FatButtonProps {
  text: string,
  color: string,
  backgroundColor?: string,
  borderColor?: string,
  icon: React.ReactElement,
  func: (event: GestureResponderEvent) => void
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
      {props.icon}
      <NormalText style={{ color: props.color }}>{props.text}</NormalText>
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