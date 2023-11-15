import { BASE_URL } from '@/config';

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Tags
export const TAGS = [
  'USERS',
  'PLAN_MANEGEMENT',
  'NEW_INCIDENT',
  'Organization',
  'TICKETS',
];

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  prepareHeaders: (headers) => {
    const token:
      | string
      | null = `eyJraWQiOiJuRTJPbWRNU0xEUTdvVHQxbjc0bTVtTXNaU1loZFVvN2sweHNseDhZRjNJPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiIzMTE5YjkyNi1lNzMwLTQyZjgtYmJiZC01MmFkOTg1NWQ3ZjQiLCJjb2duaXRvOmdyb3VwcyI6WyJPUkdfRU1QTE9ZRUUiXSwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLmV1LXdlc3QtMi5hbWF6b25hd3MuY29tXC9ldS13ZXN0LTJfcTNkTFU2enZLIiwiY2xpZW50X2lkIjoiMzhlbDUzYXRvc2xkcTJ0aWd1YjdkMWtyM2MiLCJvcmlnaW5fanRpIjoiYWY3ZWUxOWUtZDkzNC00MmJlLTllN2MtYzNhNDc2NDI2YmE2IiwiZXZlbnRfaWQiOiI1MGRkZDlhMS1lNjg3LTRmMDktYjUyYy04MDliNWRiODgzZWQiLCJ0b2tlbl91c2UiOiJhY2Nlc3MiLCJzY29wZSI6ImF3cy5jb2duaXRvLnNpZ25pbi51c2VyLmFkbWluIiwiYXV0aF90aW1lIjoxNzAwMDU1Njg1LCJleHAiOjE3MDAxNDIwODUsImlhdCI6MTcwMDA1NTY4NSwianRpIjoiN2Y4ODdlNzMtOWY2Yi00MTQyLTk0NjEtYmE3OTE1NTIzZmFjIiwidXNlcm5hbWUiOiIzMTE5YjkyNi1lNzMwLTQyZjgtYmJiZC01MmFkOTg1NWQ3ZjQifQ.ft9KnV6EkVVSYY0tPuHvN4t0J-I2S9U55O7U4xcVrYeUr04DDplP2FY58jILV-6MTqBVW2Ly2gb0ws77XOsDMVjMYh2Ai1ZmrIxU5BAqyCXxxl8oYGNbtIu77HxJSEF3b6R86g2UKJGKnx9Y2wz1jxVWOVJ4YHFBzMYYS7HlFXqM_Zj3rGEGJNPqTrIrDgi4nYTNk9LEw-d8-b7mPEB8NW8_4h3vWSNChaRpqln1cfLqwLGzoJKoE0a0IQOO1KqOsvPlRqkT8A9NCXCbhc0-l_2NM7vgxpV8jC-N4TemzDsTgncL9qyKjb3MYWfMtkMGgmQCz1Lqico2EOQ9tJMTIA`;

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
