import { toastsAtom, ToastsState, NOTI_STATUS } from '_state';
import { useRecoilState } from 'recoil';


export const useToasts = () => {

  const [toasts, setToasts] = useRecoilState<ToastsState>(toastsAtom);

  const createToast = (text: string, type: NOTI_STATUS) => {
    const newArray = [...toasts.toasts];
    newArray.push({
      id: (newArray.length + 1).toString(),
      text,
      type,
    })
    setToasts({ toasts: newArray });
  }

  return {
    createToast
  };
};


export default useToasts;