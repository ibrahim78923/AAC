import { BASE_URL } from '@/config';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Tags
export const TAGS = ['USERS', 'PLAN_MANEGEMENT', 'CREATE_TICKET'];

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  prepareHeaders: (headers) => {
    const token:
      | string
      | null = `eyJraWQiOiJuRTJPbWRNU0xEUTdvVHQxbjc0bTVtTXNaU1loZFVvN2sweHNseDhZRjNJPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiIzMTE5YjkyNi1lNzMwLTQyZjgtYmJiZC01MmFkOTg1NWQ3ZjQiLCJjb2duaXRvOmdyb3VwcyI6WyJPUkdfRU1QTE9ZRUUiXSwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLmV1LXdlc3QtMi5hbWF6b25hd3MuY29tXC9ldS13ZXN0LTJfcTNkTFU2enZLIiwiY2xpZW50X2lkIjoiMzhlbDUzYXRvc2xkcTJ0aWd1YjdkMWtyM2MiLCJvcmlnaW5fanRpIjoiMTNhM2I2OWItZDNiMS00YjQ1LWE0NzYtOTkzYzZjZGNjZWM3IiwiZXZlbnRfaWQiOiI5ODQ4MTdhNC1lMjMwLTQ3ZDAtOGRhZC04N2UzNTU0NGRhMjUiLCJ0b2tlbl91c2UiOiJhY2Nlc3MiLCJzY29wZSI6ImF3cy5jb2duaXRvLnNpZ25pbi51c2VyLmFkbWluIiwiYXV0aF90aW1lIjoxNjk5OTYzOTQzLCJleHAiOjE3MDAwNTAzNDMsImlhdCI6MTY5OTk2Mzk0MywianRpIjoiZGU1Y2JmMWMtZTFlZC00MjJlLTlhNzEtOTAyMDNiOTM4ZDA0IiwidXNlcm5hbWUiOiIzMTE5YjkyNi1lNzMwLTQyZjgtYmJiZC01MmFkOTg1NWQ3ZjQifQ.MZKlVJvjGpsmOa_fTP6HYrz9NRduKBGF0lGIxaYSo4PlWSNBIg52ws3KHL0-Fs_pHUdfQakoCGk0FXKEEYwO8rlQ4XJtRhT9t3KF88pvhgveq8dBh0czelPwc_YP0l1ZohsqK8bre3jKRDNBoYt1KW0VIqxgthoe7-AiE4hPM_PPKAQeR4ZWzpH_TI3LA303zkjGPIcaY_t9OpIXUevpWqFrIMvG4Ex36AgTBSm58a4HY3GxjbzExLfQDP73KYRrnEQEVNlBcBMKAOpE8pIadrNz1CXivBjMB_ztbOhWmV8ioeCuB2wCfoUts5EywmInWhfudxpmPh5h8GrgvkK_rw`;
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
