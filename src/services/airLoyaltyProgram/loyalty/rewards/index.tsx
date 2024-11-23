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
      query: (id: any) => ({
        url: `${END_POINTS?.GET_REWARDS_LIST_BY_ID}/${id}`,
        method: 'GET',
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
        url: `${END_POINTS?.CREATE_PHYSICAL_REWARD}`,
        method: 'POST',
        body: apiDataParameter?.body,
      }),
      invalidatesTags: [TAG],
    }),
    updateLoyaltyProgramRewards: builder?.mutation({
      query: (apiDataParameter: any) => ({
        url: END_POINTS?.UPDATE_REWARDS,
        method: 'PUT',
        body: apiDataParameter?.body,
      }),
      invalidatesTags: [TAG],
    }),
    deleteLoyaltyProgramRewards: builder?.mutation({
      query: (apiDataParameter: any) => ({
        url: END_POINTS?.DELETE_REWARDS,
        method: 'DELETE',
        params: apiDataParameter?.queryParams,
      }),
      invalidatesTags: [TAG],
    }),
    getLoyaltyProgramLoyaltyTiersListDropdown: builder?.query({
      query: (apiDataParameter: any) => ({
        url: END_POINTS?.GET_TIERS_LIST,
        method: 'GET',
        params: apiDataParameter?.queryParams,
      }),
      transformResponse: (response: any) => {
        if (response) return response?.data?.mergedResults;
      },
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
  useLazyGetLoyaltyProgramLoyaltyTiersListDropdownQuery,
  useGetLoyaltyProgramRewardsByIdQuery,
} = loyaltyRewardsApi;
