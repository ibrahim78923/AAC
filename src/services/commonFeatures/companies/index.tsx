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
      query: ({ ids }: any) => ({
        url: `${END_POINTS?.COMPANY}/${ids}`,
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
      providesTags: ['COMPANY'],
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
      query: ({ body, id }: any) => ({
        url: `${END_POINTS?.COMPANY}/${id}`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['COMPANY'],
    }),

    getCompanyPreview: builder.query({
      query: ({ id }: any) => ({
        url: `${END_POINTS?.COMPANY_PREVIEW}/${id}`,
        method: 'GET',
      }),
      providesTags: ['COMPANY'],
    }),

    restoreCompanies: builder.mutation({
      query: ({ id, body }: any) => ({
        url: `${END_POINTS?.RESTORE_COMPANIES}/${id}`,
        method: 'PATCH',
        body: body,
      }),
      invalidatesTags: ['COMPANY'],
    }),

    mergeCompanies: builder.mutation({
      query: ({ body }: any) => ({
        url: `${END_POINTS?.MERGE_COMPANIES}`,
        method: 'POST',
        body: body,
      }),
      invalidatesTags: ['COMPANY'],
    }),

    changeCompanyOwner: builder.mutation({
      query: ({ body }: any) => ({
        url: `${END_POINTS?.REASSIGN_COMPANY_OWNER}`,
        method: 'PUT',
        body: body,
      }),
      invalidatesTags: ['COMPANY'],
    }),

    postCompaniesView: builder.mutation({
      query: ({ body }: any) => {
        return {
          url: END_POINTS?.COMPANY_VIEWS,
          method: 'POST',
          body,
        };
      },
      invalidatesTags: ['COMPANY'],
    }),

    getCompaniesViews: builder.query({
      query: () => ({
        url: `${END_POINTS?.COMPANY_VIEWS}`,
        method: 'GET',
      }),
      providesTags: ['COMPANY'],
    }),

    getCustomizeColumns: builder.query({
      query: (params: any) => ({
        url: `${END_POINTS?.CUSTOMIZE_COLUMNS}`,
        method: 'GET',
        params: params,
      }),
      providesTags: ['COMPANY'],
    }),
    putCustomizedColumns: builder.mutation({
      query: ({ body }: any) => ({
        url: `${END_POINTS?.CUSTOMIZE_COLUMNS}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['COMPANY', 'CUSTOMIZE'],
    }),
    getCompanyDeals: builder.query({
      query: ({ id }: any) => ({
        url: `${END_POINTS?.COMPANY_DEALS}/${id}`,
        method: 'GET',
        // params: params,
      }),
      providesTags: ['COMPANY'],
    }),
    getCompanyAssociations: builder.query({
      query: ({ id, params }: any) => ({
        url: `${END_POINTS?.GET_COMPANY_ASSOICATION}/${id}`,
        method: 'GET',
        params: params,
      }),
      providesTags: [
        'COMPANY',
        'CONTACTS',
        'ATTACHMENT',
        'DEALS',
        'DEALS_ASSOCIATION',
      ],
    }),
    // import companies end points
    getSignedUrlForImport: builder?.query({
      query: (param: any) => ({
        url: `${END_POINTS?.IMPORT_FILE_GET_SIGNED_URL}`,
        method: 'GET',
        params: param,
      }),
      providesTags: ['COMPANY'],
    }),

    uploadFileTos3UsingSignedUrl: builder?.mutation({
      query: ({ s3Url, body }: any) => {
        // console.log('url', url)
        // console.log('body', body)
        return {
          url: s3Url,
          method: 'PUT',
          body: body,
        };
      },
    }),
    //working on it commented for future use
    // uploadFileTos3UsingSignedUrl: builder?.mutation({
    //   query: (apiDataParameter: any) => ({
    //     url: apiDataParameter?.url,
    //     method: 'PUT',
    //     body: apiDataParameter?.body?.file,
    //   }),
    // }),
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
  useRestoreCompaniesMutation,
  useMergeCompaniesMutation,
  useChangeCompanyOwnerMutation,
  usePostCompaniesViewMutation,
  useGetCustomizeColumnsQuery,
  useGetCompaniesViewsQuery,
  usePutCustomizedColumnsMutation,
  useGetCompanyDealsQuery,
  useGetCompanyAssociationsQuery,
  useGetSignedUrlForImportQuery,
  useUploadFileTos3UsingSignedUrlMutation,
} = companiesAPI;
