import React, { FC, ReactElement } from 'react';
import { TouchableOpacity, StyleSheet, Linking } from 'react-native';

import * as Theme from "../../../constants/theme";


interface Props {
    icon: React.ReactElement,
    link: string,
    bg_Color: string
}


export const SocialMedia: React.FC<any> = (props: Props) : React.ReactElement => {
    return(
        <TouchableOpacity style={[styles.con, {backgroundColor: props.bg_Color}]} onPress={() => Linking.openURL(props.link)}>
            {props.icon}
        </TouchableOpacity>
    )
}


const styles = StyleSheet.create({
    con: {
        width: 50,
        height: 50,
        borderRadius: 25,
        padding: Theme.SPACING.MD
    }
})