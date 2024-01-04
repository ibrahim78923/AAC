import styles from '@/modules/airServices/Workload/Workload.module.scss';
import { END_POINTS } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';

const TAG = 'WORKLOAD';

const COMPLETED = 'completed';
const IN_PROGRESS = 'inprogress';

const TransformResponse = (response: any) =>
  response?.data?.map((item: any) => ({
    start: item?.startDate,
    end: item?.endDate,
    className:
      item?.status?.toLowerCase() === COMPLETED
        ? styles?.completed
        : item?.status?.toLowerCase()?.replace(/\s/g, '') === IN_PROGRESS
          ? styles?.inprogress
          : styles?.toDo,
    extendedProps: {
      status: item?.status,
      img: item?.img,
      ticketNo: `TSK-${item?._id?.slice(-3)}`,
      description: item?.description,
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
  }),
});

export const { useGetWorkloadQuery } = workloadAPI;
