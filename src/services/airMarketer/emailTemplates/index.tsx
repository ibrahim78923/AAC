import { EMAIL_TEMPLATES } from '@/routesConstants/paths';
import { baseAPI } from '@/services/base-api';
const TAG = ['EMAIL_TEMPLATES'];
export const emailTemplatesApi = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getEmailTemplates: builder.query({
      query: ({ params }: any) => ({
        url: `${EMAIL_TEMPLATES?.GET_TEMPLATES}`,
        method: 'GET',
        params: params,
      }),
      providesTags: TAG,
    }),

    getEmailTemplatesByID: builder.query({
      query: ({ params }: any) => ({
        url: `${EMAIL_TEMPLATES?.GET_TEMPLATES_BY_ID}`,
        method: 'GET',
        params: params,
      }),
      providesTags: TAG,
    }),

    postEmailMarketingTemplates: builder.mutation({
      query: ({ body }: any) => {
        return {
          url: `${EMAIL_TEMPLATES?.POST_TEMPLATES}`,
          method: 'POST',
          body: body,
        };
      },
      invalidatesTags: TAG,
    }),
    postEmailWithTemplates: builder.mutation({
      query: ({ body }: any) => {
        return {
          url: `${EMAIL_TEMPLATES?.POST_EMAIL_WITH_TEMPLATES}`,
          method: 'POST',
          body: body,
        };
      },
      invalidatesTags: TAG,
    }),
    updateEmailTemplates: builder.mutation({
      query: ({ body, id }: any) => {
        return {
          url: `${EMAIL_TEMPLATES?.UPDATE_TEMPLATES}?id=${id}`,
          method: 'PATCH',
          body: body,
        };
      },
      invalidatesTags: TAG,
    }),
    deleteEmailTemplates: builder.mutation({
      query: ({ id }: any) => {
        return {
          url: `${EMAIL_TEMPLATES?.DELETE_TEMPLATES_BY_ID}/${id}`,
          method: 'DELETE',
        };
      },
      invalidatesTags: TAG,
    }),
  }),
});

export const {
  useGetEmailTemplatesQuery,
  usePostEmailMarketingTemplatesMutation,
  useGetEmailTemplatesByIDQuery,
  useUpdateEmailTemplatesMutation,
  useDeleteEmailTemplatesMutation,
  usePostEmailWithTemplatesMutation,
} = emailTemplatesApi;
