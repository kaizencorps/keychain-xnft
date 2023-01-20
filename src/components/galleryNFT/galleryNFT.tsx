import React, { FC, ReactElement } from 'react';

//Components
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { ThinText } from '../ui/text/text';

//Types
import { NFT } from '../../types/NFT';

//Styles
import * as Theme from '../../constants/theme';

interface Props {
  nft: NFT,
  index: number,
  dimension: number,
  func: (nft: NFT) => void
}


export const GalleryNFT: FC<Props> = (props: Props) : ReactElement => {

  const goToFocusNFT = () => props.func(props.nft)

  
  return (
    <TouchableOpacity onPress={goToFocusNFT} style={styles.con}>
      <Image style={styles.img} source={{ uri: props.nft.imageUrl }}/>
      <View style={styles.label}>
        <ThinText style={{ color: Theme.COLORS.LABEL_TEXT_WHITE, fontSize: 10 }}>{props.nft.name}</ThinText>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  con: {
    position: 'relative',
    borderRadius: Theme.BRADIUS.MD,
    overflow: 'hidden',
    maxWidth: 120,
  },
  img: {
    width: 150,
    height: 150,
    resizeMode: 'contain'
  },
  label: {
    position: 'absolute',
    bottom: Theme.SPACING.SM,
    left: Theme.SPACING.SM,
    backgroundColor: Theme.COLORS.LABEL_BLACK,
    borderRadius: Theme.BRADIUS.SM
  }
});

export default GalleryNFT;
