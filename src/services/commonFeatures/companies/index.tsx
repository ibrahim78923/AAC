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
      query: ({ params }: any) => ({
        url: `${END_POINTS?.COMPANY}`,
        method: 'GET',
        params: params,
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

    getCustomizeColumnsCompanies: builder.query({
      query: (params: any) => ({
        url: `${END_POINTS?.CUSTOMIZE_COLUMNS}`,
        method: 'GET',
        params: params,
      }),
      providesTags: ['COMPANY'],
    }),
    putCustomizedColumnsCompanies: builder.mutation({
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
      query: ({ params }: any) => ({
        url: `${END_POINTS?.TICKETS_ASSOCIATES_GET}`,
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
    postAssociationCompanies: builder.mutation({
      query: ({ body }: any) => {
        return {
          url: END_POINTS?.TICKETS_ASSOCIATES,
          method: 'POST',
          body: body,
        };
      },
      invalidatesTags: ['COMPANY'],
    }),
    postCompaniesAttachments: builder?.mutation({
      query: (postAttachmentParameter: any) => ({
        url: END_POINTS?.POST_ATTACHMENT,
        method: 'POST',
        body: postAttachmentParameter?.body,
      }),
      invalidatesTags: ['COMPANY'],
    }),
    PostCompaniesTicket: builder?.mutation({
      query: (postTicketParameter: any) => ({
        url: `${END_POINTS?.TICKET}`,
        method: 'POST',
        body: postTicketParameter?.body,
      }),
    }),
    getCategoriesDropdownCompaniesTickets: builder?.query({
      query: ({ params }: any) => ({
        url: `${END_POINTS?.DROPDOWN_CATEGORIES}`,
        method: 'GET',
        params,
      }),
      transformResponse: (response: any) => {
        if (response) return response?.data?.servicecategories;
      },
    }),
    getAllUsersAsRequestersDropdownForCompaniesTickets: builder?.query({
      query: ({ params }: any) => ({
        url: `${END_POINTS?.DROPDOWN_USERS}`,
        method: 'GET',
        params,
      }),
      transformResponse: (response: any) => {
        if (response) return response?.data;
      },
    }),
    getAllEmailsCompanies: builder.query({
      query: (params) => ({
        url: `${END_POINTS?.GET_COMPANY_ASSOCIATION_GMAIL}`,
        method: 'GET',
        params,
      }),
      providesTags: ['COMPANY', 'GMAIL'],
    }),
    deleteEmailCompanies: builder.mutation({
      query: ({ id, moduleId, moduleType }: any) => ({
        url: `${END_POINTS?.COMPANY_DELETE_ASSOCIATION}?moduleType=${moduleType}&moduleId=${moduleId}&id=${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['COMPANY'],
    }),
    getCompaniesListAsExport: builder?.query({
      query: (apiDataParameter: any) => ({
        url: `${END_POINTS?.COMPANY}`,
        method: 'GET',
        params: apiDataParameter?.queryParams,
        responseHandler: (response: any) => response?.blob(),
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
  useRestoreCompaniesMutation,
  useMergeCompaniesMutation,
  useChangeCompanyOwnerMutation,
  usePostCompaniesViewMutation,
  useGetCustomizeColumnsCompaniesQuery,
  useGetCompaniesViewsQuery,
  usePutCustomizedColumnsCompaniesMutation,
  useGetCompanyDealsQuery,
  useGetCompanyAssociationsQuery,
  usePostAssociationCompaniesMutation,
  usePostCompaniesAttachmentsMutation,
  usePostCompaniesTicketMutation,
  useLazyGetCategoriesDropdownCompaniesTicketsQuery,
  useLazyGetAllUsersAsRequestersDropdownForCompaniesTicketsQuery,
  useGetAllEmailsCompaniesQuery,
  useDeleteEmailCompaniesMutation,
  useLazyGetCompaniesListAsExportQuery,
} = companiesAPI;
