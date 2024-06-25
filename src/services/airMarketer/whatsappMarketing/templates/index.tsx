import { END_POINTS } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';

export const SmsMarketingTemplateAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getWhatsappTemplates: builder.query({
      query: (params: any) => ({
        url: END_POINTS?.WHATSAPP_TEMPLATE,
        method: 'GET',
        params: params,
      }),
      providesTags: ['TEMPLATE'],
    }),

    postWhatsappTemplate: builder.mutation({
      query: ({ body }: any) => ({
        url: END_POINTS?.WHATSAPP_TEMPLATE,
        method: 'POST',
        body: body,
      }),
      invalidatesTags: ['TEMPLATE'],
    }),

    updateWhatsappTemplate: builder.mutation({
      query: ({ id, body }: any) => ({
        url: `${END_POINTS?.WHATSAPP_TEMPLATE}/${id}`,
        method: 'PATCH',
        body: body,
      }),
      invalidatesTags: ['TEMPLATE'],
    }),

    deleteWhatsappTemplate: builder.mutation({
      query: (id: any) => ({
        url: `${END_POINTS?.WHATSAPP_TEMPLATE}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['TEMPLATE'],
    }),
  }),
});

export const {
  useGetWhatsappTemplatesQuery,
  usePostWhatsappTemplateMutation,
  useUpdateWhatsappTemplateMutation,
  useDeleteWhatsappTemplateMutation,
} = SmsMarketingTemplateAPI;
