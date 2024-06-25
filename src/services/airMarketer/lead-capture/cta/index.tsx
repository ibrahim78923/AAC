import { END_POINTS } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';

const URL = END_POINTS?.LEAD_CAPTURE_CTA;
const TAG = 'LEAD_CAPTURE_CTA';

export const leadCaptureCtaAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getLeadCaptureCTA: builder.query({
      query: ({ params }) => ({
        url: URL,
        method: 'GET',
        params: params,
      }),
      providesTags: [TAG],
    }),

    getLeadCaptureCTAById: builder.query({
      query: ({ id }: any) => ({
        url: `${URL}/${id}`,
        method: 'GET',
      }),
      providesTags: [TAG],
    }),

    postLeadCaptureCTA: builder.mutation({
      query: ({ body }: any) => ({
        url: URL,
        method: 'POST',
        body: body,
      }),
      invalidatesTags: [TAG],
    }),

    updateLeadCaptureCTA: builder.mutation({
      query: ({ id, body }: any) => ({
        url: `${URL}/${id}`,
        method: 'PATCH',
        body: body,
      }),
      invalidatesTags: [TAG],
    }),

    deleteLeadCaptureCTA: builder.mutation({
      query: (id: any) => ({
        url: `${END_POINTS?.DELETE_LEAD_CAPTURE_CTA}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [TAG],
    }),
  }),
});

export const {
  useGetLeadCaptureCTAQuery,
  useGetLeadCaptureCTAByIdQuery,
  usePostLeadCaptureCTAMutation,
  useUpdateLeadCaptureCTAMutation,
  useDeleteLeadCaptureCTAMutation,
} = leadCaptureCtaAPI;
