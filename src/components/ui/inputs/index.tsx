import React, { FC, ReactElement } from 'react';
import { View, StyleSheet, TextStyle, TextInput } from 'react-native';

import * as Theme from '../../../constants/theme';

interface Props {
  val: string,
  isPassword: boolean,
  onChangeText: (text: string) => void,
  style?: TextStyle,
  placeholder?: string,
}

export const Input : FC<any> = (props: Props) : ReactElement => {

  return (
    <TextInput
      value={props.val}
      onChangeText={props.onChangeText}
      secureTextEntry={props.isPassword}
      style={[styles.con, props.style]}
      placeholder={props.placeholder}
    />
  );
};

const styles = StyleSheet.create({
  con: {
    borderColor: Theme.COLORS.ACTIVE_PINK,
    borderRadius: Theme.BRADIUS.MD,
    backgroundColor: Theme.COLORS.BACKGROUND_BLACK,
    marginBottom: Theme.SPACING.MD,
    padding: Theme.SPACING.SM,
    color: Theme.COLORS.LABEL_TEXT_WHITE
  }
});

export default Input;