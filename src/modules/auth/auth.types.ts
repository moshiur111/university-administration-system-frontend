export type TUser = {
  userId: string;
  role: string;
  iat: number;
  exp: number;
};
export type TAuthState = {
  user: TUser | null;
  token: string | null;
};

export type TLoginForm = {
  userId: string;
  password: string;
};

export type TLoginResponse = {
  accessToken: string;
  needsPasswordChange: boolean;
};

export type TLoginRequest = {
  id: string;
  password: string;
};
