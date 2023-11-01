import { BASE_URL } from '@/config';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Tags
export const TAGS = ['USERS', 'PLAN_MANEGEMENT'];

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  prepareHeaders: (headers) => {
    const token: string | null =
      'eyJraWQiOiJuRTJPbWRNU0xEUTdvVHQxbjc0bTVtTXNaU1loZFVvN2sweHNseDhZRjNJPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiJmYWM4YmE0YS1hMDc2LTQ5YjctYmU0Zi1mOTljYmJkYzQyNmYiLCJjb2duaXRvOmdyb3VwcyI6WyJTVVBFUl9BRE1JTiJdLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAuZXUtd2VzdC0yLmFtYXpvbmF3cy5jb21cL2V1LXdlc3QtMl9xM2RMVTZ6dksiLCJjbGllbnRfaWQiOiIzOGVsNTNhdG9zbGRxMnRpZ3ViN2Qxa3IzYyIsIm9yaWdpbl9qdGkiOiIzNjhlNmIzNC0zM2ViLTQyNWItOTYzNC00M2YzOWJkOWVhY2IiLCJldmVudF9pZCI6IjNiZDdhYTRhLWUwN2EtNGQxNy05ODA2LWJlYTRhMzhlM2EwMCIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoiYXdzLmNvZ25pdG8uc2lnbmluLnVzZXIuYWRtaW4iLCJhdXRoX3RpbWUiOjE2OTg4MzUzODUsImV4cCI6MTY5ODkyMTc4NSwiaWF0IjoxNjk4ODM1Mzg1LCJqdGkiOiI1YzY5ZGRiNC04MjI5LTQyNjItYjU3OS1kYzQ0ZmJiM2QwMWEiLCJ1c2VybmFtZSI6ImZhYzhiYTRhLWEwNzYtNDliNy1iZTRmLWY5OWNiYmRjNDI2ZiJ9.TX5LtvVQWYYP5yAAmrCpjC0Bd1Q64mwoz8o32aeKWxojHLfvcNSmj65iY94gdm69R-FZILnfmn5d9-G5S1q1_5pJsGaMHuAGEmC0kJ8nFLPpAnrDITA5BvPmqkkZATRCYzbvLWyKbtmjNysLbauLvgorsfEcFkcIdjURtm9zrWwMZnm2qLyhYHHsvM5cqxj9vYzTiMsRTHpWC_zd_P9L9LTPAqDkHfrXoXD9UPWPIYdzqhC4_txX6uafyxJkwlcwQyf20JSjG97-RaZVQ4uj9vIGHrQi1Tea_f7qXxpgMjQGmP_geWzyigM2XrIRYmLS5fpNpu6wiHhpcjMXqoWfjw';
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
