import { END_POINTS } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';

const TAG = 'AIR_SERVICES_ENQUIRIES';

export const airServicesEnquiriesAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getServicesEnquiries: builder.query({
      query: ({ params }: any) => ({
        url: END_POINTS?.ENQUIRIES,
        method: 'GET',
        params,
      }),
      providesTags: [TAG],
    }),

    deleteServicesEnquiries: builder?.mutation({
      query: (deleteServicesEnquiriesParameter: any) => ({
        url: `${END_POINTS?.ENQUIRIES}/${deleteServicesEnquiriesParameter?.queryParams}`,
        method: 'DELETE',
      }),
      invalidatesTags: [TAG],
    }),

    patchServicesEnquiries: builder?.mutation({
      query: (patchEnquiriesParameter: any) => ({
        url: `${END_POINTS?.ENQUIRIES}/${patchEnquiriesParameter?.queryParams}`,
        method: 'PATCH',
        body: patchEnquiriesParameter?.body,
      }),
      invalidatesTags: [TAG],
    }),

    postServicesEnquiriesRequester: builder?.mutation({
      query: (body: any) => ({
        url: END_POINTS?.ADD_REQUESTER,
        method: 'POST',
        body,
      }),
      invalidatesTags: [TAG],
    }),

    postServicesEnquiriesTicket: builder?.mutation({
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
  useGetServicesEnquiriesQuery,
  useDeleteServicesEnquiriesMutation,
  usePatchServicesEnquiriesMutation,
  usePostServicesEnquiriesRequesterMutation,
  usePostServicesEnquiriesTicketMutation,
} = airServicesEnquiriesAPI;
