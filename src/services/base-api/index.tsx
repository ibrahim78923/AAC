import { BASE_URL } from '@/config';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

//TAG
export const TAGS = [
  'USERS',
  'PLAN_MANEGEMENT',
  'INVENTORY_ACTIVITY',
  'Expense',
];

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  prepareHeaders: (headers) => {
    const token = `eyJraWQiOiJuRTJPbWRNU0xEUTdvVHQxbjc0bTVtTXNaU1loZFVvN2sweHNseDhZRjNJPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiIzMTE5YjkyNi1lNzMwLTQyZjgtYmJiZC01MmFkOTg1NWQ3ZjQiLCJjb2duaXRvOmdyb3VwcyI6WyJPUkdfRU1QTE9ZRUUiXSwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLmV1LXdlc3QtMi5hbWF6b25hd3MuY29tXC9ldS13ZXN0LTJfcTNkTFU2enZLIiwiY2xpZW50X2lkIjoiMzhlbDUzYXRvc2xkcTJ0aWd1YjdkMWtyM2MiLCJvcmlnaW5fanRpIjoiMDQ2ZjY1YzYtNDliNC00YWE0LWIyYmMtN2U3ZDk0OGYyMzNkIiwiZXZlbnRfaWQiOiIxYTlhOTliYy1lYzEzLTRhM2UtOTA4MC0yYmU2MjJlZTcyMGYiLCJ0b2tlbl91c2UiOiJhY2Nlc3MiLCJzY29wZSI6ImF3cy5jb2duaXRvLnNpZ25pbi51c2VyLmFkbWluIiwiYXV0aF90aW1lIjoxNjk5ODkwMTg1LCJleHAiOjE2OTk5NzY1ODUsImlhdCI6MTY5OTg5MDE4NSwianRpIjoiZmQ2NTA0MDUtYWQ3Ni00YzViLTk2ODQtYTBiOGRhZGJmYWE2IiwidXNlcm5hbWUiOiIzMTE5YjkyNi1lNzMwLTQyZjgtYmJiZC01MmFkOTg1NWQ3ZjQifQ.N4DPsP3w06MWn1jAq1pZ_YlRXaJpmH3H0x9RDAXzoCA36gQM_pDrBlTyvfn-F9Msmq42gSvCFcTQKXCi6LCvHek0UakdXVPXq8JaTBivwRrOt4itg91QDwLWSXRjZsDPUNYz4ISt17kF8WluE44Vw-aoRw_cFsOGkHGv-h-g2UGqkgHiut_AKHNIdomwHReZzxKd7qLs4tzSXAzy4JhG89_HuU-SB0LOtiabGRt5NXc2IJVw-IZMa9j6f5HiP7n3MGbA_1TEp3A2oHhXhgRCOlMKpxD6MIPXk4R5b52XTX3sQRjO0WTrWWvh9zGcI0RD6nE5IgcWPO8LX0taOcOIzw`;
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
