
export function createErrorResponse(message: string) {
    return {
        success: false,
        message,
    };
}

export function createSuccessResponse(data: never) {
    const dump = {
        success: true,
    };
    if (data) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        dump.data = data;
    }
    return dump;
}

