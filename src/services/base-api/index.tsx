import { BASE_URL } from '@/config';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Tags
export const TAGS = ['USERS', 'PLAN_MANEGEMENT'];

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  prepareHeaders: (headers) => {
    const token:
      | string
      | null = `eyJraWQiOiJuRTJPbWRNU0xEUTdvVHQxbjc0bTVtTXNaU1loZFVvN2sweHNseDhZRjNJPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiIzMTE5YjkyNi1lNzMwLTQyZjgtYmJiZC01MmFkOTg1NWQ3ZjQiLCJjb2duaXRvOmdyb3VwcyI6WyJPUkdfRU1QTE9ZRUUiXSwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLmV1LXdlc3QtMi5hbWF6b25hd3MuY29tXC9ldS13ZXN0LTJfcTNkTFU2enZLIiwiY2xpZW50X2lkIjoiMzhlbDUzYXRvc2xkcTJ0aWd1YjdkMWtyM2MiLCJvcmlnaW5fanRpIjoiY2NmMjA2ZDEtMDIwYi00N2NiLWI1YjItNWNlODFmYzA4NzM3IiwiZXZlbnRfaWQiOiIxMjBhZTBlNi0zM2NhLTQyYjgtYmNlOS1mNGQzNTZkNWYzYjEiLCJ0b2tlbl91c2UiOiJhY2Nlc3MiLCJzY29wZSI6ImF3cy5jb2duaXRvLnNpZ25pbi51c2VyLmFkbWluIiwiYXV0aF90aW1lIjoxNjk5NTUyMDkzLCJleHAiOjE2OTk2Mzg0OTMsImlhdCI6MTY5OTU1MjA5MywianRpIjoiZjc0OWZhMzUtZmQ1Mi00ZjMwLTlmZmEtODkyZjQ0M2UzNDkyIiwidXNlcm5hbWUiOiIzMTE5YjkyNi1lNzMwLTQyZjgtYmJiZC01MmFkOTg1NWQ3ZjQifQ.qNDGeVb-paNFbkRkOuxg3-EYSufPpTL_8qjft8_9snvq0CltD-c1Pp73GzMqIIoe7D8QYWGx3IUvbarZzo_dRmDdZFqbBqX1O14iy43gYTjuHk2k836x2o60V4XGVHhhYEtfTfa2HcqNXQHKxMbCKbA7o1Z9YhWG60vExm0C3BKmDUNmPQOpy3aE4Fm9gkMT2TIFkq3IUgGXv3Duq1NvUhdpiS9isdwsVrnzoogIzJDRJhczFutmavo-c3hmKRzcrbeACGjWNKOV6ejAkm0f7OxXyPyRgr8lSOboBpbjcqmVZ66CwaDXkb4ix0_9cFRmt1xLW9qq5gAfUg7OiGFt1A`;
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
