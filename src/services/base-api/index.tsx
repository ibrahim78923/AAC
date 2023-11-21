import { BASE_URL } from '@/config';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Tags
export const TAGS = ['USERS', 'PLAN_MANEGEMENT', 'SETTINGS_JOBS'];

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  prepareHeaders: (headers) => {
    const token: string | null =
      'eyJraWQiOiJuRTJPbWRNU0xEUTdvVHQxbjc0bTVtTXNaU1loZFVvN2sweHNseDhZRjNJPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiJhNzlkM2U4MC0zMTU1LTQxZGItOTJlZi1hZjI4ZGQ5ZWZiMTgiLCJjb2duaXRvOmdyb3VwcyI6WyJTVVBFUl9BRE1JTiJdLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAuZXUtd2VzdC0yLmFtYXpvbmF3cy5jb21cL2V1LXdlc3QtMl9xM2RMVTZ6dksiLCJjbGllbnRfaWQiOiIzOGVsNTNhdG9zbGRxMnRpZ3ViN2Qxa3IzYyIsIm9yaWdpbl9qdGkiOiIxZWUyMTRhMC0wYWVhLTRmMGUtOWE2NS04M2Y0NjdiZmVlMDkiLCJldmVudF9pZCI6ImU2ZjczNGZlLWZlMjItNDY0Ny1hYjgxLWI4YjI0ZDJjMzVjNiIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoiYXdzLmNvZ25pdG8uc2lnbmluLnVzZXIuYWRtaW4iLCJhdXRoX3RpbWUiOjE3MDA1Nzc1NDUsImV4cCI6MTcwMDY2Mzk0NSwiaWF0IjoxNzAwNTc3NTQ1LCJqdGkiOiIxY2IyMDc5ZS1hMzRkLTRjZTYtYWM5ZC0zNjJjMGYzYTBhN2EiLCJ1c2VybmFtZSI6ImE3OWQzZTgwLTMxNTUtNDFkYi05MmVmLWFmMjhkZDllZmIxOCJ9.qPF3PVoSggf_5JVbF48CQLS8tujLUk-nyvM11me6r0TUp1oKIoQReZhbBI3rvfqT0vCVISban9b-mMLSDe-BYCW7ZQq9LY-RhDCqZoWS-hCHNQMo33V90zxP98WAcKvn-B1rbweRXe1kvKtycc-qvhEdSiyahJngzjMXhxkricY3gFb4JvdWERC05iDZqjb9-WbPQRymsKBsgOrUiTakaR6WtzAcwUibYkX5u0ZBd1zxgAoMgOaFihg8ruTE_weO6Oj1Lk-eMR9GsuT5CvH9pFYgiJVu9g_eorB_pRN7duM2axC8DhD1NkUiF99P4LxT_kTkSDRFGX39AXkqmN6JNA';
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
