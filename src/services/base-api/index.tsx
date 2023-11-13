import { BASE_URL } from '@/config';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Tags
export const TAGS = ['USERS', 'PLAN_MANEGEMENT', 'TICKETS'];

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  prepareHeaders: (headers) => {
    const token:
      | string
      | null = `eyJraWQiOiJuRTJPbWRNU0xEUTdvVHQxbjc0bTVtTXNaU1loZFVvN2sweHNseDhZRjNJPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiIzMTE5YjkyNi1lNzMwLTQyZjgtYmJiZC01MmFkOTg1NWQ3ZjQiLCJjb2duaXRvOmdyb3VwcyI6WyJPUkdfRU1QTE9ZRUUiXSwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLmV1LXdlc3QtMi5hbWF6b25hd3MuY29tXC9ldS13ZXN0LTJfcTNkTFU2enZLIiwiY2xpZW50X2lkIjoiMzhlbDUzYXRvc2xkcTJ0aWd1YjdkMWtyM2MiLCJvcmlnaW5fanRpIjoiMTBmMGFmMmItYjE4ZS00Zjg0LWJjZjMtODU5ZDA1OTVlNTNjIiwiZXZlbnRfaWQiOiJlMWY3YzJmZi1mYmQ5LTQ2MTctYTJmMS0xMmE1YThkNzAzNTkiLCJ0b2tlbl91c2UiOiJhY2Nlc3MiLCJzY29wZSI6ImF3cy5jb2duaXRvLnNpZ25pbi51c2VyLmFkbWluIiwiYXV0aF90aW1lIjoxNjk5ODQ5MTI3LCJleHAiOjE2OTk5MzU1MjcsImlhdCI6MTY5OTg0OTEyNywianRpIjoiZjBkNzk1N2YtMGJiNi00NGViLWIzNDYtNTM5NGVlZWEzYzQ3IiwidXNlcm5hbWUiOiIzMTE5YjkyNi1lNzMwLTQyZjgtYmJiZC01MmFkOTg1NWQ3ZjQifQ.XhExvpxUzZDyNwN6wY3qALQ0XmDLhxjQhpjrL7wNuOJDJzWjQuJwDpgGxrcd3EZH-cR-r23miXLvJCh1vjqBDnAYcDKpu4fRICZfiagQOaPJmO54TS5NAXGOoV8PI1kOlQ0dPfLLTLdXK_SMFvqe6qwa3MLRFpVJEryATYUdjvYoWkwGiH6FCRtBcD3byCAd5y2HsEh8lPMCCov2SiYOR3gyG_j0L2QTnNXhpFu9OIYA38f87oGDa448j48u08IyFfArlIdtdUtxL8NWGA59L46KcVEBfsxAW2D1rKBXr4ATkyDzIMEnixRCRIVOKT4y0xjKiKTbkOdwbNnv1iURjA`;
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
