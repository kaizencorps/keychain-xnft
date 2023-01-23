export function isDev() {
    // return process.env.REACT_APP_ENV === 'dev';
    return false;
}

export function consoleLog() {
    if (isDev()) {
        // eslint-disable-next-line prefer-rest-params
        // @ts-ignore
        const args = [...arguments];
        for (let i = 0; i < args.length; i += 1) {
            // eslint-disable-next-line no-console
            console.log(args[i]);
        }
    }
}
