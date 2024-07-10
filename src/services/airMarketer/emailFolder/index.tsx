import { AIR_MARKETER_EMAIL_FOLDER } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';

const TAG = 'EMAIL_FOLDER';

export const emailFolderAPI: any = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getEmailFolder: builder.query({
      query: ({ ...params }) => ({
        url: `${AIR_MARKETER_EMAIL_FOLDER?.GET_EMAIL_FOLDER}`,
        method: 'GET',
        params,
      }),
      providesTags: [TAG],
    }),
    postEmailFolder: builder.mutation({
      query: ({ body }: any) => {
        return {
          url: AIR_MARKETER_EMAIL_FOLDER?.POST_EMAIL_FOLDER,
          method: 'POST',
          body: body,
        };
      },
      invalidatesTags: [TAG],
    }),
    deleteEmailFolder: builder.mutation({
      query: ({ ids }: any) => {
        return {
          url: `${AIR_MARKETER_EMAIL_FOLDER?.DELETE_EMAIL_FOLDER}?${ids}`,
          method: 'DELETE',
        };
      },
      invalidatesTags: [TAG],
    }),
    duplicateEmailFolder: builder.mutation({
      query: ({ id, body }: any) => {
        return {
          url: `${AIR_MARKETER_EMAIL_FOLDER?.DUPLICATE_EMAIL_FOLDER}?${id}`,
          method: 'POST',
          body: body,
        };
      },
      invalidatesTags: [TAG],
    }),
  }),
});

export const {
  useGetEmailFolderQuery,
  usePostEmailFolderMutation,
  useDeleteEmailFolderMutation,
  useDuplicateEmailFolderMutation,
} = emailFolderAPI;
