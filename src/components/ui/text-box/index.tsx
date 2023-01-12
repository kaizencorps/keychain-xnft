import React, { FC, ReactElement } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import * as Theme from "../../../constants/theme";


interface Props {
    letras: string
}


export const Box: React.FC<any> = (props: Props) : React.ReactElement => {
    return(
        <View style={styles.con}>
            <Text style={styles.text}>{props.letras}</Text>
        </View>
    )
}


const styles = StyleSheet.create({
    con: {
        width: "100%",
        borderRadius: Theme.BRADIUS.XL,
        backgroundColor: Theme.COLORS.BUTTON_BACKGROUND_GRAY, 
        padding: Theme.SPACING.XL
    },
    text:{
        fontFamily: 'BlenderPro-Bold', 
        color: Theme.COLORS.LABEL_TEXT_WHITE,
        lineHeight: 12,
        textAlign: "center"
    }
  })