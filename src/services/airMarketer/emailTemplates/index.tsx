import { EMAIL_TEMPLATES } from '@/routesConstants/paths';
import { baseAPI } from '@/services/base-api';
const TAG = ['EMAIL_TEMPLATES'];
export const emailTemplatesApi = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getEmailTemplates: builder.query({
      query: ({ params }: any) => ({
        url: `${EMAIL_TEMPLATES?.GET_TEMPLATES}`,
        method: 'GET',
        params: params,
      }),
      providesTags: TAG,
    }),

    postEmailTemplates: builder.mutation({
      query: ({ body }: any) => {
        return {
          url: `${EMAIL_TEMPLATES?.POST_TEMPLATES}`,
          method: 'POST',
          body: body,
        };
      },
      invalidatesTags: TAG,
    }),
  }),
});

export const { useGetEmailTemplatesQuery, usePostEmailTemplatesMutation } =
  emailTemplatesApi;
