export interface ErrorProps {
  statusMessage: object | string | undefined;
  statusCode: number | undefined;
  [x: string]: string | object | number | undefined;
}
