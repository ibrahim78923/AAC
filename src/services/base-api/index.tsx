import { BASE_URL } from '@/config';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Tags
export const TAGS = ['USERS', 'PLAN_MANEGEMENT', 'Organization'];

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  prepareHeaders: (headers) => {
    const token: string | null =
      'eyJraWQiOiJuRTJPbWRNU0xEUTdvVHQxbjc0bTVtTXNaU1loZFVvN2sweHNseDhZRjNJPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiI5MTA3NzA1Ny0zZGM4LTRhYWMtOTgwZi0xOTRjNGU1ODNhMDIiLCJjb2duaXRvOmdyb3VwcyI6WyJPUkdfQURNSU4iXSwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLmV1LXdlc3QtMi5hbWF6b25hd3MuY29tXC9ldS13ZXN0LTJfcTNkTFU2enZLIiwiY2xpZW50X2lkIjoiMzhlbDUzYXRvc2xkcTJ0aWd1YjdkMWtyM2MiLCJvcmlnaW5fanRpIjoiOGUzZDQzZjAtMmU2MS00Njg1LWE4NjMtY2U2ZTFhODI4OGUyIiwiZXZlbnRfaWQiOiI4MTc3OTExZi0zNWQ0LTQ2YzMtYjY0YS03NDEyMmQ3MWZkMWIiLCJ0b2tlbl91c2UiOiJhY2Nlc3MiLCJzY29wZSI6ImF3cy5jb2duaXRvLnNpZ25pbi51c2VyLmFkbWluIiwiYXV0aF90aW1lIjoxNzAwMDM0OTY4LCJleHAiOjE3MDAxMjEzNjgsImlhdCI6MTcwMDAzNDk2OCwianRpIjoiOWEzYjRlYmQtZmM4ZS00NDU2LWFkNjctZDk2OGZkYjcyZjM0IiwidXNlcm5hbWUiOiI5MTA3NzA1Ny0zZGM4LTRhYWMtOTgwZi0xOTRjNGU1ODNhMDIifQ.lsXFn2X2MdDgxPqSqg9s2ylMABvUDWVFROzXoRqkVPrp_UgXTrIBqU0x8TIYCdtGBZICLpScxBrpbCPSG3qgqVrCGxGdcNm5C59DtQzKsWOv5loH0aryaf1ZLZH1HR9EgB5EwlKFplO80092fGGWHYKt7xnlB4STNsBRRC2mXTrw3Ku-gfIOIXMyqZ8VIftTSxAaz8mRqWhQUfsa1a0jK3c9yEvq5nmAx6AXcRqI5vS-j5mmeinOUu1BFaTgZtPq4LGpjtIhGVJ-zKXKo_2bArQRP0DCwHf2B_Rr-JmpAmysr4QngEaXn8or7ZOBe5Z3SPFomrZMwmEK8CgmuP-WRQ';
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
