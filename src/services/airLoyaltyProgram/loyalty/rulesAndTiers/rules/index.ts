import { END_POINTS } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';

export const loyaltyProgramLoyaltyRulesAPI = baseAPI?.injectEndpoints({
  endpoints: (builder: any) => ({
    getLoyaltyProgramLoyaltyRulesList: builder?.query({
      query: (apiDataParameter: any) => ({
        url: END_POINTS?.GET_RULES_LIST,
        method: 'GET',
        params: apiDataParameter?.queryParams,
      }),
    }),
    getLoyaltyProgramLoyaltySingleRuleDetails: builder?.query({
      query: (apiDataParameter: any) => ({
        url: '',
        method: 'GET',
        params: apiDataParameter?.queryParams,
      }),
    }),
    addLoyaltyProgramLoyaltySingleRule: builder?.mutation({
      query: (apiDataParameter: any) => ({
        url: END_POINTS?.ADD_RULES,
        method: 'POST',
        body: apiDataParameter?.body,
      }),
    }),
    updateLoyaltyProgramLoyaltySingleRule: builder?.mutation({
      query: (apiDataParameter: any) => ({
        url: '',
        method: 'PATCH',
        body: apiDataParameter?.body,
      }),
    }),
    deleteLoyaltyProgramLoyaltySingleRule: builder?.mutation({
      query: (apiDataParameter: any) => ({
        url: ``,
        method: 'DELETE',
        params: apiDataParameter?.queryParams,
      }),
    }),
    changeLoyaltyProgramLoyaltySingleRuleStatus: builder?.mutation({
      query: (apiDataParameter: any) => ({
        url: `${END_POINTS?.CHANGE_RULES_STATUS}/${apiDataParameter?.queryParams?.id}`,
        method: 'PUT',
        body: apiDataParameter?.body,
      }),
    }),
    getLoyaltyProgramLoyaltyTiersListAsDropdownForLoyaltyRules: builder?.query({
      query: ({ params }: any) => ({
        url: END_POINTS?.GET_TIERS_LIST,
        method: 'GET',
        params,
      }),
      transformResponse: (response: any) => {
        if (response) return response?.data?.tiers ?? [];
      },
    }),
  }),
});

export const {
  useLazyGetLoyaltyProgramLoyaltyRulesListQuery,
  useGetLoyaltyProgramLoyaltySingleRuleDetailsQuery,
  useChangeLoyaltyProgramLoyaltySingleRuleStatusMutation,
  useAddLoyaltyProgramLoyaltySingleRuleMutation,
  useUpdateLoyaltyProgramLoyaltySingleRuleMutation,
  useDeleteLoyaltyProgramLoyaltySingleRuleMutation,
  useLazyGetLoyaltyProgramLoyaltyTiersListAsDropdownForLoyaltyRulesQuery,
} = loyaltyProgramLoyaltyRulesAPI;
