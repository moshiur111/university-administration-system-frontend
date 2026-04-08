import { baseApi } from "../../redux/api/baseApi";
import type { TQueryParam, TResponse } from "../../types";
import type {
  TOfferedCourse,
  TStudentOfferedCourse,
} from "./offeredCourse.types";

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

    getStudentOfferedCourses: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item: TQueryParam) =>
            params.append(item.name, item.value as string),
          );
        }

        return {
          url: "/offered-courses/student-offered-courses",
          method: "GET",
          params: params,
        };
      },
      transformResponse: (response: TResponse<TStudentOfferedCourse[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
      providesTags: ["OfferedCourse"],
    }),
  }),
});

export const {
  useCreateOfferedCourseMutation,
  useGetAllOfferedCoursesQuery,
  useGetStudentOfferedCoursesQuery,
} = offeredCourseApi;
