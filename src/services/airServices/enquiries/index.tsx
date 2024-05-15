import { END_POINTS } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';

const TAG = 'AIR_SERVICES_ENQUIRIES';

export const enquiriesAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getEnquiries: builder.query({
      query: ({ params }: any) => ({
        url: END_POINTS?.ENQUIRIES,
        method: 'GET',
        params,
      }),
      providesTags: [TAG],
    }),

    deleteEnquiries: builder?.mutation({
      query: (deleteEnquiriesParameter: any) => ({
        url: `${END_POINTS?.ENQUIRIES}/${deleteEnquiriesParameter?.queryParams}`,
        method: 'DELETE',
      }),
      invalidatesTags: [TAG],
    }),

    patchEnquiries: builder?.mutation({
      query: (patchEnquiriesParameter: any) => ({
        url: `${END_POINTS?.ENQUIRIES}/${patchEnquiriesParameter?.queryParams}`,
        method: 'PATCH',
        body: patchEnquiriesParameter?.body,
      }),
      invalidatesTags: [TAG],
    }),

    postRequester: builder?.mutation({
      query: (body: any) => ({
        url: END_POINTS?.ADD_REQUESTER,
        method: 'POST',
        body,
      }),
      invalidatesTags: [TAG],
    }),

    postTicket: builder?.mutation({
      query: (body: any) => ({
        url: END_POINTS?.TICKET,
        method: 'POST',
        body,
      }),
      invalidatesTags: [TAG],
    }),
  }),
});

export const {
  useGetEnquiriesQuery,
  useDeleteEnquiriesMutation,
  usePatchEnquiriesMutation,
  usePostRequesterMutation,
  usePostTicketMutation,
} = enquiriesAPI;
