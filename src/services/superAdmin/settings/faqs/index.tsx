import { baseAPI } from '@/services/base-api';
import { END_POINTS, SUPER_ADMIN_SETTINGS } from '@/routesConstants/endpoints';

const TAG = ['SETTINGS_FAQS'];
export const settingsFaqsAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getFaqs: builder.query({
      query: ({ params }) => ({
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

    getUserDropdownList: builder?.query({
      query: ({ params }) => ({
        url: `${END_POINTS?.USERS_LIST_ADMIN}`,
        method: 'GET',
        params: params,
      }),
      transformResponse: (response: any) => {
        return response?.data?.users;
      },
      providesTags: ['USERS'],
    }),
  }),
});

export const {
  useGetFaqsQuery,
  useGetFaqsByIdQuery,
  useUpdateFaqsMutation,
  usePostFaqsMutation,
  useDeleteFaqsMutation,
  useLazyGetUserDropdownListQuery,
} = settingsFaqsAPI;
