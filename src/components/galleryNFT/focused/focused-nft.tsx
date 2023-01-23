import React from 'react';
import { NFT } from '../../../types/NFT';

//Components
import { HeaderText, NormalText } from '../../ui/text/text';
import { View, StyleSheet, Image } from 'react-native';

//SVGs
import Star from '../../../assets/svgs/Icons/star';
import Numeric1Box from '../../../assets/svgs/Icons/numeric-1-box';
import Numeric2Box from '../../../assets/svgs/Icons/numeric-2-box';
import Numeric4Box from '../../../assets/svgs/Icons/numeric-4-box';
import Numeric5Box from '../../../assets/svgs/Icons/numeric-5-box';
import CheckDecagram from '../../../assets/svgs/Icons/check-decagram';

//Styles
import * as Theme from '../../../constants/theme';

interface props {
  nft: NFT,
  wallet: { name: string, index: number },
  widthOfCon: number
}

const NFTFocused : React.FC<any> = (props: props) : React.ReactElement => {

  const getIcon = React.useCallback(() => {
    switch(props.wallet.index){
      case 0: return <Numeric1Box color={"#D5DDF9"} />
      case 1: return <Numeric2Box color={"#D5DDF9"} />
      case 2: return <Numeric2Box color={"#D5DDF9"} />
      case 3: return <Numeric4Box color={"#D5DDF9"} />
      case 4: return <Numeric5Box color={"#D5DDF9"} />
      default: return <Star color={"#D5DDF9"} />
    }
  }, [])

  return (
    <View style={[styles.con, { width: props.widthOfCon, height: props.widthOfCon }]}>
      <HeaderText style={styles.name}>{props.nft.name}</HeaderText>
      <Image source={{ uri: props.nft.imageUrl }} style={styles.img} />
      <View style={[styles.walletInfo, { justifyContent: !!props.nft.collection ? 'space-between' : 'flex-end' }]}>
        {!!props.nft.collection &&
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <CheckDecagram color={Theme.COLORS.ACTIVE_PINK} />
            <NormalText style={{ color: Theme.COLORS.LABEL_TEXT_WHITE, marginLeft: Theme.SPACING.SM }}>{props.nft.collection}</NormalText>
          </View>
        }
        {getIcon()}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  con: {
    flex: 1,
    alignItems: 'center'
  },
  name: {
    color: Theme.COLORS.LABEL_TEXT_WHITE,
    textAlign: 'center',
    marginBottom: Theme.SPACING.SM
  },
  img: {
    height: 200,
    width: 200,
    resizeMode: 'contain'
  },
  walletInfo: {
    width: '100%',
    padding: Theme.SPACING.SM,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  }
})

export default NFTFocused;
