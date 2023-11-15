import { BASE_URL } from '@/config';

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Tags
export const TAGS = [
  'USERS',
  'PLAN_MANEGEMENT',
  'WORKLOAD',
  'DROPDOWNS',
  'Organization',
  'TICKETS',
];

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  prepareHeaders: (headers) => {
    const token: string | null =
      'eyJraWQiOiJuRTJPbWRNU0xEUTdvVHQxbjc0bTVtTXNaU1loZFVvN2sweHNseDhZRjNJPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiIzMTE5YjkyNi1lNzMwLTQyZjgtYmJiZC01MmFkOTg1NWQ3ZjQiLCJjb2duaXRvOmdyb3VwcyI6WyJPUkdfRU1QTE9ZRUUiXSwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLmV1LXdlc3QtMi5hbWF6b25hd3MuY29tXC9ldS13ZXN0LTJfcTNkTFU2enZLIiwiY2xpZW50X2lkIjoiMzhlbDUzYXRvc2xkcTJ0aWd1YjdkMWtyM2MiLCJvcmlnaW5fanRpIjoiZWE0NmQwZTgtZmNmNi00YTc4LWI0NDQtZTI5MjI1OWE5NDk5IiwiZXZlbnRfaWQiOiIxNTU5MzliMC1kN2UzLTRlYWUtOTE5NS03MzdkZDJjN2M5OGIiLCJ0b2tlbl91c2UiOiJhY2Nlc3MiLCJzY29wZSI6ImF3cy5jb2duaXRvLnNpZ25pbi51c2VyLmFkbWluIiwiYXV0aF90aW1lIjoxNzAwMDQ4ODM3LCJleHAiOjE3MDAxMzUyMzYsImlhdCI6MTcwMDA0ODgzNywianRpIjoiY2YyMzQ1OTQtMTE3ZS00YTQ2LWFkNzQtMGEwMDMzN2MxOGNkIiwidXNlcm5hbWUiOiIzMTE5YjkyNi1lNzMwLTQyZjgtYmJiZC01MmFkOTg1NWQ3ZjQifQ.NY6apL77S5EF-hMdpVDxSlkuUCrJ7jZG9Nxk0yiTWFq_5x2yJ8i6BaN8AMpPb-ZuaWQWAaoBKvg5N-FKGsbGVdZlaU7aJhroELs9SOSfy65ZjeZWSa0QcIiNFlU8tzqYLI2vCZrU6mjSGWWjaeVj9cmn9zz3wvhI8dMBVZxXGoXGzZ7r5V1S-rZtalY4UNFrPC5afceEVzx27pSTFULrKEgHh5EadNB22N_aEA_hjbelbzcoxH_L0gNzD83VS1LFUCzSp5yiygQa1jms-n9y7lHos1ZgpCKb9fWrpEyyYE2ejUQgUQGe9QlykF4S21Ds0tv61PVxziBwLkXinFstaQ';

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
