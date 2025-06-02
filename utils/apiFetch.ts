export const apiFetch = async (url: string, options: object = {}) => {
    const auth: any = useCookie('access_token');
    const accessToken = auth.value !== undefined
        ? (auth.value !== undefined ? auth.value : null)
        : null;
    const defaultOptions = {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    }
    const mergedOptions = { ...defaultOptions, ...options };
    return await $fetch(url, mergedOptions);
}