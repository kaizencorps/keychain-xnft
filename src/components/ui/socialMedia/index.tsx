import React, { FC, ReactElement } from 'react';
import { TouchableOpacity, StyleSheet, Linking } from 'react-native';

import * as Theme from "../../../constants/theme";


interface Props {
    icon: React.ReactElement,
    link: string,
    bgColor: string
}

// TODO maybe need a different linking system for web vs mobile


export const SocialMedia: FC<any> = (props: Props) : ReactElement => {
    return(
        <TouchableOpacity style={[styles.con, {backgroundColor: props.bgColor}]} onPress={() => Linking.openURL(props.link)}>
            {props.icon}
        </TouchableOpacity>
    )
}


const styles = StyleSheet.create({
    con: {
        width: 60,
        height: 60,
        borderRadius: 30,
        padding: Theme.SPACING.MD,
        display: 'flex',
        justifyContent : 'center',
        alignItems : 'center'
    }
})