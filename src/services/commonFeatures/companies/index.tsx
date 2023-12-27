import { END_POINTS } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';

export const companiesAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getCompaniesDetails: builder.query({
      query: ({ Id }) => ({
        url: `${END_POINTS?.COMPANY}/${Id}`,
        method: 'GET',
      }),
      providesTags: ['COMPANY'],
    }),
    CompanyUpdate: builder.mutation({
      query: ({ body, Id }: any) => ({
        url: `${END_POINTS?.COMPANY}?Id=${Id}`,
        method: 'PATCH',
        body: body,
      }),
      invalidatesTags: ['COMPANY'],
    }),
  }),
});

export const { useGetCompaniesDetailsQuery, useCompanyUpdateMutation } =
  companiesAPI;
