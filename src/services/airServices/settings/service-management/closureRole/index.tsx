import { END_POINTS } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';

const TAG = 'CLOSURE_RULES';

export const closureRulesAPI = baseAPI?.injectEndpoints({
  endpoints: (builder) => ({
    postClosureRule: builder?.mutation({
      query: (postClosureRoleParameter: any) => ({
        url: `${END_POINTS?.POST_CLOSURE_RULES}`,
        method: 'POST',
        body: postClosureRoleParameter?.body,
      }),
      invalidatesTags: [TAG],
    }),
    getClosureRules: builder?.query({
      query: () => ({
        url: `${END_POINTS?.GET_CLOSURE_RULES}`,
        method: 'GET',
      }),
      providesTags: [TAG],
    }),
  }),
});

export const { usePostClosureRuleMutation, useGetClosureRulesQuery } =
  closureRulesAPI;
