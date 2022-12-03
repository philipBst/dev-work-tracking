export const getRequest = async <T>(endpoint: string): Promise<T> => {
  const response = await fetch(endpoint);
  return await response.json();
};
