export const errorHandler = (statusCode: number, message: any) => {
  const error = {
    statusMessage: message,
    statusCode: statusCode,
  };

  return error;
};
