import { BASE_URL } from '@/config';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Tags
export const TAGS = ['USERS', 'PLAN_MANEGEMENT', 'SETTINGS_JOBS'];

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  prepareHeaders: (headers) => {
    const token: string | null =
      'eyJraWQiOiJuRTJPbWRNU0xEUTdvVHQxbjc0bTVtTXNaU1loZFVvN2sweHNseDhZRjNJPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiJhNzlkM2U4MC0zMTU1LTQxZGItOTJlZi1hZjI4ZGQ5ZWZiMTgiLCJjb2duaXRvOmdyb3VwcyI6WyJTVVBFUl9BRE1JTiJdLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAuZXUtd2VzdC0yLmFtYXpvbmF3cy5jb21cL2V1LXdlc3QtMl9xM2RMVTZ6dksiLCJjbGllbnRfaWQiOiIzOGVsNTNhdG9zbGRxMnRpZ3ViN2Qxa3IzYyIsIm9yaWdpbl9qdGkiOiI1YTUwZDgzMy0yMjk0LTRlZTEtOTZiYy00YTQ3YzRlNTI2MTAiLCJldmVudF9pZCI6IjBiZTIwMDBiLWJiOGEtNDQyZS04NjE0LTkxNjcwOTdmMmUzNyIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoiYXdzLmNvZ25pdG8uc2lnbmluLnVzZXIuYWRtaW4iLCJhdXRoX3RpbWUiOjE2OTk4ODMzNTAsImV4cCI6MTY5OTk2OTc1MCwiaWF0IjoxNjk5ODgzMzUwLCJqdGkiOiJhMjg2YmMwZi02MGMyLTQ3ZGItYmZjMS04MDA4YzQ0YmYyMTIiLCJ1c2VybmFtZSI6ImE3OWQzZTgwLTMxNTUtNDFkYi05MmVmLWFmMjhkZDllZmIxOCJ9.aZqQDonDp5Z8LVVluzoxpBkoEUdqSfEYbIt6zg71ksl8Mqvpr8GkLAzi2gMkkGD1auERm7DS2ov5uJYMRo6RUyBBRks5AqlbCi6q_CzqOjtXxTjKrK-2ubajcpvLOwZTxDf_9CsRBvsPZTyb6jw7vnmDGN4Zhw6NtHJKyf5KXg1vp5c4UK0IybmxONKFGjE92QNz12FvONR0SM05efKL-f29ImOVbA9a2EDWomoNv410VqeQEpEhYnQwkhZ3E2XMO7dFqg-LJ3pxkZvMZ5S6a75L2hbZAwx5C7r_6bKxq2D9tekzWCfFzYXsesCzfm8Yt7MERv7Zl4CifODQ-MkB-w';
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
