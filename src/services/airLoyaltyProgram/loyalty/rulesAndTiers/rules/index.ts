import { END_POINTS } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';

export const rulesAPI = baseAPI?.injectEndpoints({
  endpoints: (builder: any) => ({
    getRulesList: builder?.query({
      query: (apiDataParameter: any) => ({
        url: END_POINTS?.GET_RULES_LIST,
        method: 'GET',
        params: apiDataParameter?.queryParams,
      }),
    }),
    addRules: builder?.mutation({
      query: (apiDataParameter: any) => ({
        url: END_POINTS?.ADD_RULES,
        method: 'POST',
        body: apiDataParameter?.body,
      }),
    }),
    editSingleRules: builder?.mutation({
      query: (apiDataParameter: any) => ({
        url: '',
        method: 'PATCH',
        body: apiDataParameter?.body,
      }),
    }),
    deleteRules: builder?.mutation({
      query: (apiDataParameter: any) => ({
        url: ``,
        method: 'DELETE',
        params: apiDataParameter?.queryParams,
      }),
    }),
    getSingleRulesDetails: builder?.query({
      query: (apiDataParameter: any) => ({
        url: '',
        method: 'GET',
        params: apiDataParameter?.queryParams,
      }),
    }),
    getTiersDropdownForRules: builder?.query({
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
  useAddRulesMutation,
  useGetRulesListQuery,
  useLazyGetRulesListQuery,
  useDeleteRulesMutation,
  useEditSingleRulesMutation,
  useGetSingleRulesDetailsQuery,
  useLazyGetTiersDropdownForRulesQuery,
} = rulesAPI;
