import React from 'react';
import { ViewStyle, View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';

interface Props {
  conStyle?: ViewStyle,
  style?: ViewStyle
}

export default (props: Props) => 
  <View style={[props.conStyle, { flex: 1, justifyContent: 'center', alignItems: 'center'}]}>
    <ActivityIndicator animating size="large" style={props.style} />
  </View>;
