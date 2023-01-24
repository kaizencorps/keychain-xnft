import {ENABLE_LOGGING} from "../types/utils/config";

export function isDev() {
    // return process.env.REACT_APP_ENV === 'dev';
    return true;
}

export function consoleLog() {
    if (ENABLE_LOGGING) {
        // eslint-disable-next-line prefer-rest-params
        // @ts-ignore
        const args = [...arguments];
        for (let i = 0; i < args.length; i += 1) {
            // eslint-disable-next-line no-console
            console.log(args[i]);
        }
    }
}
