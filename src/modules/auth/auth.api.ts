import { baseApi } from "../../redux/api/baseApi";
import type { TApiResponse } from "../../types";
import type { TLoginRequest, TLoginResponse } from "./auth.types";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<TApiResponse<TLoginResponse>, TLoginRequest>({
      query: (userInfo) => ({
        url: "/auth/login",
        method: "POST",
        body: userInfo,
      }),
    }),

    changePassword: builder.mutation({
      query: (data) => ({
        url: "/auth/change-password",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useLoginMutation, useChangePasswordMutation } = authApi;
