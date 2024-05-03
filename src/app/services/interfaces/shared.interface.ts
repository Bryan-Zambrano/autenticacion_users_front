export interface ApiResponseI<T> {
  statusCode: number;
  data: T | T[];
  message: string;
  showMessage?: boolean;
}
