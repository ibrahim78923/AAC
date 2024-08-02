import { EMAILS_MARKETING } from '@/routesConstants/endpoints';
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
  }),
});

export const { useGetEmailMarketingListQuery } = emailTemplatesApi;
