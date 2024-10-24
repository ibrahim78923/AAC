import { END_POINTS } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';
const TAG = 'LOYALTY_REWARDS';
const loyaltyRewardsApi = baseAPI?.injectEndpoints({
  endpoints: (builder) => ({
    getLoyaltyProgramRewardsList: builder?.query({
      query: () => ({
        url: END_POINTS?.GET_REWARDS_LIST,
        method: 'GET',
      }),
      providesTags: [TAG],
    }),
    getLoyaltyProgramRewardsById: builder?.query({
      query: (apiDataParameter: any) => ({
        url: END_POINTS?.GET_REWARDS_LIST,
        method: 'GET',
        params: apiDataParameter?.queryParams,
      }),
      providesTags: [TAG],
    }),
    getLoyaltyProgramRewardsDetailsList: builder?.query({
      query: (apiDataParameter: any) => ({
        url: '',
        method: 'GET',
        params: apiDataParameter?.queryParams,
      }),
      providesTags: [TAG],
    }),
    addLoyaltyProgramRewards: builder?.mutation({
      query: (apiDataParameter: any) => ({
        url: '',
        method: 'POST',
        body: apiDataParameter?.queryParams,
      }),
      invalidatesTags: [TAG],
    }),
    updateLoyaltyProgramRewards: builder?.mutation({
      query: (apiDataParameter: any) => ({
        url: '',
        method: 'PATCH',
        body: apiDataParameter?.queryParams,
      }),
      invalidatesTags: [TAG],
    }),
    deleteLoyaltyProgramRewards: builder?.mutation({
      query: (apiDataParameter: any) => ({
        url: '',
        method: 'DELETE',
        params: apiDataParameter?.queryParams,
      }),
      invalidatesTags: [TAG],
    }),
  }),
});

export const {
  useLazyGetLoyaltyProgramRewardsListQuery,
  useLazyGetLoyaltyProgramRewardsDetailsListQuery,
  useAddLoyaltyProgramRewardsMutation,
  useUpdateLoyaltyProgramRewardsMutation,
  useDeleteLoyaltyProgramRewardsMutation,
  useGetLoyaltyProgramRewardsListQuery,
} = loyaltyRewardsApi;
