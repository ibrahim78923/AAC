import { TAGS, baseAPI } from '@/services/base-api';
import { END_POINTS } from '@/routesConstants/endpoints';

export const usersApi: any = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getSuperAdminSearch: builder.query({
      query: ({ params }: any) => ({
        url: END_POINTS?.GLOBAL_SEARCH,
        method: 'GET',
        params: params,
      }),
      providesTags: TAGS,
    }),
  }),
});

export const { useGetSuperAdminSearchQuery } = usersApi;
