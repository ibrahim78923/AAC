import { END_POINTS } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';

const TAG = 'AIR_SERVICES_SIGN_UP_LEADS';

export const serviceSignUpLeadsAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getServiceSignUpLeads: builder.query({
      query: ({ params }: any) => ({
        url: END_POINTS?.SIGN_UP_LEADS,
        method: 'GET',
        params,
      }),
      providesTags: [TAG],
    }),
  }),
});

export const { useGetServiceSignUpLeadsQuery } = serviceSignUpLeadsAPI;
