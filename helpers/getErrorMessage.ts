export const getErrorMessage = (error: any): string => {
  if (typeof error === 'string') return error;
  if (error instanceof Error) return error.message;
  if (typeof error?.message === 'string') return error.message;
  if (typeof error?.response?.data?.message === 'string') return error.response.data.message;
  if (typeof error?.response?.data?.error === 'string') return error.response.data.error;
  return 'An unknown error occurred';
};
