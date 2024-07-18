import styles from '@/modules/airServices/Workload/Workload.module.scss';
import { END_POINTS } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';
import { Box } from '@mui/material';

const TAG = 'WORKLOAD';
const TAG_TWO = 'DROPDOWN_AGENT_LIST';
const TAG_THREE = 'DROPDOWN_DEPARTMENT';

const COMPLETED = 'Done';
const IN_PROGRESS = 'In-Progress';

const TransformResponse = (response: any) =>
  response?.data?.map((item: any) => ({
    start: item?.startDate,
    end: item?.endDate,
    className:
      item?.status === COMPLETED
        ? styles?.completed
        : item?.status === IN_PROGRESS
        ? styles?.inprogress
        : styles?.toDo,
    extendedProps: {
      data: { ...item },
      status: item?.status,
      img: item?.img,
      taskNo: `TSK-${item?._id?.slice(-3)}`,
      description: item?.description ? (
        <Box
          component={'span'}
          dangerouslySetInnerHTML={{ __html: item?.description }}
        />
      ) : (
        '-'
      ),
    },
  }));

export const workloadAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getWorkload: builder.query({
      query: (params: any) => ({
        url: `${END_POINTS?.WORKLOAD}`,
        method: 'GET',
        params,
      }),
      transformResponse: (response: any) => TransformResponse(response),
      providesTags: [TAG],
    }),

    getWorkloadFilter: builder.query({
      query: (params: any) => ({
        url: `${END_POINTS?.WORKLOAD}`,
        method: 'GET',
        params,
      }),
      providesTags: [TAG],
    }),

    getAssignToAgents: builder?.query({
      query: ({ params }: any) => ({
        url: `${END_POINTS?.GET_AGENT}`,
        method: 'GET',
        params,
      }),
      transformResponse: (response: any) => {
        if (response) return response?.data?.users;
      },
      providesTags: [TAG_TWO],
    }),

    getDepartmentDropdown: builder?.query({
      query: ({ params }: any) => ({
        url: `${END_POINTS?.DROPDOWN_DEPARTMENT}`,
        method: 'GET',
        params,
      }),
      transformResponse: (response: any) => {
        if (response) return response?.data?.departments;
      },
      providesTags: [TAG_THREE],
    }),

    patchTask: builder?.mutation({
      query: (patchTaskParameter: any) => ({
        url: END_POINTS?.UPDATE_TASK,
        method: 'PATCH',
        params: patchTaskParameter?.data,
        body: {},
      }),
      invalidatesTags: [TAG],
    }),
  }),
});

export const {
  useLazyGetWorkloadQuery,
  useLazyGetWorkloadFilterQuery,
  useGetWorkloadQuery,
  useLazyGetAssignToAgentsQuery,
  useLazyGetDepartmentDropdownQuery,
  usePatchTaskMutation,
} = workloadAPI;
