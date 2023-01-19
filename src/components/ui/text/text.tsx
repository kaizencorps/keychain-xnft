import * as React from 'react';
import { Text, StyleProp, TextStyle, StyleSheet } from 'react-native';

interface Props {
  children: string
  style?: StyleProp<TextStyle>
}

export const SubHeaderText: React.FunctionComponent<Props> = (props) : React.ReactElement => <Text style={[styles.subheader, props.style]}>{props.children}</Text>;
export const HeaderText: React.FunctionComponent<Props> = (props) : React.ReactElement => <Text style={[styles.header, props.style]}>{props.children}</Text>;
export const NormalText: React.FunctionComponent<Props> = (props) : React.ReactElement => <Text style={[styles.normal, props.style]}>{props.children}</Text>;
export const ThinText: React.FunctionComponent<Props> = (props) : React.ReactElement => <Text style={[styles.thin, props.style]}>{props.children}</Text>;
export const BannerText: React.FunctionComponent<Props> = (props) : React.ReactElement => <Text style={[styles.banner, props.style]}>{props.children}</Text>;

const styles = StyleSheet.create({
  normal: {
    fontSize: 14,
    lineHeight: 16,
    fontFamily: 'BlenderPro-Medium'
  },
  subheader: {
    fontSize: 16,
    lineHeight: 18,
    fontFamily: 'BlenderPro-Bold'
  },
  header: {
    fontSize: 20,
    lineHeight: 22,
    fontFamily: 'BlenderPro-Book'
  },
  thin: {
    fontSize: 14,
    lineHeight: 16,
    fontFamily: 'BlenderPro-Thin'
  },
  banner: {
    fontSize: 30,
    fontFamily: 'BlenderPro-Bold'
  }
})