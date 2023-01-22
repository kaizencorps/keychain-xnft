import { atom } from 'recoil';
import jwt_decode from 'jwt-decode';
import { LOCAL_STORAGE_KEYS } from './_constants';
import { consoleLog } from '../_helpers/debug';

// todo: come up with a ts type for the auth state/data

function getLocalAuthData() {
    const authData = localStorage.getItem(LOCAL_STORAGE_KEYS.authData);
    if (authData) {
        return JSON.parse(authData);
    }
    return null;
}

function createAndSetLocalAuthData(loginResponseAccessToken: string) {
    const decoded: any = jwt_decode(loginResponseAccessToken);
    const accessToken = loginResponseAccessToken;
    const expiration = decoded.exp * 1000; // gets returned in seconds, convert to millis for date comparisons
    localStorage.setItem(LOCAL_STORAGE_KEYS.authData, JSON.stringify({ accessToken, expiration }));
    return { accessToken, expiration };
}

// should be a json object with a 'accessToken' field and 'expiration' date field
const authAtom = atom({
    key: 'auth',
    // get initial state from local storage to enable user to stay logged in
    default: getLocalAuthData(),
});

function getLocalIsLoggedIn() {
    const authData = getLocalAuthData();
    if (authData) {
        const { expiration } = authData;
        return new Date() < expiration;
    }
    return false;
}

// true if the authData exists and isn't expired
function isValidAuthData(authData: any) {
    if (authData && 'expiration' in authData) {
        return new Date() < authData.expiration;
    }
    return false;
}

export { authAtom, createAndSetLocalAuthData, isValidAuthData };
