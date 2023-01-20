import React, { FC, ReactElement } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import * as Theme from '../../constants/theme';

interface Props {
  children: React.ReactNode
}

export const ScreenWrapper : FC<any> = (props: Props) : ReactElement => {

  return (
    <View style={styles.con}>
      <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
        <View style={styles.center}>
          {props.children}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  con: {
    flex: 1,
    backgroundColor: Theme.COLORS.BACKGROUND_BLACK,
    justifyContent: 'center',
  }, 
  center: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center',
  }
});

export default ScreenWrapper;