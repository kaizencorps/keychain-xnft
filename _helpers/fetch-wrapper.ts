import { useRecoilState, useRecoilValue } from 'recoil';

import { authAtom, userProfileAtom } from '../_state';
import { consoleLog } from './debug';

//Constants
import Constants from 'expo-constants';

function useFetchWrapper() {
    const userProfileState = useRecoilValue(userProfileAtom);

    // helper functions

    function authHeader(url: string) {
        // return auth header with basic auth credentials if user is logged in and request is to the api url
        const isLoggedIn = !!userProfileState.jwt
        // const isApiUrl = url.startsWith(Constants.expoConfig.extra.BASE_API_URL as string);
        if (isLoggedIn) {
            return { Authorization: `Bearer ${userProfileState.jwt}` };
        }
        return {};
    }

    function handleError(error: any) {
        // eslint-disable-next-line no-console
        console.error(`Error${error.name ? ` (${error.name})` : ':'} ${error.message || 'Unknown error'}`);
    }

    function handleResponse(response: any) {
        consoleLog("Did we get a response? ", response);
        return response.text().then((text: string) => {
            const data = text && JSON.parse(text);

            if (!response.ok) {
                if ([401, 403].includes(response.status) && userProfileState.jwt) {
                    // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
                    localStorage.removeItem('jwt');
                    consoleLog('>>>>> auto logout!');

                    // todo: re-add ..?
                    // setAuth(null);
                    // history.push('/login');
                    consoleLog('>> redirect to login page here!');
                }

                const error = (data && data.message) || response.statusText;
                return Promise.reject(error);
            }

            return data;
        });
    }

    function request(method: string) {
        return async (url: string, body: any) => {
            const requestOptions: any = {
                method,
                headers: authHeader(url),
            };
            if (body) {
                requestOptions.headers['Content-Type'] = 'application/json';
                requestOptions.body = JSON.stringify(body);
            }
            try {
                console.log("request options: ", requestOptions)
                console.log(url);
                return await fetch(url, requestOptions).then(handleResponse).catch(handleError);
            } catch (e) {
                handleError(e);
                return Promise.reject(e);
            }
        };
    }

    return {
        get: request('GET'),
        post: request('POST'),
        put: request('PUT'),
        delete: request('DELETE'),
    };
}

export { useFetchWrapper };
