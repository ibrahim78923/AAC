import { END_POINTS } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';

const TAG = 'AIR_LOYALTY_PROGRAM_CONSUMERS';

export const airLoyaltyProgramConsumersAPI = baseAPI?.injectEndpoints({
  endpoints: (builder) => ({
    getLoyaltyProgramConsumersList: builder?.query({
      query: (params) => ({
        url: `${END_POINTS?.AIR_LOYALTY_PROGRAM_CONSUMERS_LIST}/${params?.path}`,
        method: 'GET',
        params: params?.queryParams,
      }),

      providesTags: [TAG],
    }),

    patchLoyaltyProgramConsumersStatus: builder?.mutation({
      query: (patchLoyaltyProgramConsumersStatusParameter: any) => ({
        url: `${END_POINTS?.AIR_LOYALTY_PROGRAM_CONSUMERS_LIST}/${patchLoyaltyProgramConsumersStatusParameter?.queryParams}`,
        method: 'PATCH',
        body: patchLoyaltyProgramConsumersStatusParameter?.body,
      }),
      invalidatesTags: [TAG],
    }),
  }),
});

export const {
  useGetLoyaltyProgramConsumersListQuery,
  usePatchLoyaltyProgramConsumersStatusMutation,
} = airLoyaltyProgramConsumersAPI;
