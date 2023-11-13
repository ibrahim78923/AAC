import { BASE_URL } from '@/config';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Tags
export const TAGS = ['USERS', 'PLAN_MANEGEMENT', 'Organization'];

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  prepareHeaders: (headers) => {
    const token: string | null =
      'eyJraWQiOiJuRTJPbWRNU0xEUTdvVHQxbjc0bTVtTXNaU1loZFVvN2sweHNseDhZRjNJPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiJmYWM4YmE0YS1hMDc2LTQ5YjctYmU0Zi1mOTljYmJkYzQyNmYiLCJjb2duaXRvOmdyb3VwcyI6WyJTVVBFUl9BRE1JTiJdLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAuZXUtd2VzdC0yLmFtYXpvbmF3cy5jb21cL2V1LXdlc3QtMl9xM2RMVTZ6dksiLCJjbGllbnRfaWQiOiIzOGVsNTNhdG9zbGRxMnRpZ3ViN2Qxa3IzYyIsIm9yaWdpbl9qdGkiOiIxOTgwNzU0MC00NDBiLTQ1ZGYtOWY2My0zNGUwZTkwZmU0NzMiLCJldmVudF9pZCI6IjgxNTc4NjYzLWI3YWEtNDYxZC05MThiLTcyYmZjOTEwMzdhOCIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoiYXdzLmNvZ25pdG8uc2lnbmluLnVzZXIuYWRtaW4iLCJhdXRoX3RpbWUiOjE2OTg5ODI5OTksImV4cCI6MTY5OTA2OTM5OCwiaWF0IjoxNjk4OTgyOTk5LCJqdGkiOiI5ODY1MzMzMi0yYWQyLTQ3MmMtYmE5Ny0yZWU2N2Y2YjRhNjMiLCJ1c2VybmFtZSI6ImZhYzhiYTRhLWEwNzYtNDliNy1iZTRmLWY5OWNiYmRjNDI2ZiJ9.P4vbbBgHUvO_hXsrh-FH3Sjfz2vyRtf0wDG2MGjUZXNkD_0f8QqYELNQq1t3Ws7Etq7phXKQrBJGzFdlvn6zqAZUnLPs-3E5DbqWUs9PLUZBm1WTFfiiAPi01zfWF9Z5tP7kKLhOBbo2Tdgag2qM_bSTv_sTkXJrrPguGJnMJxgtaU9l1Oweg9bYj8EoGammQr6RaAskM7zYNP20dSLo18qaV_QCYo7RLE5v3OVY92Y5hQFieV_IZri7hNTTq4sAUCSRzm7u7vrbgqEh-EEeCQuzq8vRzLa4MnbXMkwyMiWJLmuVTeQwT8VrVUiaH-c_sz4e4-U5Yw3sYI2b6innNA';

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
