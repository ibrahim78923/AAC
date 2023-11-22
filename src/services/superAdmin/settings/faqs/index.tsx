import { baseAPI } from '@/services/base-api';
import { SUPER_ADMIN_SETTINGS } from '@/routesConstants/paths';

const TAG = ['SETTINGS_FAQS'];
export const settingsFaqsAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getFaqs: builder.query({
      query: (params) => ({
        url: SUPER_ADMIN_SETTINGS.FAQS,
        method: 'GET',
        params: params,
      }),
      providesTags: TAG,
    }),

    getFaqsById: builder.query({
      query: (id: any) => ({
        url: `${SUPER_ADMIN_SETTINGS.FAQS}/${id}`,
        method: 'GET',
      }),
      providesTags: TAG,
    }),

    postFaqs: builder.mutation({
      query: ({ body }: any) => ({
        url: SUPER_ADMIN_SETTINGS.FAQS,
        method: 'POST',
        body: body,
      }),
      invalidatesTags: TAG,
    }),

    updateFaqs: builder.mutation({
      query: ({ id, body }: any) => ({
        url: `${SUPER_ADMIN_SETTINGS.FAQS}/${id}`,
        method: 'PATCH',
        body: body,
      }),
      invalidatesTags: TAG,
    }),

    deleteFaqs: builder.mutation({
      query: (id: any) => ({
        url: `${SUPER_ADMIN_SETTINGS.FAQS}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: TAG,
    }),
  }),
});

export const {
  useGetFaqsQuery,
  useGetFaqsByIdQuery,
  useUpdateFaqsMutation,
  usePostFaqsMutation,
  useDeleteFaqsMutation,
} = settingsFaqsAPI;
