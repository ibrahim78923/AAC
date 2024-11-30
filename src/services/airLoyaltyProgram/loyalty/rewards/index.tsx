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
      query: (params) => ({
        url: `${END_POINTS?.GET_REWARDS_LIST_BY_ID}`,
        method: 'GET',
        params,
      }),
      providesTags: [TAG],
    }),
    getLoyaltyProgramRewardsDetailsList: builder?.query({
      query: (apiDataParameter: any) => ({
        url: `${END_POINTS?.REDEEM_REWARDS_DETAILS}/${apiDataParameter?.pathParams?.id}`,
        method: 'GET',
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
        method: 'PATCH',
        body: apiDataParameter?.body,
      }),
      invalidatesTags: [TAG],
    }),
    statusLoyaltyProgramRewards: builder?.mutation({
      query: ({ body, params }) => ({
        url: END_POINTS?.STATUS_REWARDS,
        method: 'PATCH',
        params,
        body,
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
  useStatusLoyaltyProgramRewardsMutation,
} = loyaltyRewardsApi;
