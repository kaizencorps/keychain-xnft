import * as React from 'react';

//Components
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { NormalText } from 'components/ui/text/text';

//Data
import { toastsAtom, ToastsState, NOTI_STATUS } from '_state/notifications/toasts';

//Styles
import * as Theme from 'constants/theme';
import { useRecoilValue } from 'recoil';
import { useToastsActions } from '_actions/notifications/toasts';

export const Toasts = () => {

  const toasts = useRecoilValue<ToastsState>(toastsAtom);
  const toastActions = useToastsActions();

  React.useEffect(() => {
    toasts.toasts.forEach(({ id }) => {
      setTimeout(() => {
        removeToast(id)
      }, 3000);
    });
  }, [toasts.toasts.length])

  const backgroundStyle = (type: NOTI_STATUS) => {
    switch(type){
      case NOTI_STATUS.SUCCESS: return Theme.COLORS.SUCCESS_GREEN;
      case NOTI_STATUS.ERR: return Theme.COLORS.SCARY_RED;
      default: return Theme.COLORS.INACTIVE_GRAY;
    }
  };

  const removeToast = (id: string) => toastActions.removeToast(id);


  return (
    <View style={styles.con}>
      {toasts.toasts.map(({ id, text, type }) => (
        <TouchableOpacity onPress={() => removeToast(id)} key={id} style={[styles.toastCon]}>
          <View style={[styles.innerCon, { backgroundColor: backgroundStyle(type)}]}>
            <NormalText style={{ color: Theme.COLORS.LABEL_TEXT_WHITE }}>{text}</NormalText>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  )
};


export default Toasts;

const styles = StyleSheet.create({
  con: {
    position: 'absolute',
    bottom: 70,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Theme.SPACING.XL,
    zIndex: 999
  },
  toastCon: {
    marginBottom: Theme.SPACING.SM
  },
  innerCon: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 3,
    width: '100%',
    maxWidth: 400,
    padding: 10
  },
  hideCon: {
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 3,
    borderColor: Theme.COLORS.LABEL_TEXT_WHITE,
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
