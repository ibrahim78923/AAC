export const transformResponse = (response: any) => {
  if (response) return response?.data;
};
