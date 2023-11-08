import { BASE_URL } from '@/config';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Tags
export const TAGS = ['USERS', 'PLAN_MANEGEMENT', 'WORKLOAD'];

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  prepareHeaders: (headers) => {
    const token: string | null =
      'eyJraWQiOiJuRTJPbWRNU0xEUTdvVHQxbjc0bTVtTXNaU1loZFVvN2sweHNseDhZRjNJPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiIzMTE5YjkyNi1lNzMwLTQyZjgtYmJiZC01MmFkOTg1NWQ3ZjQiLCJjb2duaXRvOmdyb3VwcyI6WyJPUkdfRU1QTE9ZRUUiXSwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLmV1LXdlc3QtMi5hbWF6b25hd3MuY29tXC9ldS13ZXN0LTJfcTNkTFU2enZLIiwiY2xpZW50X2lkIjoiMzhlbDUzYXRvc2xkcTJ0aWd1YjdkMWtyM2MiLCJvcmlnaW5fanRpIjoiZDdhNDAwZjEtMzdkNy00MzdlLWI3ZjQtNTM4YTliMjcyMDNlIiwiZXZlbnRfaWQiOiI1ZDZhNmZhZi1kNGQ2LTQyM2QtOTU2Yy1mNmM0NDdhOTUzMTgiLCJ0b2tlbl91c2UiOiJhY2Nlc3MiLCJzY29wZSI6ImF3cy5jb2duaXRvLnNpZ25pbi51c2VyLmFkbWluIiwiYXV0aF90aW1lIjoxNjk5NDU2NzgyLCJleHAiOjE2OTk1NDMxODIsImlhdCI6MTY5OTQ1Njc4MiwianRpIjoiYmRkMzc5YjctYmRhZi00MGY5LWJhYzEtMmM3NGYxZTIxZjc5IiwidXNlcm5hbWUiOiIzMTE5YjkyNi1lNzMwLTQyZjgtYmJiZC01MmFkOTg1NWQ3ZjQifQ.kyMC1cFxEUYHrONfIamVoLKS8OwzOs_dZCrb_7ASACtCw10ZEX81_Z3xATwSVIUUeKMt_EQsb4KmpF9tvFEM2yPuXJ7_qY6pJudAbf8fj4oU1cka4RneaV42MtERWRRomJuDtuNvM3MfH6lJoTDlE1rN-znqCqwL2tJPwWv4f2qsA1xDW8THgjDvsllEezQgJSIAyfNJdSTbIqdjsYoH2nzwgZCC967om6eUmqz0SiHF-e5X9OuzexIWxFZpMkm2KYh8NxFJEVXgGZBZLP6tKLsGuJ0w8cO7I8UDmt8p193s_q0uFP7Zjzve9anbjzb5wOM5WJORR-_FB1CbHh0oYA';
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

export const baseAPI = createApi({
  reducerPath: 'api',
  baseQuery: baseQuery,
  tagTypes: TAGS,
  endpoints: () => ({}),
});
