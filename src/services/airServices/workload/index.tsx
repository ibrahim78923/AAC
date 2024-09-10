import { WORKLOAD_STATUSES_OBJECT } from '@/modules/airServices/Workload/Workload.data';
import styles from '@/modules/airServices/Workload/Workload.module.scss';
import { END_POINTS } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';

const TAG = 'WORKLOAD';
const TAG_TWO = 'DROPDOWN_AGENT_LIST';

const TransformResponse = (response: any) => {
  return response?.data?.flatMap((item: any) => {
    const mainTask = {
      start: item?.plannedStartDate,
      end: item?.plannedEndDate,
      className:
        item?.status === WORKLOAD_STATUSES_OBJECT?.RESOLVED ||
        item?.status === WORKLOAD_STATUSES_OBJECT?.CLOSED
          ? styles?.completed
          : item?.status === WORKLOAD_STATUSES_OBJECT?.PENDING
            ? styles?.inprogress
            : styles?.toDo,
      extendedProps: {
        ticketId: item?._id,
        status: item?.status,
        avatar: item?.img,
        ticketIdNumber: item?.ticketIdNumber,
        subject: item?.subject,
      },
    };

    const taskDetails =
      item?.taskDetails?.map((detail: any) => ({
        start: detail?.startDate,
        end: detail?.endDate,
        className:
          detail?.status === WORKLOAD_STATUSES_OBJECT?.COMPLETED
            ? styles?.completed
            : detail?.status === WORKLOAD_STATUSES_OBJECT?.IN_PROGRESS
              ? styles?.inprogress
              : styles?.toDo,
        extendedProps: {
          ...detail,
          taskId: `TSK-${detail?._id?.slice(-3)}`,
        },
      })) || [];

    return [mainTask, ...taskDetails];
  });
};

export const workloadAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getWorkload: builder.query({
      query: (params: any) => ({
        url: END_POINTS?.WORKLOAD,
        method: 'GET',
        params,
      }),
      transformResponse: (response: any) => TransformResponse(response),
      providesTags: [TAG],
    }),

    getWorkloadFilter: builder.query({
      query: (params: any) => ({
        url: END_POINTS?.WORKLOAD,
        method: 'GET',
        params,
      }),
      providesTags: [TAG],
    }),

    patchTask: builder?.mutation({
      query: (patchTaskParameter: any) => ({
        url: END_POINTS?.UPDATE_TASK,
        method: 'PATCH',
        params: patchTaskParameter?.queryParams,
        body: patchTaskParameter?.reqBody,
      }),
      invalidatesTags: [TAG],
    }),

    getAllUsersInWorkload: builder?.query({
      query: ({ params }: any) => ({
        url: END_POINTS?.DROPDOWN_USERS,
        method: 'GET',
        params,
      }),
      transformResponse: (response: any) => {
        if (response) return response?.data;
      },
      providesTags: [TAG_TWO],
    }),
  }),
});

export const {
  useLazyGetWorkloadQuery,
  useLazyGetWorkloadFilterQuery,
  useGetWorkloadQuery,
  usePatchTaskMutation,
  useLazyGetAllUsersInWorkloadQuery,
} = workloadAPI;
