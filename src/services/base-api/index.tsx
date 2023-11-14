import { BASE_URL } from '@/config';

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Tags
export const TAGS = [
  'USERS',
  'PLAN_MANEGEMENT',
  'NEW_INCIDENT',
  'Organization',
];

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  prepareHeaders: (headers) => {
    const token:
      | string
      | null = `eyJraWQiOiJuRTJPbWRNU0xEUTdvVHQxbjc0bTVtTXNaU1loZFVvN2sweHNseDhZRjNJPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiIzMTE5YjkyNi1lNzMwLTQyZjgtYmJiZC01MmFkOTg1NWQ3ZjQiLCJjb2duaXRvOmdyb3VwcyI6WyJPUkdfRU1QTE9ZRUUiXSwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLmV1LXdlc3QtMi5hbWF6b25hd3MuY29tXC9ldS13ZXN0LTJfcTNkTFU2enZLIiwiY2xpZW50X2lkIjoiMzhlbDUzYXRvc2xkcTJ0aWd1YjdkMWtyM2MiLCJvcmlnaW5fanRpIjoiNzI2OTI4N2MtYTc3MS00YmY1LWFiZjUtN2YxNjk5ZTkwMjA5IiwiZXZlbnRfaWQiOiI0OTA2ZGRkYy01MTg0LTQxNzktYjEwYy1mOWU3Yzg3NmI0M2YiLCJ0b2tlbl91c2UiOiJhY2Nlc3MiLCJzY29wZSI6ImF3cy5jb2duaXRvLnNpZ25pbi51c2VyLmFkbWluIiwiYXV0aF90aW1lIjoxNjk5OTc5MDI2LCJleHAiOjE3MDAwNjU0MjYsImlhdCI6MTY5OTk3OTAyNiwianRpIjoiZDliYzZjZmEtNTRlYi00OGI1LTgwMWUtMzUzYWZlZGZiZjI5IiwidXNlcm5hbWUiOiIzMTE5YjkyNi1lNzMwLTQyZjgtYmJiZC01MmFkOTg1NWQ3ZjQifQ.cOWWP0ZEUMJYmjgqYC2bEXf4c944J6siHDCpizhSi6Gpvp0iYNWSyV2BSP4q9wfU8P5ORtDco1bDyRXU6svTEzWPC_9LN7llQIgTPsdaXwhQsw7QofWxceh0PRRJ8hYnfXQesa0_0PthDpFCQ-feNNUztCWVzBR5M2bsRWnHMcONsD9_dAGST9eM-Q7I_a2WBq_wSBvRCmywsJe1CpqUsRmyrz0LzXcVrV4nYGim7bmFs3fhi0ARXcT9JfOQYOoTSVJ9bwBh2EZoQoy_HOwmWZ6B-y9yfdQ04xGBBDuJsYxrncAiHPDQgEzjN4Y92Tmw99d7e3SSrlSENqBvsKNagg`;
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
