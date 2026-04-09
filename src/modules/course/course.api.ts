import { baseApi } from "../../redux/api/baseApi";
import type { TQueryParam, TResponse } from "../../types";
import type { TCourse } from "./course.types";

const courseApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllCourses: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item: TQueryParam) =>
            params.append(item.name, item.value as string),
          );
        }

        return {
          url: "/courses",
          method: "GET",
          params: params,
        };
      },
      transformResponse: (response: TResponse<TCourse[]>) => {
        return {
          meta: response.meta,
          data: response.data,
        };
      },
      providesTags: ["Course"],
    }),

    addCourse: builder.mutation({
      query: (data) => ({
        url: "/courses/create-course",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Course"],
    }),
  }),
});

export const { useGetAllCoursesQuery, useAddCourseMutation } = courseApi;
