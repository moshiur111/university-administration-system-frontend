import { baseApi } from "../../redux/api/baseApi";
import type { TApiResponse, TLoginForm, TLoginResponse } from "../../types";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<TApiResponse<TLoginResponse>, TLoginForm>({
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
