import { BASE_URL } from '@/config';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Tags
export const TAGS = ['USERS', 'PLAN_MANEGEMENT'];

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  prepareHeaders: (headers) => {
    const token: string | null =
      'eyJraWQiOiJuRTJPbWRNU0xEUTdvVHQxbjc0bTVtTXNaU1loZFVvN2sweHNseDhZRjNJPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiJmYWM4YmE0YS1hMDc2LTQ5YjctYmU0Zi1mOTljYmJkYzQyNmYiLCJjb2duaXRvOmdyb3VwcyI6WyJTVVBFUl9BRE1JTiJdLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAuZXUtd2VzdC0yLmFtYXpvbmF3cy5jb21cL2V1LXdlc3QtMl9xM2RMVTZ6dksiLCJjbGllbnRfaWQiOiIzOGVsNTNhdG9zbGRxMnRpZ3ViN2Qxa3IzYyIsIm9yaWdpbl9qdGkiOiJiYjkwYTA0ZS0xNzdkLTQyODMtYmUzMy0zODNiZDVhNjYwZjUiLCJldmVudF9pZCI6IjdmMTZhNmIyLWUwOTQtNGZkNS05YTBhLTI1ZmE4ZGQwY2ViNyIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoiYXdzLmNvZ25pdG8uc2lnbmluLnVzZXIuYWRtaW4iLCJhdXRoX3RpbWUiOjE2OTk4NTg3MDYsImV4cCI6MTY5OTk0NTEwNiwiaWF0IjoxNjk5ODU4NzA2LCJqdGkiOiJhY2NjMjQyNC04MDhiLTQ5MWQtYmM3Zi05OTAzYjRjNTMwNzQiLCJ1c2VybmFtZSI6ImZhYzhiYTRhLWEwNzYtNDliNy1iZTRmLWY5OWNiYmRjNDI2ZiJ9.OZbqwd7Wrt1E79ipJALhV930Ggy2FCS960vJVZ0gOOTqtm1eYT9RQb66C4F77aWyoqiIkKm831MF1ZQdx9kNdqXi4__43A5pndO49AivPk0sgN341w7QzDsBMF8I2_xKutUbk8cYr1PBWXJV9fNw5jEuQQAGVi1HeV0z8jfbibQ5Ylh52S_0uUxCfBLpg1b2vyuz4tWG2EJBeJVuRDE0Fw9LU-3l_ue_s_4Y40NNz_5SQElRk-pRqvsQW8F_gsJzVaBnElVN6VI70qhLcIRMsPFoYhor52V0wMqmy7ljZkEuXltJbCTUjuRyNpamqaTEtnbGT5aTezAFx512JUF0sg';
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
