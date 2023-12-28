import { END_POINTS } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';

const TAG = 'CLOSURE_ROLE';

export const closureRoleAPI: any = baseAPI?.injectEndpoints({
  endpoints: (builder) => ({
    postClosureRole: builder?.mutation({
      query: (postClosureRoleParameter: any) => ({
        url: `${END_POINTS?.POST_CLOSURE_ROLE}`,
        method: 'POST',
        body: postClosureRoleParameter?.body,
      }),
      invalidatesTags: [TAG],
    }),
  }),
});

export const { usePostClosureRoleMutation } = closureRoleAPI;
