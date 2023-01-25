import React, { FC, ReactElement } from 'react';

//Components
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { ThinText } from '../ui/text/text';

//Svgs
import CheckDecagram from '../../assets/svgs/Icons/check-decagram';

//Types
import { NFT } from '../../types/NFT';

//Styles
import * as Theme from '../../constants/theme';

interface Props {
  nft: NFT,
  index: number,
  dimension: number, // TODO utilize this properly
  func: (nft: NFT) => void
}


export const GalleryNFT: FC<Props> = (props: Props) : ReactElement => {

  const goToFocusNFT = () => props.func(props.nft)

  
  return (
    <TouchableOpacity onPress={goToFocusNFT} style={styles.con}>
      <Image style={styles.img} source={{ uri: props.nft.imageUrl }}/>
      <View style={styles.label}>
        {!!props.nft.collection && <CheckDecagram height={15} width={15} color={Theme.COLORS.ACTIVE_PINK} />}
        <ThinText style={[styles.text, !!props.nft.collection && { marginLeft: Theme.SPACING.SM }]}>{props.nft.name}</ThinText>
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
    width: 120,
    height: 120,
    resizeMode: 'contain'
  },
  label: {
    position: 'absolute',
    flexDirection: 'row', 
    alignItems: 'center', 
    bottom: Theme.SPACING.SM,
    left: Theme.SPACING.SM,
    backgroundColor: Theme.COLORS.LABEL_BLACK,
    borderRadius: Theme.BRADIUS.SM,
    paddingHorizontal: Theme.SPACING.SM
  },
  text: { 
    color: Theme.COLORS.LABEL_TEXT_WHITE, 
    fontSize: 10 
  }
});

export default GalleryNFT;
