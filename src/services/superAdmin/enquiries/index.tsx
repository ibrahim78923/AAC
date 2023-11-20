import { baseAPI } from '@/services/base-api';

const TAG = ['ENQUIRIES'];
export const enquiriesApi = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getEnquiries: builder.query({
      query: ({ ...params }) => ({
        url: '/enquiries',
        method: 'GET',
        params: params,
      }),
      providesTags: TAG,
    }),
    deleteEnquiry: builder.mutation({
      query: ({ ids }) => ({
        url: `/enquiries/${ids}`,
        method: 'DELETE',
      }),
      invalidatesTags: TAG,
    }),
  }),
});

export const { useGetEnquiriesQuery, useDeleteEnquiryMutation } = enquiriesApi;
