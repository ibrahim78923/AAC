import { SOCIAL_FEATURES_EMAIL } from '@/routesConstants/paths';
import { baseAPI } from '@/services/base-api';
const TAG = ['EMAIL'];
const TAG_UPDATE_EMAIL = ['TAG_UPDATE_EMAIL'];
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

    postSendOtherEmail: builder.mutation({
      query: ({ body }: any) => {
        return {
          url: `${SOCIAL_FEATURES_EMAIL?.SEND_EMAIL_OTHER}`,
          method: 'POST',
          body: body,
          headers: {
            'ngrok-skip-browser-warning': 'Bearer YOUR_ACCESS_TOKEN_HERE',
          },
        };
      },
      invalidatesTags: TAG,
    }),
    postScheduleOtherEmail: builder.mutation({
      query: ({ body }: any) => {
        return {
          url: `${SOCIAL_FEATURES_EMAIL?.SEND_SCHEDULE_EMAIL_OTHER}`,
          method: 'POST',
          body: body,
          headers: {
            'ngrok-skip-browser-warning': 'Bearer YOUR_ACCESS_TOKEN_HERE',
          },
        };
      },
      invalidatesTags: TAG,
    }),

    postDraftOtherEmail: builder.mutation({
      query: ({ body }: any) => {
        return {
          url: `${SOCIAL_FEATURES_EMAIL?.DRAFT_EMAIL_OTHER}`,
          method: 'POST',
          body: body,
          headers: {
            'ngrok-skip-browser-warning': 'Bearer YOUR_ACCESS_TOKEN_HERE',
          },
        };
      },
      invalidatesTags: TAG,
    }),
    postReplyOtherEmail: builder.mutation({
      query: ({ body }: any) => {
        return {
          url: `${SOCIAL_FEATURES_EMAIL?.REPLY_EMAIL_OTHER}`,
          method: 'POST',
          body: body,
          headers: {
            'ngrok-skip-browser-warning': 'Bearer YOUR_ACCESS_TOKEN_HERE',
          },
        };
      },
      invalidatesTags: TAG,
    }),
    postForwardOtherEmail: builder.mutation({
      query: ({ body }: any) => {
        return {
          url: `${SOCIAL_FEATURES_EMAIL?.FORWARD_EMAIL_OTHER}`,
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

    getDrafts: builder.query({
      query: ({ params }: any) => {
        return {
          url: `${SOCIAL_FEATURES_EMAIL?.GET_OTHERS_DRAFTS}`,
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

    moveFolderOtherEmail: builder.mutation({
      query: ({ body }: any) => {
        return {
          url: `${SOCIAL_FEATURES_EMAIL?.MOVE_FOLDER_EMAIL_OTHER}`,
          method: 'POST',
          body: body,
        };
      },
      invalidatesTags: TAG,
    }),

    patchEmailSettings: builder.mutation({
      query: ({ body }: any) => {
        return {
          url: `${SOCIAL_FEATURES_EMAIL?.UPDATE_EMAIL_SETTINGS}`,
          method: 'PATCH',
          body: body,
        };
      },
      invalidatesTags: TAG,
    }),
    patchEmailMessage: builder.mutation({
      query: ({ body }: any) => {
        return {
          url: `${SOCIAL_FEATURES_EMAIL?.UPDATE_EMAIL_OTHER}`,
          method: 'PATCH',
          body: body,
        };
      },
      invalidatesTags: TAG_UPDATE_EMAIL,
    }),

    getEmailSettings: builder.query({
      query: () => {
        return {
          url: `${SOCIAL_FEATURES_EMAIL?.GET_EMAIL_SETTINGS}`,
          method: 'GET',
        };
      },
      providesTags: TAG,
    }),

    getEmailAuthUrl: builder.query({
      query: () => {
        return {
          url: `${SOCIAL_FEATURES_EMAIL?.AUTH_URL}`,
          method: 'GET',
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

  usePostSendOtherEmailMutation,
  usePostReplyOtherEmailMutation,
  usePostDraftOtherEmailMutation,
  useMoveFolderOtherEmailMutation,
  useGetDraftsQuery,
  usePatchEmailSettingsMutation,
  useGetEmailSettingsQuery,
  usePostScheduleOtherEmailMutation,
  usePatchEmailMessageMutation,
  usePostForwardOtherEmailMutation,
  useGetEmailAuthUrlQuery,
} = emailApi;
