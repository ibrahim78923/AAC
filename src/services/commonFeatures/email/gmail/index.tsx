import { SOCIAL_FEATURES_GMAIL } from '@/routesConstants/paths';
import { baseAPI } from '@/services/base-api';
const TAG = ['GMAIL'];
export const gmailApi = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getAuthURLGmail: builder.query({
      query: ({ params }: any) => {
        return {
          url: `${SOCIAL_FEATURES_GMAIL?.AUTH_URL}`,
          method: 'GET',
          params: params,
        };
      },
      providesTags: TAG,
    }),
    getGmailFolders: builder.query({
      query: () => {
        return {
          url: `${SOCIAL_FEATURES_GMAIL?.GMAIL_FOLDER}`,
          method: 'GET',
        };
      },
      providesTags: TAG,
    }),

    getGmailsByFolderId: builder.query({
      query: ({ params }: any) => {
        return {
          url: `${SOCIAL_FEATURES_GMAIL?.GMAIL_BY_FOLDERID}`,
          method: 'GET',
          params: params,
        };
      },
      providesTags: TAG,
    }),
    getGmailMessageDetails: builder.query({
      query: ({ params }: any) => {
        return {
          url: `${SOCIAL_FEATURES_GMAIL?.GMAIL_MESSAGE_DETAIL}`,
          method: 'GET',
          params: params,
        };
      },
      providesTags: TAG,
    }),

    postSendGmail: builder.mutation({
      query: ({ body }: any) => {
        return {
          url: `${SOCIAL_FEATURES_GMAIL?.GMAIL_SEND}`,
          method: 'POST',
          body: body,
          headers: {
            'ngrok-skip-browser-warning': 'Bearer YOUR_ACCESS_TOKEN_HERE',
          },
        };
      },
      invalidatesTags: TAG,
    }),
    postScheduleGmail: builder.mutation({
      query: ({ body }: any) => {
        return {
          url: `${SOCIAL_FEATURES_GMAIL?.SCHEDULE_GMAIL_SEND}`,
          method: 'POST',
          body: body,
          headers: {
            'ngrok-skip-browser-warning': 'Bearer YOUR_ACCESS_TOKEN_HERE',
          },
        };
      },
      invalidatesTags: TAG,
    }),
    postDraftGmail: builder.mutation({
      query: ({ body }: any) => {
        return {
          url: `${SOCIAL_FEATURES_GMAIL?.DRAFT_GMAIL_SEND}`,
          method: 'POST',
          body: body,
          headers: {
            'ngrok-skip-browser-warning': 'Bearer YOUR_ACCESS_TOKEN_HERE',
          },
        };
      },
      invalidatesTags: TAG,
    }),
    postReplyOtherGmail: builder.mutation({
      query: ({ body }: any) => {
        return {
          url: `${SOCIAL_FEATURES_GMAIL?.REPLY_GMAIL_SEND}`,
          method: 'POST',
          body: body,
          headers: {
            'ngrok-skip-browser-warning': 'Bearer YOUR_ACCESS_TOKEN_HERE',
          },
        };
      },
      invalidatesTags: TAG,
    }),

    deleteGmail: builder.mutation({
      query: ({ ids }: any) => ({
        url: `${SOCIAL_FEATURES_GMAIL?.DELETE_GMAIL}/${ids}`,
        method: 'DELETE',
      }),
      invalidatesTags: TAG,
    }),

    forwardSendGmail: builder.mutation({
      query: ({ body }: any) => {
        return {
          url: `${SOCIAL_FEATURES_GMAIL?.FORWARD_GMAIL}`,
          method: 'POST',
          body: body,
          headers: {
            'ngrok-skip-browser-warning': 'Bearer YOUR_ACCESS_TOKEN_HERE',
          },
        };
      },
      invalidatesTags: TAG,
    }),
    patchGmailMessage: builder.mutation({
      query: ({ body }: any) => {
        return {
          url: `${SOCIAL_FEATURES_GMAIL?.UPDATE_GMAIL}`,
          method: 'PATCH',
          body: body,
        };
      },
      invalidatesTags: TAG,
    }),
  }),
});

export const {
  useGetAuthURLGmailQuery,
  useGetGmailFoldersQuery,
  useGetGmailsByFolderIdQuery,
  useGetGmailMessageDetailsQuery,
  usePostSendGmailMutation,
  usePostScheduleGmailMutation,
  usePostDraftGmailMutation,
  usePostReplyOtherGmailMutation,
  useDeleteGmailMutation,
  useForwardSendGmailMutation,
  usePatchGmailMessageMutation,
} = gmailApi;
