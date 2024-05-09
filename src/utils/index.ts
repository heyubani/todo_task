export const successResponse = (
  statusCode: number,
  message: string,
  data = {},
) => {
  return {
    success: true,
    statusCode,
    message,
    data,
  };
};
