import { WORKLOAD_STATUSES_OBJECT } from '@/modules/airServices/Workload/Workload.data';
import styles from '@/modules/airServices/Workload/Workload.module.scss';
import { END_POINTS } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';
import { localeDateTime } from '@/utils/dateTime';

const TAG = 'WORKLOAD';
const TAG_TWO = 'DROPDOWN_AGENT_LIST';

const TransformResponse = (response: any) => {
  return response?.data?.flatMap((item: any) => {
    const mainTask = {
      start: item?.plannedStartDate
        ? localeDateTime(item?.plannedStartDate)
        : undefined,
      end: item?.plannedEndDate
        ? localeDateTime(item?.plannedEndDate)
        : undefined,
      className:
        item?.status === WORKLOAD_STATUSES_OBJECT?.RESOLVED ||
        item?.status === WORKLOAD_STATUSES_OBJECT?.CLOSED
          ? styles?.completed
          : item?.status === WORKLOAD_STATUSES_OBJECT?.PENDING
            ? styles?.inprogress
            : styles?.toDo,
      extendedProps: {
        ticketIdParent: item?._id,
        status: item?.status,
        avatar: item?.agentDetails?.avatar,
        ticketIdNumber: item?.ticketIdNumber,
        subject: item?.subject,
        description: item?.description,
        agentDetails: item?.agentDetails,
        plannedStartDate: item?.plannedStartDate
          ? localeDateTime(item?.plannedStartDate)
          : undefined,
        plannedEndDate: item?.plannedEndDate
          ? localeDateTime(item?.plannedEndDate)
          : undefined,
        plannedEffort: item?.plannedEffort,
        moduleType: item?.moduleType,
        ticketType: item?.ticketType,
        isChildTicket: item?.isChildTicket,
      },
    };

    const taskDetails =
      item?.taskDetails?.map((detail: any) => ({
        start: detail?.startDate
          ? localeDateTime(detail?.startDate)
          : undefined,
        end: detail?.endDate ? localeDateTime(detail?.endDate) : undefined,
        className:
          detail?.status === WORKLOAD_STATUSES_OBJECT?.COMPLETED
            ? styles?.completed
            : detail?.status === WORKLOAD_STATUSES_OBJECT?.IN_PROGRESS
              ? styles?.inprogress
              : styles?.toDo,
        extendedProps: {
          ...detail,
          taskId: `#TSK-${detail?._id?.slice(-3)}`,
          startDate: detail?.startDate
            ? localeDateTime(detail?.startDate)
            : undefined,
          endDate: detail?.endDate
            ? localeDateTime(detail?.endDate)
            : undefined,
        },
      })) || [];

    return [mainTask, ...taskDetails];
  });
};

export const workloadAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getAirServicesWorkload: builder.query({
      query: (params: any) => ({
        url: END_POINTS?.WORKLOAD,
        method: 'GET',
        params,
      }),
      transformResponse: (response: any) => TransformResponse(response),
      providesTags: [TAG],
    }),

    getAirServicesWorkloadFilter: builder.query({
      query: (params: any) => ({
        url: END_POINTS?.WORKLOAD,
        method: 'GET',
        params,
      }),
      providesTags: [TAG],
    }),

    patchAirServicesWorkloadTask: builder?.mutation({
      query: (patchTaskParameter: any) => ({
        url: END_POINTS?.UPDATE_TASK,
        method: 'PATCH',
        params: patchTaskParameter?.queryParams,
        body: patchTaskParameter?.reqBody,
      }),
      invalidatesTags: [TAG],
    }),

    getAirServicesAllUsersInWorkload: builder?.query({
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

    putAirServicesWorkloadTickets: builder?.mutation({
      query: (putTicketParameter: any) => ({
        url: `${END_POINTS?.TICKET}/{id}`,
        method: 'PUT',
        body: putTicketParameter?.body,
      }),
      invalidatesTags: [TAG],
    }),
  }),
});

export const {
  useLazyGetAirServicesWorkloadQuery,
  useLazyGetAirServicesWorkloadFilterQuery,
  useGetAirServicesWorkloadQuery,
  usePatchAirServicesWorkloadTaskMutation,
  useLazyGetAirServicesAllUsersInWorkloadQuery,
  usePutAirServicesWorkloadTicketsMutation,
} = workloadAPI;
