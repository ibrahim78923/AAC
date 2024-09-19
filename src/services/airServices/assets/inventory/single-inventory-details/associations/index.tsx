import { END_POINTS } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';

const TAG = 'TICKETS';

export const associationsAPI = baseAPI?.injectEndpoints({
  endpoints: (builder) => ({
    getAssociationsTickets: builder?.query({
      query: (apiDataParameter: any) => ({
        url: `${END_POINTS?.TICKET}`,
        method: 'GET',
        params: apiDataParameter?.queryParams,
      }),
      providesTags: [TAG],
    }),
    getAssociationList: builder?.query({
      query: ({ params }: any) => ({
        url: `${END_POINTS?.ASSETS_INVENTORY_Associations}`,
        method: 'GET',
        params,
      }),
      providesTags: [TAG],
    }),
    patchExistingIncident: builder?.mutation({
      query: (body: any) => ({
        url: `${END_POINTS?.INVENTORY_EXISTING_INCIDENT}`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: [TAG],
    }),
    deleteInventoryAssociationList: builder?.mutation({
      query: (params: any) => ({
        url: `${END_POINTS?.DELETE_INVENTORY_ASSOCIATIONS_LIST}`,
        method: 'PATCH',
        params,
      }),
      invalidatesTags: [TAG],
    }),
    getExitingTickets: builder?.query({
      query: (apiDataParameter: any) => ({
        url: `${END_POINTS?.TICKET}`,
        method: 'GET',
        params: apiDataParameter?.queryParams,
      }),
      providesTags: [TAG],
    }),
  }),
});

export const {
  useGetAssociationsTicketsQuery,
  useLazyGetAssociationsTicketsQuery,
  useLazyGetAssociationListQuery,
  usePatchExistingIncidentMutation,
  useDeleteInventoryAssociationListMutation,
  useLazyGetExitingTicketsQuery,
} = associationsAPI;
