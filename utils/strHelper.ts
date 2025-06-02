export const truncateStr = (str: string) => str.length > 15 ? str.slice(0, 15) + '...' : str;

export const sanitizeStr = (str: string) => str.replace(/_/g, ' ');