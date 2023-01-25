import { atom } from 'recoil';
import {Program, Provider} from "@project-serum/anchor";

export interface Programs {
  keychain: Program,
  profile: Program
}

// wallet (anchor wallet)
export const programsAtom = atom<Programs | null>({
  key: 'programs',
  default: null,
});
