import { END_POINTS } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';

const TAG = ['ENQUIRIES'];
export const enquiriesApi = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getEnquiries: builder.query({
      query: ({ params }) => ({
        url: END_POINTS?.ENQUIRIES,
        method: 'GET',
        params: params,
      }),
      providesTags: TAG,
    }),

    deleteEnquiry: builder.mutation({
      query: (id) => ({
        url: `${END_POINTS?.ENQUIRIES}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: TAG,
    }),

    patchEnquiries: builder?.mutation({
      query: (patchEnquiriesParameter: any) => ({
        url: `${END_POINTS?.ENQUIRIES}/${patchEnquiriesParameter?.queryParams}`,
        method: 'PATCH',
        body: patchEnquiriesParameter?.body,
      }),
      invalidatesTags: TAG,
    }),
  }),
});

export const {
  useGetEnquiriesQuery,
  useDeleteEnquiryMutation,
  usePatchEnquiriesMutation,
} = enquiriesApi;
