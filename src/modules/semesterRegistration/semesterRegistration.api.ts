import { baseApi } from "../../redux/api/baseApi";
import type { TQueryParam, TResponse } from "../../types";
import type { TSemesterRegistration } from "./semesterRegistration.types";

const semesterRegistrationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createSemesterRegistration: builder.mutation({
      query: (data) => ({
        url: "/semester-registrations/create-semester-registration",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["SemesterRegistration"],
    }),

    getAllRegisteredSemesters: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item: TQueryParam) =>
            params.append(item.name, item.value as string),
          );
        }

        return {
          url: "/semester-registrations",
          method: "GET",
          params: params,
        };
      },
      transformResponse: (response: TResponse<TSemesterRegistration[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
      providesTags: ["SemesterRegistration"],
    }),

    updateSemesterRegistration: builder.mutation({
      query: (args) => ({
        url: `/semester-registrations/${args.id}`,
        method: "PATCH",
        body: args.data,
      }),
      invalidatesTags: ["SemesterRegistration"],
    }),
  }),
});

export const {
  useCreateSemesterRegistrationMutation,
  useGetAllRegisteredSemestersQuery,
  useUpdateSemesterRegistrationMutation,
} = semesterRegistrationApi;
