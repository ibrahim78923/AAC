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
    deleteEmailTemplate: builder.mutation({
      query: ({ ids }: any) => {
        return {
          url: `${EMAILS_MARKETING?.DELETE_EMAIL}?ids=${ids}`,
          method: 'DELETE',
        };
      },
      invalidatesTags: TAG,
    }),
  }),
});

export const {
  useGetEmailMarketingListQuery,
  usePostEmailTemplatesMutation,
  useDeleteEmailTemplateMutation,
  useUpdateEmailTemplatesMutation,
  useGetEmailMarketingByIdQuery,
} = emailTemplatesApi;
