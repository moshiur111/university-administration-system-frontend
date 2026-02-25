import { jwtDecode } from "jwt-decode";

type TJwtPayload = {
  userId: string;
  role: string;
  iat: number;
  exp: number;
};

export const verifyToken = (token: string) => {
  return jwtDecode<TJwtPayload>(token);
};
