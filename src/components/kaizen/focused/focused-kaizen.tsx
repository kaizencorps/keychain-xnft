import React from 'react';
import { Kaizen } from '../../../types/kaizen';

//Components
import { HeaderText, NormalText } from '../../ui/text/text';
import { View, StyleSheet, Image } from 'react-native';

//SVGs
import Star from '../../../assets/svgs/Icons/star';
import Numeric1Box from '../../../assets/svgs/Icons/numeric-1-box';
import Numeric2Box from '../../../assets/svgs/Icons/numeric-2-box';
import Numeric4Box from '../../../assets/svgs/Icons/numeric-4-box';
import Numeric5Box from '../../../assets/svgs/Icons/numeric-5-box';

import * as Theme from '../../../constants/theme';

interface props {
  kaizen: Kaizen,
  wallet: { name: string, index: number }
}

const KaizenFocused : React.FC<any> = (props: props) : React.ReactElement => {

  const getIcon = React.useCallback(() => {
    switch(props.wallet.index){
      case 0: return <Star color={"#D5DDF9"} />
      case 1: return <Numeric1Box color={"#D5DDF9"} />
      case 2: return <Numeric2Box color={"#D5DDF9"} />
      case 3: return <Numeric2Box color={"#D5DDF9"} />
      case 4: return <Numeric4Box color={"#D5DDF9"} />
      case 5: return <Numeric5Box color={"#D5DDF9"} />
    }
}, [])

  return (
    <View>
      <HeaderText style={styles.name}>{props.kaizen?.name}</HeaderText>
      {/* TODO get proper source */}
      <Image source={require(props.kaizen?.imageUrl)} style={styles.img} /> 
      <View style={styles.walletInfo}>
        <NormalText>{props.wallet.name}</NormalText>
        {getIcon()}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  name: {
    color: Theme.COLORS.LABEL_TEXT_WHITE,
    textAlign: 'center',
  },
  img: {
    aspectRatio: 1/1,
    width: '100%',
    height: undefined,
  },
  walletInfo: {
    flex: 1,
    flexDirection: 'row', 
    justifyContent: 'space-between'
  }
})

export default KaizenFocused;