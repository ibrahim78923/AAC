import { BASE_URL } from '@/config';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Tags
export const TAGS = ['USERS', 'PLAN_MANEGEMENT', 'WORKLOAD'];

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  prepareHeaders: (headers) => {
    const token: string | null =
      'eyJraWQiOiJuRTJPbWRNU0xEUTdvVHQxbjc0bTVtTXNaU1loZFVvN2sweHNseDhZRjNJPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiIzMTE5YjkyNi1lNzMwLTQyZjgtYmJiZC01MmFkOTg1NWQ3ZjQiLCJjb2duaXRvOmdyb3VwcyI6WyJPUkdfRU1QTE9ZRUUiXSwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLmV1LXdlc3QtMi5hbWF6b25hd3MuY29tXC9ldS13ZXN0LTJfcTNkTFU2enZLIiwiY2xpZW50X2lkIjoiMzhlbDUzYXRvc2xkcTJ0aWd1YjdkMWtyM2MiLCJvcmlnaW5fanRpIjoiOGU4ZDNiMTgtMWE2My00OGEyLWI4NTMtY2VjZWZiYmJiZDA4IiwiZXZlbnRfaWQiOiJiMTAxN2U0MC1iNjZjLTRlZTctOTAwOC0zNTUyNGYwYTE5YjUiLCJ0b2tlbl91c2UiOiJhY2Nlc3MiLCJzY29wZSI6ImF3cy5jb2duaXRvLnNpZ25pbi51c2VyLmFkbWluIiwiYXV0aF90aW1lIjoxNjk5NjE2NTgyLCJleHAiOjE2OTk3MDI5ODIsImlhdCI6MTY5OTYxNjU4MiwianRpIjoiN2Q1MGY0Y2EtYzcwNi00ZWRkLTlhZTItYTM4ZDdhMmIzZmU3IiwidXNlcm5hbWUiOiIzMTE5YjkyNi1lNzMwLTQyZjgtYmJiZC01MmFkOTg1NWQ3ZjQifQ.faWAfMXXaGUX31jVK0ghKiJuJMZGnskfHql5siQ-oJeHZCukmzAiTVyC30MFInoCwmskZ9gzzHdpGZwrfAcVeiJjCKEyKUCSDqprnr-2IlLJjEk2sLPlwQ2UfTUJw0xQQeeJ3cR7E7C_nnZLgy5VnUkL-Ed8T_74IFrynal1TkTc6HQvl6ASxpVYuU-W6RCdkL1RW9XjSpJBZj4NZ5HycBOw5ynlY0JR532QL1xTWWan5v7tTrkEtJBVxA5GJcYkorbhJaLW0a83Of2dNgkGcsCcKJXAdxHioy9CEVw0taLEcbBfixBGkESr12EKAdB0vBAvQKzwI2nfbdDEkhGnkg';
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
