import { baseApi } from "../../redux/api/baseApi";
import type { TResponse } from "../../types";
import type { TOfferedCourse } from "./offeredCourse.types";

const offeredCourseApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createOfferedCourse: builder.mutation({
      query: (data) => ({
        url: "/offered-courses/create-offered-course",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["OfferedCourse"],
    }),

    getAllOfferedCourses: builder.query({
      query: (args) => ({
        url: "/offered-courses",
        method: "GET",
        params: args,
      }),
      transformResponse: (response: TResponse<TOfferedCourse[]>) => ({
        data: response.data,
        meta: response.meta,
      }),
      providesTags: ["OfferedCourse"],
    }),
  }),
});

export const { useCreateOfferedCourseMutation, useGetAllOfferedCoursesQuery } =
  offeredCourseApi;
