export type TMeta = {
  limit: number;
  page: number;
  total: number;
  totalPage: number;
};

export type TResponse<T> = {
  success: boolean;
  message: string;
  meta?: TMeta;
  data: T;
};

export type TQueryParam = {
  name: string;
  value: boolean | React.Key;
};
