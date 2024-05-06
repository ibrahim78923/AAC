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
    updateEmailConfig: builder.mutation({
      query: ({ body, id }: any) => {
        return {
          url: `${SOCIAL_FEATURES_EMAIL?.UPDATE_CONFIG}/${id}`,
          method: 'PATCH',
          body: body,
          headers: {
            'ngrok-skip-browser-warning': 'Bearer YOUR_ACCESS_TOKEN_HERE',
          },
        };
      },
      invalidatesTags: TAG,
    }),
    getMailFolders: builder.query({
      query: () => {
        return {
          url: `${SOCIAL_FEATURES_EMAIL?.GET_MAIL_FOLDERS}`,
          method: 'GET',
        };
      },
      providesTags: TAG,
    }),
    getOtherMailDetails: builder.query({
      query: ({ params }: any) => {
        return {
          url: `${SOCIAL_FEATURES_EMAIL?.GET_OTHER_MAIL_CONFIG}`,
          method: 'GET',
          params: params,
        };
      },
      providesTags: TAG,
    }),

    getEmailsByFolderId: builder.query({
      query: ({ params }: any) => {
        return {
          url: `${SOCIAL_FEATURES_EMAIL?.GET_MAILS_BY_FOLDER_ID}`,
          method: 'GET',
          params: params,
        };
      },
      providesTags: TAG,
    }),

    getMessageDetails: builder.query({
      query: ({ params }: any) => {
        return {
          url: `${SOCIAL_FEATURES_EMAIL?.GET_MAIL_DETAILS}`,
          method: 'GET',
          params: params,
        };
      },
      providesTags: TAG,
    }),
  }),
});

export const {
  usePostEmailConfigMutation,
  useUpdateEmailConfigMutation,
  useGetMailFoldersQuery,
  useGetOtherMailDetailsQuery,
  useGetEmailsByFolderIdQuery,
  useGetMessageDetailsQuery,
} = emailApi;
