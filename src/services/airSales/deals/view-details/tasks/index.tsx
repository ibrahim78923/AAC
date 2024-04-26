import { END_POINTS } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';
const TAG_THREE = ['TASK_DEALS_USERS_ASSIGNEE'];

const transformResponse = (response: any) => {
  // console.log("response",response)
  if (response) return response?.data?.users;
};
export const exampleExampleAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getDealsTasksManagement: builder.query({
      //  todo: pagination will be implemented at the end .
      query: ({ query }) => ({
        url: `${END_POINTS?.TASK_MANAGEMENT}?page=1&limit=100`,
        method: 'GET',
        params: query,
      }),
      providesTags: ['DEALS_TASK_MANAGEMENT'],
    }),

    postDealsTasksManagement: builder.mutation({
      query: ({ body }: any) => ({
        url: END_POINTS?.TASK_MANAGEMENT,
        method: 'POST',
        body: body,
      }),
      invalidatesTags: ['DEALS_TASK_MANAGEMENT'],
    }),
    updateDealsTasksManagement: builder.mutation({
      query: ({ id, body }: any) => ({
        url: `${END_POINTS?.TASK_MANAGEMENT}/${id}`,
        method: 'PATCH',
        body: body,
      }),
      invalidatesTags: ['DEALS_TASK_MANAGEMENT'],
    }),
    deleteDealsTasksManagement: builder.mutation({
      query: ({ body }: any) => ({
        url: `${END_POINTS?.TASK_MANAGEMENT_UNASSIGN_DEAL}`,
        method: 'POST',
        body: body,
      }),
      invalidatesTags: ['DEALS_TASK_MANAGEMENT'],
    }),

    getDealsAssignedUsers: builder.query({
      query: ({ params }: any) => ({
        url: `${END_POINTS?.USER_LIST}`,
        method: 'GET',
        params: params,
      }),
      transformResponse: (response: any) => transformResponse(response),
      providesTags: TAG_THREE,
    }),

    getDealsTaskDetails: builder.query({
      query: ({ id }: any) => ({
        url: `${END_POINTS?.TASK_MANAGEMENT}/${id}`,
        method: 'GET',
      }),
      providesTags: ['DEALS_TASK_MANAGEMENT'],
    }),
  }),
});

export const {
  useGetDealsTasksManagementQuery,
  usePostDealsTasksManagementMutation,
  useUpdateDealsTasksManagementMutation,
  useDeleteDealsTasksManagementMutation,
  useLazyGetDealsAssignedUsersQuery,
  useGetDealsTaskDetailsQuery,
} = exampleExampleAPI;
