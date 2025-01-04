export const extractParamUrl = (url: string, param: string): string => {
  try {
    const parsedUrl = new URL(url);
    const findParam = parsedUrl.searchParams.get(param);
    return findParam || '';
  } catch (error) {
    console.error('URL inválida:', error);
    return '';
  }
};
