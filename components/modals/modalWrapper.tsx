import React, { FC, ReactElement } from 'react';

//Components
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';
import { HeaderText } from '../ui/text/text';

//SVGs
import Close from '../../assets/svgs/Icons/close';

//Styles
import * as Theme from '../../constants/theme';

interface Props {
  title: string,
  showModal: boolean,
  toggleModal: () => void,
  children: React.ReactNode
}


const ModalWrapper: FC<any> = (props: Props) : ReactElement => {


  return (
    <Modal
      isVisible={props.showModal}
      propagateSwipe
      useNativeDriver
      useNativeDriverForBackdrop
      backdropColor={'rgba(255, 255, 255, 0.7)'}
      backdropOpacity={0.5}
      onBackdropPress={props.toggleModal}
      animationIn={'fadeIn'}
      animationOut={'fadeOut'}
      hideModalContentWhileAnimating={true}
    >
      <View style={[styles.modalCon]}>
        <View style={styles.topCon}>
          <HeaderText>{props.title ?? ''}</HeaderText>
          <TouchableOpacity
            hitSlop={{bottom: 30, right: 10, top: 10, left: 30}} 
            onPress={props.toggleModal}
          >
            <Close color={Theme.COLORS.LABEL_TEXT_WHITE} />
          </TouchableOpacity>
        </View>
        {props.children}
      </View>
    </Modal>
  );
};

export default ModalWrapper;

const styles = StyleSheet.create({
  topCon: {
    flexDirection: 'row', 
    justifyContent: 'space-between'
  },
  modalCon: {
    maxHeight: '80%',
    width: '100%',
    maxWidth: 700,
    borderRadius: Theme.BRADIUS.LG, 
    borderWidth: StyleSheet.hairlineWidth,
    overflow: 'hidden',
    alignSelf: 'center',
    backgroundColor: Theme.COLORS.MAIN_BACKGROUND_GRAY,
  }
})