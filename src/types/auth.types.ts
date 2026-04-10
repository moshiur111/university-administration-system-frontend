export type TAuthUser = {
  id: string;
  role: string;
};

export type TApiResponse<T> = {
  success: boolean;
  message: string;
  data: T;
};
