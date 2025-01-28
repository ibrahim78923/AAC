import { END_POINTS } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';

const TAG = 'CANNED_RESPONSES';
const TAG1 = 'RESPONSES_LIST';

export const cannedResponsesAPI = baseAPI?.injectEndpoints({
  endpoints: (builder) => ({
    getAirServicesSettingsCannedResponses: builder?.query({
      query: (apiDataParameter: any) => ({
        url: END_POINTS?.GET_CANNED_RESPONSES,
        method: 'GET',
        params: apiDataParameter?.queryParams,
      }),
      providesTags: [TAG],
    }),

    postAirServicesSettingsCannedResponses: builder?.mutation({
      query: (apiDataParameter: any) => ({
        url: END_POINTS?.ADD_CANNED_RESPONSES,
        method: 'POST',
        body: apiDataParameter?.body,
      }),
      invalidatesTags: [TAG],
    }),

    patchAirServicesSettingsCannedResponse: builder?.mutation({
      query: (patchCannedResponseParameter: any) => ({
        url: END_POINTS?.UPDATE_CANNED_RESPONSES,
        method: 'PATCH',
        body: patchCannedResponseParameter?.body,
      }),
      invalidatesTags: [TAG],
    }),

    deleteAirServicesSettingsCannedResponse: builder?.mutation({
      query: (apiDataParameter: any) => ({
        url: END_POINTS?.DELETE_CANNED_RESPONSES,
        method: 'DELETE',
        params: apiDataParameter?.queryParams,
      }),
      invalidatesTags: [TAG],
    }),

    getAirServicesSettingsCannedResponseAgents: builder?.query({
      query: ({ params }: any) => ({
        url: END_POINTS?.USERS_DROPDOWN,
        method: 'GET',
        params,
      }),
      transformResponse: (response: any) => {
        if (response) return response?.data;
      },
      providesTags: [TAG],
    }),

    getAirServicesSettingsCannedResponsesList: builder?.query({
      query: (apiDataParameter: any) => ({
        url: END_POINTS?.GET_RESPONSES_LIST,
        method: 'GET',
        params: apiDataParameter?.queryParams,
      }),
      providesTags: [TAG1],
    }),

    postAirServicesSettingsCannedAddResponse: builder?.mutation({
      query: (apiDataParameter: any) => ({
        url: END_POINTS?.POST_RESPONSE,
        method: 'POST',
        body: apiDataParameter?.body,
      }),
      invalidatesTags: [TAG1],
    }),

    patchAirServicesSettingsCannedAddResponse: builder?.mutation({
      query: (patchResponseParameter: any) => ({
        url: END_POINTS?.UPDATE_RESPONSE,
        method: 'PATCH',
        body: patchResponseParameter?.body,
      }),
      invalidatesTags: [TAG1],
    }),

    patchAirServicesSettingsCannedAddMoveResponses: builder?.mutation({
      query: (moveResponsesParameter: any) => ({
        url: END_POINTS?.MOVE_RESPONSES,
        method: 'PATCH',
        body: moveResponsesParameter?.body,
      }),
    }),

    deleteAirServicesSettingsCannedAddResponses: builder?.mutation({
      query: (apiDataParameter: any) => ({
        url: END_POINTS?.DELETE_RESPONSES,
        method: 'DELETE',
        params: apiDataParameter?.queryParams,
      }),
    }),

    getAirServicesSettingsCannedFolders: builder?.query({
      query: ({ params }: any) => ({
        url: END_POINTS?.DROPDOWN_FOLDERS,
        method: 'GET',
        params,
      }),
      transformResponse: (response: any) => {
        if (response) return response?.data;
      },
      providesTags: [TAG],
    }),
  }),
});

export const {
  useLazyGetAirServicesSettingsCannedResponsesQuery,
  usePostAirServicesSettingsCannedResponsesMutation,
  useDeleteAirServicesSettingsCannedResponseMutation,
  usePatchAirServicesSettingsCannedResponseMutation,
  useLazyGetAirServicesSettingsCannedResponseAgentsQuery,
  useLazyGetAirServicesSettingsCannedResponsesListQuery,
  usePostAirServicesSettingsCannedAddResponseMutation,
  usePatchAirServicesSettingsCannedAddResponseMutation,
  usePatchAirServicesSettingsCannedAddMoveResponsesMutation,
  useDeleteAirServicesSettingsCannedAddResponsesMutation,
  useLazyGetAirServicesSettingsCannedFoldersQuery,
} = cannedResponsesAPI;
