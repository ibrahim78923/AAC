import { BASE_URL } from '@/config';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Tags
export const TAGS = ['USERS', 'PLAN_MANEGEMENT'];

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  prepareHeaders: (headers) => {
    const token: string | null =
      'eyJraWQiOiJuRTJPbWRNU0xEUTdvVHQxbjc0bTVtTXNaU1loZFVvN2sweHNseDhZRjNJPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiJmYWM4YmE0YS1hMDc2LTQ5YjctYmU0Zi1mOTljYmJkYzQyNmYiLCJjb2duaXRvOmdyb3VwcyI6WyJTVVBFUl9BRE1JTiJdLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAuZXUtd2VzdC0yLmFtYXpvbmF3cy5jb21cL2V1LXdlc3QtMl9xM2RMVTZ6dksiLCJjbGllbnRfaWQiOiIzOGVsNTNhdG9zbGRxMnRpZ3ViN2Qxa3IzYyIsIm9yaWdpbl9qdGkiOiJlZDhmNmY1ZS05ODYzLTQ2NDctYmZkOS1kMDcwYTJlODRiODYiLCJldmVudF9pZCI6Ijc3Yzk5YjM1LWU1MmYtNDVjOC05NmI4LTE4M2Q5YmIzYWE1MCIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoiYXdzLmNvZ25pdG8uc2lnbmluLnVzZXIuYWRtaW4iLCJhdXRoX3RpbWUiOjE2OTkyNTE5OTgsImV4cCI6MTY5OTMzODM5OCwiaWF0IjoxNjk5MjUxOTk4LCJqdGkiOiIwNDUwODliOC0xN2E1LTQ2YWItYTA5ZS1mYjdmYWE1NGJlYzQiLCJ1c2VybmFtZSI6ImZhYzhiYTRhLWEwNzYtNDliNy1iZTRmLWY5OWNiYmRjNDI2ZiJ9.LskYkQrJnCXy2XsifkfaGU3xQpOuzxxBUPfhg_0QtRL_K-SAh1UO1rQfRq3ucTgrZBKQTwmP4FoOT07usFQ9SB-ekkkz0iOnoNfn6Us-8qmU8rGPpbt5J93lrBddQcchKmsGJwgvYWr3A2KJ1X2jdXprBVVxAlvbbgU4MmM_wTWP-QkvutBWjcsj9s5cm7IZS4zxkezkcpjBdmQaIr7kpvrFkmDBuFSnCtndklSdEtSdXMzShv5_l-UvP_r73-bm_tcE-_Ti6Ba8ZiS-ESWlCbxnRubfMhbpOoN9XG3dSADsEZXvFMus_14HzNT6SgPkMpoC9F8FZ7jaa5Rvv7oRiw';
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
