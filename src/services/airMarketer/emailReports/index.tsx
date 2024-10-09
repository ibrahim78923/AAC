import { EMAILS_MARKETING_REPORTS } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';
const TAG = ['EMAIL_REPORTS'];
export const emailTemplatesApi = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getEmailMarketingReports: builder.query({
      query: ({ params }: any) => ({
        url: `${EMAILS_MARKETING_REPORTS?.EMAIL_REPORTS}`,
        method: 'GET',
        params: params,
      }),
      providesTags: TAG,
    }),
  }),
});

export const { useGetEmailMarketingReportsQuery } = emailTemplatesApi;
