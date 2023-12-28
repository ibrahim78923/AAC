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

    getAllCompanies: builder.query({
      query: (values: any) => ({
        url: `${END_POINTS?.COMPANY}`,
        method: 'GET',
        params: values,
      }),
      providesTags: ['COMPANY'],
    }),

    deleteCompanies: builder.mutation({
      query: ({ id }: any) => ({
        url: `${END_POINTS?.COMPANY}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['COMPANY'],
    }),

    getAllDeletedCompanies: builder.query({
      query: (values: any) => ({
        url: `${END_POINTS?.DELETED_COMPANIES}`,
        method: 'GET',
        params: values,
      }),
      providesTags: ['DEL_COMPANY'],
    }),

    postCompanies: builder.mutation({
      query: ({ body }: any) => {
        return {
          url: END_POINTS?.COMPANY,
          method: 'POST',
          body: body,
        };
      },
      invalidatesTags: ['COMPANY'],
    }),

    CompanyUpdate: builder.mutation({
      query: ({ body, Id }: any) => ({
        url: `${END_POINTS?.COMPANY}?Id=${Id}`,
        method: 'PATCH',
        body: body,
      }),
      invalidatesTags: ['COMPANY'],
    }),

    getCompanyPreview: builder.query({
      query: (values: any) => ({
        url: `${END_POINTS?.COMPANY_PREVIEW}`,
        method: 'GET',
        params: values,
      }),
      providesTags: ['COMPANY'],
    }),
  }),
});

export const {
  useGetCompaniesDetailsQuery,
  useGetAllCompaniesQuery,
  useDeleteCompaniesMutation,
  usePostCompaniesMutation,
  useGetAllDeletedCompaniesQuery,
  useCompanyUpdateMutation,
  useGetCompanyPreviewQuery,
} = companiesAPI;
