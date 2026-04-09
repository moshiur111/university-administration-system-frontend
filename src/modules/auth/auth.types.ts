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
