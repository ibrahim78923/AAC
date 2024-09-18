import { END_POINTS } from '@/routesConstants/endpoints';
import {
  SOCIAL_FEATURES_GMAIL,
  SOCIAL_FEATURES_OUTLOOK,
} from '@/routesConstants/paths';
import { baseAPI } from '@/services/base-api';
const TAG = ['OUTLOOK'];
const TAG_UPDATE_EMAIL = ['OUTLOOK_UPDATE'];
const DRAFT_MAIL = ['DRAFT_MAIL'];
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
    getMailFoldersOutlook: builder.query({
      query: () => {
        return {
          url: `${SOCIAL_FEATURES_OUTLOOK?.EMAIL_FOLDERS}`,
          method: 'GET',
        };
      },
      providesTags: TAG,
    }),

    getEmailsByFolderIdOutlook: builder.query({
      query: ({ params, id }: any) => {
        return {
          url: `${SOCIAL_FEATURES_OUTLOOK?.EMAIL_FOLDERS_BY_ID}/${id}`,
          method: 'GET',
          params: params,
        };
      },
      providesTags: TAG,
    }),

    getMailDetailsOutlook: builder.query({
      query: ({ params }: any) => {
        return {
          url: `${SOCIAL_FEATURES_OUTLOOK?.EMAIL_DETAILS}`,
          method: 'GET',
          params: params,
        };
      },
    }),

    postSendEmailOutlook: builder.mutation({
      query: ({ body }: any) => {
        return {
          url: `${SOCIAL_FEATURES_OUTLOOK?.SEND_EMAIL}`,
          method: 'POST',
          body: body,
          headers: {
            'ngrok-skip-browser-warning': 'Bearer YOUR_ACCESS_TOKEN_HERE',
          },
        };
      },
      invalidatesTags: TAG,
    }),

    forwardEmailOutlook: builder.mutation({
      query: ({ body }: any) => {
        return {
          url: `${SOCIAL_FEATURES_OUTLOOK?.FORWARD_EMAIL}`,
          method: 'POST',
          body: body,
          headers: {
            'ngrok-skip-browser-warning': 'Bearer YOUR_ACCESS_TOKEN_HERE',
          },
        };
      },
      invalidatesTags: TAG,
    }),

    postReplyEmailOutlook: builder.mutation({
      query: ({ to, cc, bcc, messageId, type, replyText }: any) => {
        return {
          url: `${SOCIAL_FEATURES_OUTLOOK?.REPLY_EMAIL}?to=${to}&cc=${cc}&bcc=${bcc}&messageId=${messageId}&type=${type}&replyText=${replyText}`,
          method: 'POST',
          headers: {
            'ngrok-skip-browser-warning': 'Bearer YOUR_ACCESS_TOKEN_HERE',
          },
        };
      },
      invalidatesTags: TAG,
    }),

    postScheduleEmailOutlook: builder.mutation({
      query: ({ body }: any) => {
        return {
          url: `${SOCIAL_FEATURES_OUTLOOK?.SCHEDULE_EMAIL}`,
          method: 'POST',
          body: body,
          headers: {
            'ngrok-skip-browser-warning': 'Bearer YOUR_ACCESS_TOKEN_HERE',
          },
        };
      },
      invalidatesTags: TAG,
    }),

    postDraftEmailOutlook: builder.mutation({
      query: ({ body }: any) => {
        return {
          url: `${SOCIAL_FEATURES_OUTLOOK?.DRAFT_EMAIL}`,
          method: 'POST',
          body: body,
          headers: {
            'ngrok-skip-browser-warning': 'Bearer YOUR_ACCESS_TOKEN_HERE',
          },
        };
      },
      invalidatesTags: DRAFT_MAIL,
    }),

    deleteEmailOutlook: builder.mutation({
      query: ({ body }: any) => {
        return {
          url: `${SOCIAL_FEATURES_OUTLOOK?.DELETE_EMAIL}`,
          method: 'PATCH',
          body: body,
          headers: {
            'ngrok-skip-browser-warning': 'Bearer YOUR_ACCESS_TOKEN_HERE',
          },
        };
      },
      invalidatesTags: TAG,
    }),

    patchOutlookEmailMessage: builder.mutation({
      query: ({ body }: any) => {
        return {
          url: `${SOCIAL_FEATURES_OUTLOOK?.UPDATE_EMAIL}`,
          method: 'PATCH',
          body: body,
        };
      },
      invalidatesTags: TAG_UPDATE_EMAIL,
    }),
    patchOutlookMoveToFolder: builder.mutation({
      query: ({ body }: any) => {
        return {
          url: `${SOCIAL_FEATURES_OUTLOOK?.MOVE_TO_FOLDER_EMAIL}`,
          method: 'PATCH',
          body: body,
        };
      },
      invalidatesTags: TAG_UPDATE_EMAIL,
    }),
    LogoutOutlook: builder.mutation({
      query: ({ body }: any) => {
        return {
          url: `${SOCIAL_FEATURES_OUTLOOK?.LOGOUT_OUTLOOK}`,
          method: 'PUT',
          body: body,
        };
      },
      invalidatesTags: TAG,
    }),

    getAllDealsAsync: builder?.query({
      query: ({ params }: any) => ({
        url: `${END_POINTS?.DEALS_LIST_VIEW}`,
        method: 'GET',
        params,
      }),
      transformResponse: (response: any) => {
        if (response) return response?.data?.deals;
      },
    }),

    postLinkToDealOutlook: builder.mutation({
      query: ({ body }: any) => {
        return {
          url: `${SOCIAL_FEATURES_GMAIL?.LINK_DEAL}`,
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

export const {
  useGetAuthURLOutlookQuery,
  useGetMailFoldersOutlookQuery,
  useGetEmailsByFolderIdOutlookQuery,
  useGetMailDetailsOutlookQuery,
  usePostSendEmailOutlookMutation,
  usePostScheduleEmailOutlookMutation,
  useDeleteEmailOutlookMutation,
  usePostDraftEmailOutlookMutation,
  usePostReplyEmailOutlookMutation,
  useForwardEmailOutlookMutation,
  usePatchOutlookEmailMessageMutation,
  usePatchOutlookMoveToFolderMutation,
  useLogoutOutlookMutation,
  useLazyGetAllDealsAsyncQuery,
  usePostLinkToDealOutlookMutation,
} = outlookApi;
