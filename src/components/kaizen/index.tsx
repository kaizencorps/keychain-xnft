import React, { FC, ReactElement } from 'react';
import { View, Image, StyleSheet, Text } from 'react-native';
import { ThinText } from '../ui/text';

//Types
import { NFT } from '../../types/kaizen';

//Styles
import * as Theme from '../../constants/theme';

interface Props {
  kaizen: NFT,
  index: number,
  dimension: number
}


export const GalleryKaizen: FC<Props> = (props: Props) : ReactElement => {


    return (
      <View style={styles.con}>
        <Image style={styles.img} source={require(`${props.kaizen.imageUrl}`)}/>
        <View style={styles.label}>
          <ThinText style={{ color: Theme.COLORS.LABEL_TEXT_WHITE, fontSize: 10 }}>{props.kaizen.name}</ThinText>
        </View>
      </View>
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
    width: '100%',
    height: '100%',
  },
  label: {
    position: 'absolute',
    bottom: Theme.SPACING.SM,
    left: Theme.SPACING.SM,
    backgroundColor: Theme.COLORS.LABEL_BLACK,
    borderRadius: Theme.BRADIUS.SM
  }
});

export default GalleryKaizen;
