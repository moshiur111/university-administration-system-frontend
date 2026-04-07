import { baseApi } from "../../redux/api/baseApi";
import type { TResponse } from "../../types";
import type { TAcademicFaculty } from "./academicFaculty.types";

const academicFacultyApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllAcademicFacultie: builder.query({
      query: () => ({
        url: "/academic-faculties",
        method: "GET",
      }),
      transformResponse: (response: TResponse<TAcademicFaculty[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),
  }),
});

export const { useGetAllAcademicFacultieQuery } = academicFacultyApi;
