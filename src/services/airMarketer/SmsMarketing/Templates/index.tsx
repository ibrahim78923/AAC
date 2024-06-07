import { END_POINTS } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';

export const SmsMarketingTemplateAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getSmsTemplates: builder.query({
      query: (params: any) => ({
        url: END_POINTS?.GET_SMS_TEMPLATES,
        method: 'GET',
        params: params,
      }),
      providesTags: ['TEMPLATE'],
    }),

    postTemplate: builder.mutation({
      query: ({ body }: any) => ({
        url: END_POINTS?.GET_SMS_TEMPLATES,
        method: 'POST',
        body: body,
      }),
      invalidatesTags: ['TEMPLATE'],
    }),

    updateTemplate: builder.mutation({
      query: ({ id, body }: any) => ({
        url: `${END_POINTS?.GET_SMS_TEMPLATES}/${id}`,
        method: 'PATCH',
        body: body,
      }),
      invalidatesTags: ['TEMPLATE'],
    }),

    deleteSmsTemplate: builder.mutation({
      query: (id: any) => ({
        url: `${END_POINTS?.GET_SMS_TEMPLATES}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['TEMPLATE'],
    }),
  }),
});

export const {
  useGetSmsTemplatesQuery,
  usePostTemplateMutation,
  useUpdateTemplateMutation,
  useDeleteSmsTemplateMutation,
} = SmsMarketingTemplateAPI;
