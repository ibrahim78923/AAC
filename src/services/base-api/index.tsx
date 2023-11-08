import { BASE_URL } from '@/config';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Tags
export const TAGS = ['USERS', 'PLAN_MANEGEMENT'];

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  prepareHeaders: (headers) => {
    const token =
      'eyJraWQiOiJuRTJPbWRNU0xEUTdvVHQxbjc0bTVtTXNaU1loZFVvN2sweHNseDhZRjNJPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiIzMTE5YjkyNi1lNzMwLTQyZjgtYmJiZC01MmFkOTg1NWQ3ZjQiLCJjb2duaXRvOmdyb3VwcyI6WyJPUkdfRU1QTE9ZRUUiXSwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLmV1LXdlc3QtMi5hbWF6b25hd3MuY29tXC9ldS13ZXN0LTJfcTNkTFU2enZLIiwiY2xpZW50X2lkIjoiMzhlbDUzYXRvc2xkcTJ0aWd1YjdkMWtyM2MiLCJvcmlnaW5fanRpIjoiNTk4NzgxMWYtOWU5YS00OTU4LTlhOGMtMTk1ZmQzODRhZjEwIiwiZXZlbnRfaWQiOiJhOGY2ZDlkMi02NjIwLTQ5N2MtOTJkZS1hODc4NWY0Y2MxYWYiLCJ0b2tlbl91c2UiOiJhY2Nlc3MiLCJzY29wZSI6ImF3cy5jb2duaXRvLnNpZ25pbi51c2VyLmFkbWluIiwiYXV0aF90aW1lIjoxNjk5NDM4NDIwLCJleHAiOjE2OTk1MjQ4MjAsImlhdCI6MTY5OTQzODQyMCwianRpIjoiYjU0ZjRkM2UtY2JlYy00MDJiLTgxODgtYjhjOTQwM2FmOTE0IiwidXNlcm5hbWUiOiIzMTE5YjkyNi1lNzMwLTQyZjgtYmJiZC01MmFkOTg1NWQ3ZjQifQ.KYeO692dkqhlktA7_yOohzn1ToOLI9Xn2GqIfb577jAnvF1zPC8rrWWAP7zW18Fz7LR1jLOfrUk4nxdAkkxcrks6s8f-Hl9RIsMofe2CAfHmCNoN5beqHBLjnNz05VS8JVXJnYdj2Tt80fd0t75z2F3GCmwsMhHOlR8m6IMLGr2dsYssxgYBXnfKZmjoR2ntbYCNulbSSnYHIFTFtI0nNTFajkfE77NR02VDhj8GJKn0X5gSSXci06vSFsynLr4mkDWnwKGOGD9keQFVNWWa0tDrtio989cAgC6rkH9t0TW9lK6DaigItywu1KP9J6YHPaWFh4c0CDgL5SoIgVGqdw';
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
