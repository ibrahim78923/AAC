import { EMAILS_MARKETING, END_POINTS } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';
const TAG = ['EMAIL_TEMPLATES'];
export const emailTemplatesApi = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getEmailMarketingList: builder.query({
      query: ({ params }: any) => ({
        url: `${EMAILS_MARKETING?.EMAIL_MARKETING}`,
        method: 'GET',
        params: params,
      }),
      providesTags: TAG,
    }),

    getEmailMarketingListAsExport: builder?.query({
      query: (params: any) => ({
        url: `${EMAILS_MARKETING?.EMAIL_MARKETING}`,
        method: 'GET',
        params: params,
        responseHandler: (response: any) => response?.blob(),
      }),
      providesTags: TAG,
    }),

    getEmailMarketingById: builder.query({
      query: ({ params }: any) => ({
        url: `${EMAILS_MARKETING?.EMAIL_MARKETING_BY_ID}`,
        method: 'GET',
        params: params,
      }),
      providesTags: TAG,
    }),

    postEmailTemplates: builder.mutation({
      query: ({ body }: any) => {
        return {
          url: `${EMAILS_MARKETING?.CREATE_EMAIL}`,
          method: 'POST',
          body: body,
        };
      },
      invalidatesTags: TAG,
    }),
    updateEmailTemplates: builder.mutation({
      query: ({ id, body }: any) => {
        return {
          url: `${EMAILS_MARKETING?.UPDATE_EMAIL}?id=${id}`,
          method: 'PATCH',
          body: body,
        };
      },
      invalidatesTags: TAG,
    }),
    duplicateEmail: builder.mutation({
      query: ({ id }: any) => {
        return {
          url: `${EMAILS_MARKETING?.DUPLICATE_EMAIL}?id=${id}`,
          method: 'PATCH',
        };
      },
      invalidatesTags: TAG,
    }),
    deleteEmailMarketing: builder.mutation({
      query: ({ ids }: any) => {
        return {
          url: `${EMAILS_MARKETING?.DELETE_EMAIL}?ids=${ids}`,
          method: 'DELETE',
        };
      },
      invalidatesTags: TAG,
    }),

    getEmailFolders: builder?.query({
      query: ({ params }: any) => ({
        url: `${EMAILS_MARKETING?.GET_ALL_FOLDERS}`,
        method: 'GET',
        params,
      }),
      transformResponse: (response: any) => {
        if (response) return response?.data?.emailfolders;
      },
    }),

    getUsers: builder?.query({
      query: ({ params }: any) => ({
        url: `${END_POINTS?.PRODUCT_ALL_USERS}`,
        method: 'GET',
        params,
      }),
      transformResponse: (response: any) => {
        if (response) return response?.data;
      },
    }),
    getAllEmailsAsync: builder?.query({
      query: ({ params }: any) => ({
        url: `${EMAILS_MARKETING?.EMAIL_MARKETING}`,
        method: 'GET',
        params,
      }),
      transformResponse: (response: any) => {
        if (response) return response?.data?.emailsmarketings;
      },
    }),
    getAllMarketingUsers: builder?.query({
      query: ({ params }: any) => ({
        url: `${EMAILS_MARKETING?.MARKETING_USERS}`,
        method: 'GET',
        params,
      }),
      transformResponse: (response: any) => {
        if (response) return response?.data?.usercompanyaccounts;
      },
    }),
    getAllMarketingTeams: builder?.query({
      query: ({ params }: any) => ({
        url: `${EMAILS_MARKETING?.MARKETING_TEAMS}`,
        method: 'GET',
        params,
      }),
      transformResponse: (response: any) => {
        if (response) return response?.data?.userTeams;
      },
    }),
  }),
});

export const {
  useGetEmailMarketingListQuery,
  usePostEmailTemplatesMutation,
  useUpdateEmailTemplatesMutation,
  useGetEmailMarketingByIdQuery,
  useLazyGetEmailFoldersQuery,
  useDuplicateEmailMutation,
  useDeleteEmailMarketingMutation,
  useLazyGetUsersQuery,
  useLazyGetAllEmailsAsyncQuery,
  useLazyGetAllMarketingUsersQuery,
  useLazyGetAllMarketingTeamsQuery,
  useLazyGetEmailMarketingListAsExportQuery,
} = emailTemplatesApi;
