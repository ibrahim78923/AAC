import { SOCIAL_FEATURES_EMAIL } from '@/routesConstants/paths';
import { baseAPI } from '@/services/base-api';
const TAG = ['EMAIL'];
export const emailApi = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    postEmailConfig: builder.mutation({
      query: ({ body }: any) => {
        return {
          url: `${SOCIAL_FEATURES_EMAIL?.CREATE_CONFIG}`,
          method: 'POST',
          body: body,
          headers: {
            'ngrok-skip-browser-warning': 'Bearer YOUR_ACCESS_TOKEN_HERE',
          },
        };
      },
      invalidatesTags: TAG,
    }),
  }),
});

export const { usePostEmailConfigMutation } = emailApi;
