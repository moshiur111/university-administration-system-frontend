export type TLoginForm = {
  userId: string;
  password: string;
};

export type TAuthUser = {
  id: string;
  role: string;
};

export type TLoginResponse = {
  data: {
    user: TAuthUser;
    accessToken: string;
  };
};
