import { baseApi } from "../../redux/api/baseApi";
import type { TQueryParam, TResponse } from "../../types";
import type { TStudent } from "./student.types";

const studentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createStudent: builder.mutation({
      query: (data) => ({
        url: "/students/create-student",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Student"],
    }),

    getAllStudents: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }
        return {
          url: "/students",
          method: "GET",
          params: params,
        };
      },
      transformResponse: (response: TResponse<TStudent[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
      providesTags: ["Student"],
    }),

    blockStudent: builder.mutation({
      query: (id: string) => ({
        url: `/students/block-student/${id}`,
        method: "PATCH",
        body: { status: "blocked" },
      }),
      invalidatesTags: ["Student"],
    }),
  }),
});

export const {
  useCreateStudentMutation,
  useGetAllStudentsQuery,
  useBlockStudentMutation,
} = studentApi;
