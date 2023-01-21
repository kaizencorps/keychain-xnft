import { useRecoilState } from 'recoil';

import { toastsAtom } from '../../_state';


function useToastsActions() {

    const [toasts, setToasts] = useRecoilState(toastsAtom);

    function removeToast(id: string) {
        setToasts({ toasts: toasts.toasts.filter(toast => toast.id !== id) });
    }

    return {
        removeToast
    };
}

export { useToastsActions };