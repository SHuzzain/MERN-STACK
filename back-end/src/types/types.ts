export interface ErrorProps {
  message: object | string | undefined;
  statusCode: number | undefined;
  [x: string]: string | object | number | undefined;
}
