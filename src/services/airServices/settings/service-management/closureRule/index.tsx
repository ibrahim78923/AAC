import { END_POINTS } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';

const TAG = 'CLOSURE_RULES';

export const closureRulesAPI = baseAPI?.injectEndpoints({
  endpoints: (builder) => ({
    postAirServicesSettingsServiceClosureRule: builder?.mutation({
      query: (postClosureRoleParameter: any) => ({
        url: END_POINTS?.POST_CLOSURE_RULES,
        method: 'POST',
        body: postClosureRoleParameter,
      }),
      invalidatesTags: [TAG],
    }),

    getAirServicesSettingsServiceClosureRules: builder?.query({
      query: () => ({
        url: END_POINTS?.GET_CLOSURE_RULES,
        method: 'GET',
      }),
      providesTags: [TAG],
    }),
  }),
});

export const {
  usePostAirServicesSettingsServiceClosureRuleMutation,
  useGetAirServicesSettingsServiceClosureRulesQuery,
} = closureRulesAPI;
