import { AIR_SALES_DEALS_EMAILS } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';
const TAG = ['TASKS'];

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
  }),
});

export const { useGetAssociatedEmailsQuery } = dealsEmailsApi;
