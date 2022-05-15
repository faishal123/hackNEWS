export const isObjectEmpty = (object: Record<string, unknown>) => {
  return Object.values(object)?.length <= 0;
};
