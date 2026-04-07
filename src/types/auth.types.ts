export type TLoginForm = {
  id: string;
  password: string;
};

export type TAuthUser = {
  id: string;
  role: string;
};

export type TApiResponse<T> = {
  success: boolean;
  message: string;
  data: T;
};

export type TLoginResponse = {
  accessToken: string;
  needsPasswordChange: boolean;
};
