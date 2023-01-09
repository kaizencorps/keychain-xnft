import {SetterOrUpdater, useRecoilState, useSetRecoilState} from 'recoil';

import {
    userAtom,
} from '../_state';


function useKeychainActions() {

    const [user, setUser] = useRecoilState(userAtom);

    function setUsername(username: string) {
        setUser({username})
    }

    return {
        setUsername,
    };
}
