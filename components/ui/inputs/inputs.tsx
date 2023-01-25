import React, { FC, ReactElement } from 'react';
import { View, StyleSheet, TextStyle, TextInput } from 'react-native';

import * as Theme from '../../../constants/theme';
import { ErrorText } from '../text/text';

interface Props {
  val: string,
  onChangeText: (text: string) => void,
  isPassword?: boolean,
  style?: TextStyle,
  placeholder?: string,
  errorText?: string
}

export const Input : FC<any> = (props: Props) : ReactElement => {

  
  return (
    <View style={styles.con}>
      <TextInput
        value={props.val}
        onChangeText={props.onChangeText}
        secureTextEntry={props.isPassword}
        style={[
          styles.inputCon, 
          props.style, 
          { borderColor: !!props.errorText ? Theme.COLORS.SCARY_RED : Theme.COLORS.MEDIA_BORDER }
        ]}
        placeholder={props.placeholder}
      />
      {!!props.errorText && <ErrorText>{props.errorText}</ErrorText>}
    </View>
  );
};

const styles = StyleSheet.create({
  con: {
    marginBottom: Theme.SPACING.MD,
  },
  inputCon: {
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: Theme.BRADIUS.MD,
    backgroundColor: Theme.COLORS.BACKGROUND_BLACK,
    padding: Theme.SPACING.SM,
    color: Theme.COLORS.LABEL_TEXT_WHITE
  }
});

export default Input;