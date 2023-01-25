import React from 'react';
import { ViewStyle, View, ActivityIndicator } from 'react-native';

interface Props {
  conStyle?: ViewStyle,
  style?: ViewStyle
}

export default (props: Props) => 
  <View style={[props.conStyle, { flex: 1, justifyContent: 'center', alignItems: 'center'}]}>
    <ActivityIndicator animating size="large" style={props.style} />
  </View>;
