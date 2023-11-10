import { BASE_URL } from '@/config';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Tags
export const TAGS = ['USERS', 'PLAN_MANEGEMENT'];

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  prepareHeaders: (headers) => {
    const token:
      | string
      | null = `eyJraWQiOiJuRTJPbWRNU0xEUTdvVHQxbjc0bTVtTXNaU1loZFVvN2sweHNseDhZRjNJPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiIzMTE5YjkyNi1lNzMwLTQyZjgtYmJiZC01MmFkOTg1NWQ3ZjQiLCJjb2duaXRvOmdyb3VwcyI6WyJPUkdfRU1QTE9ZRUUiXSwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLmV1LXdlc3QtMi5hbWF6b25hd3MuY29tXC9ldS13ZXN0LTJfcTNkTFU2enZLIiwiY2xpZW50X2lkIjoiMzhlbDUzYXRvc2xkcTJ0aWd1YjdkMWtyM2MiLCJvcmlnaW5fanRpIjoiMDBjYmVmOTYtNGJiNC00ZDRhLWI3NjItOTIyMTAxYWQwOGNhIiwiZXZlbnRfaWQiOiI1MGIyMjM2Yy1mNzE4LTQwODEtOWMxNi02YjkwMGM5YTBkMWEiLCJ0b2tlbl91c2UiOiJhY2Nlc3MiLCJzY29wZSI6ImF3cy5jb2duaXRvLnNpZ25pbi51c2VyLmFkbWluIiwiYXV0aF90aW1lIjoxNjk5NjMwOTM4LCJleHAiOjE2OTk3MTczMzgsImlhdCI6MTY5OTYzMDkzOCwianRpIjoiYzBjOGVlYzYtM2E5NS00ZGE2LTkwZmItYzM0YThkNWIzNWZmIiwidXNlcm5hbWUiOiIzMTE5YjkyNi1lNzMwLTQyZjgtYmJiZC01MmFkOTg1NWQ3ZjQifQ.bQNxJ6mFY2QLk2fGzS-6wVJjybF87LcmANJfFSsg_1k5ovIjIUB7q6oEqcqFfYt2HB2E5jeHNes19uLHcIHtSRf2YbG0CmZDL7fYZfwBcc0wurogqe4KTpBCKjxIp0gv1EbEWshK0y5hCPTqSoTjGIWMy8NkF3qpxClPT038N0aKhisfg09WJ-oa283DPOFLFVS40LRZb9prHAEjrDgHLtXZxai7WFEP8UY81KSZhYhi2nLpV341A3UiMB09kwQ6ckC5-pmppV5O3qPbKpEnDHPA04ECZfG9c-60cypkcoHH8LBegEylJM9Y3lHrLVPe-wIChiu4D_pQIgHutJOhzA`;
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
