import { BASE_URL } from '@/config';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Tags
export const TAGS = ['USERS', 'PLAN_MANEGEMENT'];

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  prepareHeaders: (headers) => {
    const token: string | null =
      'eyJraWQiOiJuRTJPbWRNU0xEUTdvVHQxbjc0bTVtTXNaU1loZFVvN2sweHNseDhZRjNJPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiJmYWM4YmE0YS1hMDc2LTQ5YjctYmU0Zi1mOTljYmJkYzQyNmYiLCJjb2duaXRvOmdyb3VwcyI6WyJTVVBFUl9BRE1JTiJdLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAuZXUtd2VzdC0yLmFtYXpvbmF3cy5jb21cL2V1LXdlc3QtMl9xM2RMVTZ6dksiLCJjbGllbnRfaWQiOiIzOGVsNTNhdG9zbGRxMnRpZ3ViN2Qxa3IzYyIsIm9yaWdpbl9qdGkiOiI4ZTg2YTQxYi04Zjg2LTQ4YzctYjc3Zi03OGZmYjU3MjI5OTciLCJldmVudF9pZCI6IjRiYzc2MzgyLTFiMDAtNGM4Ny04ZmUyLWU0ZjZiM2JmZWVhNCIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoiYXdzLmNvZ25pdG8uc2lnbmluLnVzZXIuYWRtaW4iLCJhdXRoX3RpbWUiOjE2OTg5MTg5MTQsImV4cCI6MTY5OTAwNTMxMywiaWF0IjoxNjk4OTE4OTE0LCJqdGkiOiI5ZjU5ZGIzZS0zYjg0LTQ4MDItYjNkMC0xYmUyZTcxODNiOTQiLCJ1c2VybmFtZSI6ImZhYzhiYTRhLWEwNzYtNDliNy1iZTRmLWY5OWNiYmRjNDI2ZiJ9.AjjuERJDZ9po_6EpUqiVPmchwdD_D4d4IaecpknwIpnvScKcLgOZFdjXZI_8GSQlb4wxGTobEBb4eI6S-LVDH3a8UlIBu-pu86t77cz3i7K3slesuPhhsc2bnsXNnN4Z2dig0LiN4vjafB-NoYYJojKRM5rQCtDXNltjAdggQMmqRLWZcQxUbpap--NIJW6qNR-A2N2eK_mE-tFnGDPj5n36RYuP1fi9IUkiZ-fNw2zv-Pt2jPPXCdhF4hIQIsvIi8eOdkD2wdAIq56lKBCacirnbwKRu_JLAPMZPDFBBEDAnhSvA72bjKmjHi9Uy4NxOlJltgQAjFElMREKObi2og';
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
