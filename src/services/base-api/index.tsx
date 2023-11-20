import { BASE_URL } from '@/config';

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Tags
export const TAGS = ['USERS', 'PLAN_MANEGEMENT', 'Organization'];

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState)?.auth?.accessToken;
    // const token: string | null =
    //   'eyJraWQiOiJuRTJPbWRNU0xEUTdvVHQxbjc0bTVtTXNaU1loZFVvN2sweHNseDhZRjNJPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiJmYWM4YmE0YS1hMDc2LTQ5YjctYmU0Zi1mOTljYmJkYzQyNmYiLCJjb2duaXRvOmdyb3VwcyI6WyJTVVBFUl9BRE1JTiJdLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAuZXUtd2VzdC0yLmFtYXpvbmF3cy5jb21cL2V1LXdlc3QtMl9xM2RMVTZ6dksiLCJjbGllbnRfaWQiOiIzOGVsNTNhdG9zbGRxMnRpZ3ViN2Qxa3IzYyIsIm9yaWdpbl9qdGkiOiJlNGJjZTAwZS0xMjcwLTQ1ZWMtYjVjZi1iYmZmMmIzOWMwYjUiLCJldmVudF9pZCI6IjQxNTZmYzRmLThmYWEtNGNlOS1iYjc4LTdlNzEyZjA2NTBmNCIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoiYXdzLmNvZ25pdG8uc2lnbmluLnVzZXIuYWRtaW4iLCJhdXRoX3RpbWUiOjE3MDA0NTA2MDAsImV4cCI6MTcwMDUzNzAwMCwiaWF0IjoxNzAwNDUwNjAwLCJqdGkiOiJjMDc1YmNhYS05Y2YzLTRjOTAtYjc4MS1lNTYxYWZjOWJhMzQiLCJ1c2VybmFtZSI6ImZhYzhiYTRhLWEwNzYtNDliNy1iZTRmLWY5OWNiYmRjNDI2ZiJ9.kwKOPUwHLGaI5ooeUXlTZNAgKWqNOjHozZS4aKQ-jO5LBRYxH8646Mhi7ozZVztiNnuPwjcrPMROGwSgp73Ni_cD0p5A942oJPIHyBJOVaL_aH0U6ex2d6cz5i0jWDuasZN6iVPTzC6jc-mkIXaggYtZgYQ0N59rqsNXjVK78Urv5WhlGKAJIgq2xe2QY6SKk12n_t0ToCvyzVNoD1KkVze2MD3lijxJQ6cmHMkBm4kK164m4rOziYm0u7JnlSqxauGJjL-CTZcYPvsRjTAjG2OoZ3IP7iMqoAy-raC6Yv79WJgJo_3mQeXTGKQR8cq-9i_9gVyO5ziycj2aHtyZZg';
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
