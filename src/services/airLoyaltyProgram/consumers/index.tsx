import { END_POINTS } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';

const TAG = 'AIR_LOYALTY_PROGRAM_CONSUMERS';

export const airLoyaltyProgramConsumersAPI = baseAPI?.injectEndpoints({
  endpoints: (builder) => ({
    getLoyaltyProgramConsumersList: builder?.query({
      query: (params) => ({
        url: END_POINTS?.AIR_LOYALTY_PROGRAM_CONSUMERS_LIST,
        method: 'GET',
        params,
      }),

      providesTags: [TAG],
    }),

    putLoyaltyProgramConsumersStatus: builder?.mutation({
      query: (body: any) => ({
        url: END_POINTS?.AIR_LOYALTY_PROGRAM_CONSUMERS_UPDATE,
        method: 'PUT',
        body,
      }),
      invalidatesTags: [TAG],
    }),

    getConsumerDetailsById: builder?.query({
      query: (params) => ({
        url: `${END_POINTS?.AIR_LOYALTY_PROGRAM_CONSUMERS_GET_BY_ID}/${params}`,
        method: 'GET',
      }),
      providesTags: [TAG],
    }),
  }),
});

export const {
  useGetLoyaltyProgramConsumersListQuery,
  usePutLoyaltyProgramConsumersStatusMutation,
  useGetConsumerDetailsByIdQuery,
} = airLoyaltyProgramConsumersAPI;
