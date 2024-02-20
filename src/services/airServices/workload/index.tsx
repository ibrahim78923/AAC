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

    getAssignTo: builder?.query({
      query: ({ params }: any) => ({
        url: `${END_POINTS?.DROPDOWN_AGENTS_LIST}`,
        method: 'GET',
        params,
      }),
      transformResponse: (response: any) => {
        if (response) return response?.data;
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
      query: (body: any) => ({
        url: `${END_POINTS?.TASK}/${body?.id}`,
        method: 'PATCH',
        params: body?.data,
      }),
      invalidatesTags: [TAG],
    }),
  }),
});

export const {
  useLazyGetWorkloadQuery,
  useGetWorkloadQuery,
  useLazyGetAssignToQuery,
  useLazyGetDepartmentDropdownQuery,
  usePatchTaskMutation,
} = workloadAPI;
