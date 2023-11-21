import { BASE_URL } from '@/config';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Tags
export const TAGS = ['USERS', 'PLAN_MANEGEMENT', 'SETTINGS_JOBS'];

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  prepareHeaders: (headers) => {
    const token: string | null =
      'eyJraWQiOiJuRTJPbWRNU0xEUTdvVHQxbjc0bTVtTXNaU1loZFVvN2sweHNseDhZRjNJPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiJhNzlkM2U4MC0zMTU1LTQxZGItOTJlZi1hZjI4ZGQ5ZWZiMTgiLCJjb2duaXRvOmdyb3VwcyI6WyJTVVBFUl9BRE1JTiJdLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAuZXUtd2VzdC0yLmFtYXpvbmF3cy5jb21cL2V1LXdlc3QtMl9xM2RMVTZ6dksiLCJjbGllbnRfaWQiOiIzOGVsNTNhdG9zbGRxMnRpZ3ViN2Qxa3IzYyIsIm9yaWdpbl9qdGkiOiIwMDQzYTFlNi1hN2YyLTQ2Y2UtYTM5NS1jZTFmNDczMDdhZmQiLCJldmVudF9pZCI6ImY0ZTEyNzI2LThkMjctNDgyYS05YmQ5LWZkMTJmN2Q0ZDIzNyIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoiYXdzLmNvZ25pdG8uc2lnbmluLnVzZXIuYWRtaW4iLCJhdXRoX3RpbWUiOjE3MDA1MzcwODMsImV4cCI6MTcwMDYyMzQ4MywiaWF0IjoxNzAwNTM3MDgzLCJqdGkiOiJkMDU2MGI3MC1kNjUxLTQ2NTItOTYzZS02Y2M3ZjhmOThhZjAiLCJ1c2VybmFtZSI6ImE3OWQzZTgwLTMxNTUtNDFkYi05MmVmLWFmMjhkZDllZmIxOCJ9.FE8s3PEzhFok_2PSHb7kAcr8odCaPsYVxOGYJdHBnBBKb4RPbXDGl_3_UUIYAdcXIeT6vUHUv8HD6-vx6FIXQ6_x3X6GxI-RqsphNw35SEI9IzWPKjQLQHgSmqw576n-0N41tZQMbb2a7kouU_wHbn5cwFqkgmHlym-oGeM1GnMCvI-_W1Wxm0MkfzEo9gJ5dcs7NwPDzK4zLJDNk6oHeWVIT04uXyxPn8FLrJA8h1Bf553qldwWTfspQJZTuzeI-Fsz5QIsBMXYDu_cbcK65BK7ltVtT1Q-NLZeYKd-G-1T5oLET4efV2dnPVi6I9Aw6a3x9fsnG8b8dCwjUf5AMw';
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
