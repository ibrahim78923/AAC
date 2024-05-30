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
  }),
});

export const {
  useGetAuthURLGmailQuery,
  useGetGmailFoldersQuery,
  useGetGmailsByFolderIdQuery,
} = gmailApi;
