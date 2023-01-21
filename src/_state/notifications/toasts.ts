import { atom } from 'recoil';

export interface ToastsState {
    toasts: Toast[]
}

export enum NOTI_STATUS {
  SUCCESS = "SUCCESS",
  ERR = "ERR",
  DEFAULT = "DEFAULT"
}

export interface Toast {
  id: string,
  text: string,
  type: NOTI_STATUS
}

export const toastsAtom = atom<ToastsState>({
    key: 'toasts',
    default: {
        toasts: [] as Toast[]
    }
});
