import { BASE_URL } from '@/config';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Tags
export const TAGS = ['USERS', 'PLAN_MANEGEMENT'];

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  prepareHeaders: (headers) => {
    const token: string | null =
      'eyJraWQiOiJuRTJPbWRNU0xEUTdvVHQxbjc0bTVtTXNaU1loZFVvN2sweHNseDhZRjNJPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiJmYWM4YmE0YS1hMDc2LTQ5YjctYmU0Zi1mOTljYmJkYzQyNmYiLCJjb2duaXRvOmdyb3VwcyI6WyJTVVBFUl9BRE1JTiJdLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAuZXUtd2VzdC0yLmFtYXpvbmF3cy5jb21cL2V1LXdlc3QtMl9xM2RMVTZ6dksiLCJjbGllbnRfaWQiOiIzOGVsNTNhdG9zbGRxMnRpZ3ViN2Qxa3IzYyIsIm9yaWdpbl9qdGkiOiIwYWM5NzI1MS0wOWMxLTRhYjgtODUyMC0xZDQ0YmYzZDc1MmQiLCJldmVudF9pZCI6IjQ1NmM0ZDg0LTIxMjUtNDU5Zi05YjNjLTQ2ZTdjYmE0YjQ0MiIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoiYXdzLmNvZ25pdG8uc2lnbmluLnVzZXIuYWRtaW4iLCJhdXRoX3RpbWUiOjE2OTg4MTM0MTEsImV4cCI6MTY5ODgxNzAxMSwiaWF0IjoxNjk4ODEzNDExLCJqdGkiOiJhMjQwZTA0Yi1iZDg0LTRjZmQtOTIzNC04MzA0ZWZlYjczYTgiLCJ1c2VybmFtZSI6ImZhYzhiYTRhLWEwNzYtNDliNy1iZTRmLWY5OWNiYmRjNDI2ZiJ9.af5IAm8FmYk3_Z4YpQwgWGuD1AW5dRyPaYsZWEpLkCc5wCcvRaDAd-Nqvlyg4EInGeYiwWusOq4b0jd3rYGaSVWllXByBDJRjuMR30ILndb-dAIBFKOqDAP_DDGBdTaz6oy5uxzSquKlyQkMB-umCIE-DhvhwAqkXKDR4ImfUuTNALZJkCz_5PtQZWIeBV1osWYtW-NjNkNjG1Ni8xmTl6_oxrXp2_ClFvl8DYbzmkPOc0xhaGITTK8DAk4K7vr7HZrSTxQgpYnPlbcDH9enAuvx_zSgvjs37XzpTyaUreXp_fTN1czqVIcPqZ7nZekKKCUW-HY2_Lvlc341BNUknw';
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
