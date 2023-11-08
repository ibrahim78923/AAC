import { BASE_URL } from '@/config';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Tags
export const TAGS = ['USERS', 'PLAN_MANEGEMENT'];

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  prepareHeaders: (headers) => {
    const token:
      | string
      | null = `eyJraWQiOiJuRTJPbWRNU0xEUTdvVHQxbjc0bTVtTXNaU1loZFVvN2sweHNseDhZRjNJPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiIzMTE5YjkyNi1lNzMwLTQyZjgtYmJiZC01MmFkOTg1NWQ3ZjQiLCJjb2duaXRvOmdyb3VwcyI6WyJPUkdfRU1QTE9ZRUUiXSwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLmV1LXdlc3QtMi5hbWF6b25hd3MuY29tXC9ldS13ZXN0LTJfcTNkTFU2enZLIiwiY2xpZW50X2lkIjoiMzhlbDUzYXRvc2xkcTJ0aWd1YjdkMWtyM2MiLCJvcmlnaW5fanRpIjoiODJjYzcyNWQtMGE0OC00ZWYzLThkYWItNWM0ODFlYWI2YWI4IiwiZXZlbnRfaWQiOiIyYzA1Yjg3Mi1kMDk2LTRlMDMtYjU0Ni1hMTg5MzBjOGZlNmMiLCJ0b2tlbl91c2UiOiJhY2Nlc3MiLCJzY29wZSI6ImF3cy5jb2duaXRvLnNpZ25pbi51c2VyLmFkbWluIiwiYXV0aF90aW1lIjoxNjk5NDUyMDA4LCJleHAiOjE2OTk1Mzg0MDcsImlhdCI6MTY5OTQ1MjAwOCwianRpIjoiMDcxN2JjMDctNWE2MS00YTIxLThjNGUtMTI0NjU0YjA2OTQwIiwidXNlcm5hbWUiOiIzMTE5YjkyNi1lNzMwLTQyZjgtYmJiZC01MmFkOTg1NWQ3ZjQifQ.mwU75_5viezvFeVmO9xjomxqApx1reaGYiwCWtsS6mieQ6m9H8wrvhE_0CRUa89RtkGN-CG6NcXUTDAN7hFSqJET4jJNtCGMWN79I_I2-8mx8iQMGgCK9zJcjCiAc3f3Ron0AgzogkkeTRUGWPehTZekWYpXLHU_rgu29IHCYJreR15W7VwitTOcQ97M4rz3B4tiQLi8NDErUeb6JfGq-XrUMa3_aO2rD3kyJMKQBhEAxcuFKVHcydWpK0qW5IVGHm9kTOwCnn9BQiec6utPQxra_sRM8p7GeQF57IjjjldVeaLvIFZt1FqvJ4ntmkZp-yui8V3xnNesZf-Hc-Zg4w`;
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
