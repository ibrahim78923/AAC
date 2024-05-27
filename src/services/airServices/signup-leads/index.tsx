import { END_POINTS } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';

const TAG = 'AIR_SERVICES_SIGN_UP_LEADS';

export const signUpLeadsAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getSignUpLeads: builder.query({
      query: ({ params }: any) => ({
        url: END_POINTS?.SIGN_UP_LEADS,
        method: 'GET',
        params,
      }),
      providesTags: [TAG],
    }),
  }),
});

export const { useGetSignUpLeadsQuery } = signUpLeadsAPI;
