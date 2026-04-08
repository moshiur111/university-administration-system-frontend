import { baseApi } from "../../redux/api/baseApi";
import type { TMeta, TQueryParam, TResponse } from "../../types";
import type {
  TFacultyOfferedCourse,
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

    getFacultyOfferedCourses: builder.query<
      { data: TFacultyOfferedCourse[]; meta: TMeta },
      Record<string, unknown> | void
    >({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          Object.entries(args).forEach(([key, value]) => {
            if (value !== undefined && value !== null) {
              params.append(key, String(value));
            }
          });
        }

        return {
          url: "/offered-courses/faculty-offered-courses",
          method: "GET",
          params,
        };
      },

      transformResponse: (response: TResponse<TFacultyOfferedCourse[]>) => ({
        data: response.data,
        meta: response.meta ?? {
          page: 1,
          limit: 10,
          total: 0,
          totalPage: 0,
        },
      }),

      providesTags: ["OfferedCourse"],
    }),
  }),
});

export const {
  useCreateOfferedCourseMutation,
  useGetAllOfferedCoursesQuery,
  useGetStudentOfferedCoursesQuery,
  useGetFacultyOfferedCoursesQuery,
} = offeredCourseApi;
