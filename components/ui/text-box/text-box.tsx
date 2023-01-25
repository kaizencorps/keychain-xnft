import React, { FC, ReactElement } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NormalText } from '../text/text';

import * as Theme from "../../../constants/theme";


interface Props {
    letras: string
}


export const Box: React.FC<any> = (props: Props) : React.ReactElement => {
    return(
        <View style={styles.con}>
            <NormalText style={styles.text}>{props.letras}</NormalText>
        </View>
    )
}


const styles = StyleSheet.create({
    con: {
        width: "100%",
        borderRadius: Theme.BRADIUS.SM,
        backgroundColor: Theme.COLORS.BUTTON_BACKGROUND_GRAY, 
        padding: Theme.SPACING.XL
    },
    text:{
        color: Theme.COLORS.LABEL_TEXT_WHITE,
        textAlign: "center"
    }
  })