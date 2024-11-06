import { AIR_SALES_DEALS_EMAILS } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';
const TAG = ['ASSOCIATION_EMAILS'];

export const dealsEmailsApi = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getAssociatedEmails: builder.query({
      query: ({ params }: any) => ({
        url: `${AIR_SALES_DEALS_EMAILS?.GET_ASSOCIATED_EMAILS}`,
        method: 'GET',
        params: params,
      }),
      providesTags: TAG,
    }),
    deleteAssociationEmail: builder.mutation({
      query: ({ params }: any) => ({
        url: `${AIR_SALES_DEALS_EMAILS?.DELETE_ASSOCIATED_EMAILS}`,
        method: 'DELETE',
        params: params,
      }),
      invalidatesTags: ['ASSOCIATION_EMAILS'],
    }),
  }),
});

export const {
  useGetAssociatedEmailsQuery,
  useDeleteAssociationEmailMutation,
} = dealsEmailsApi;
