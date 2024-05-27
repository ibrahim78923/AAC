import { SOCIAL_FEATURES_EMAIL } from '@/routesConstants/paths';
import { baseAPI } from '@/services/base-api';
const TAG = ['EMAIL'];
export const gmailApi = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getAuthURL: builder.query({
      query: ({ params }: any) => {
        return {
          url: `${SOCIAL_FEATURES_EMAIL?.GET_OTHERS_DRAFTS}`,
          method: 'GET',
          params: params,
        };
      },
      providesTags: TAG,
    }),
  }),
});

export const { useGetAuthURLQuery } = gmailApi;
