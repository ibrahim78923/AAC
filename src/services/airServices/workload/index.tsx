import styles from '@/modules/airServices/Workload/Workload.module.scss';
import { ENDPOINTS } from '@/routesConstants/endpoints';
import { baseAPI } from '@/services/base-api';

const TAG = 'WORKLOAD';

const TransformResponse = (response: any) =>
  response?.data?.map((item: any) => ({
    start: item?.startDate,
    end: item?.endDate,
    className:
      item?.status?.toLowerCase() === 'completed'
        ? styles?.completed
        : item?.status?.toLowerCase().replace(/\s/g, '') === 'inprogress'
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
        url: `${ENDPOINTS?.WORKLOAD}`,
        method: 'GET',
        params,
      }),
      transformResponse: (response: any) => TransformResponse(response),
      providesTags: [TAG],
    }),
    getWorkloadProfile: builder.query({
      query: (params: any) => ({
        url: `${ENDPOINTS?.WORKLOAD_PROFILE}`,
        method: 'GET',
        params,
      }),
      transformResponse: (response: any) => TransformResponse(response),
      providesTags: [TAG],
    }),
  }),
});

export const { useGetWorkloadQuery, useGetWorkloadProfileQuery } = workloadAPI;
