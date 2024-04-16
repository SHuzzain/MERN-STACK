export const errorHandler = (statusCode: number, message: any) => {
  const error = {
    message: message,
    statusCode: statusCode,
  };

  return error;
};
