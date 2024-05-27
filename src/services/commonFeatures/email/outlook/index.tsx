import { SOCIAL_FEATURES_OUTLOOK } from '@/routesConstants/paths';
import { baseAPI } from '@/services/base-api';
const TAG = ['OUTLOOK'];
export const outlookApi = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getAuthURLOutlook: builder.query({
      query: ({ params }: any) => {
        return {
          url: `${SOCIAL_FEATURES_OUTLOOK?.AUTH_URL}`,
          method: 'GET',
          params: params,
        };
      },
      providesTags: TAG,
    }),
  }),
});

export const { useGetAuthURLOutlookQuery } = outlookApi;
