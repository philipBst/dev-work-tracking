export const getRequest = async (endpoint: string) => {
  const response = await fetch(endpoint);
  return response;
};
