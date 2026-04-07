import { baseApi } from "../../redux/api/baseApi";
import type { TResponse } from "../../types";
import { buildQueryParams } from "../../utils/buildQueryParams";
import type { TFaculty } from "./faculty.types";

const facultyApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getEligibleFaculties: builder.query({
      query: (args) => ({
        url: "/faculties/eligible",
        method: "GET",
        params: buildQueryParams(args),
      }),
      transformResponse: (response: TResponse<TFaculty[]>) => {
        return {
          meta: response.meta,
          data: response.data,
        };
      },
      providesTags: ["Faculty"],
    }),
  }),
});

export const { useGetEligibleFacultiesQuery } = facultyApi;
