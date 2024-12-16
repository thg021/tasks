export const snakeCaseToTitleCase = (str: string) => {
  return str
    .toLowerCase()
    .replace(/_/g, ' ')
    .replace(/\b\w/g, (match) => match.toUpperCase());
};
