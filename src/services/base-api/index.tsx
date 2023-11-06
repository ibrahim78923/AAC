import { BASE_URL } from '@/config';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Tags
export const TAGS = ['USERS', 'PLAN_MANEGEMENT'];

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  prepareHeaders: (headers) => {
    const token: string | null =
      'eyJraWQiOiJuRTJPbWRNU0xEUTdvVHQxbjc0bTVtTXNaU1loZFVvN2sweHNseDhZRjNJPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiJmYWM4YmE0YS1hMDc2LTQ5YjctYmU0Zi1mOTljYmJkYzQyNmYiLCJjb2duaXRvOmdyb3VwcyI6WyJTVVBFUl9BRE1JTiJdLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAuZXUtd2VzdC0yLmFtYXpvbmF3cy5jb21cL2V1LXdlc3QtMl9xM2RMVTZ6dksiLCJjbGllbnRfaWQiOiIzOGVsNTNhdG9zbGRxMnRpZ3ViN2Qxa3IzYyIsIm9yaWdpbl9qdGkiOiI2NTEyYjhhNS1mYjAxLTQ3ZjItODY1Ni03MjUxMjhjMTJlODMiLCJldmVudF9pZCI6ImU5MWU4ZjBiLTMxMmYtNDRiYi05MGU5LTcyYjIzNmRhNjA0OCIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoiYXdzLmNvZ25pdG8uc2lnbmluLnVzZXIuYWRtaW4iLCJhdXRoX3RpbWUiOjE2OTkyNDEzNjUsImV4cCI6MTY5OTMyNzc2NSwiaWF0IjoxNjk5MjQxMzY1LCJqdGkiOiI5NDY0ZGRiZi1jOGUyLTRlNjItYjM1MC1lODAwZjJjYzE4ZDAiLCJ1c2VybmFtZSI6ImZhYzhiYTRhLWEwNzYtNDliNy1iZTRmLWY5OWNiYmRjNDI2ZiJ9.TvUvXwMvolKHHoxNwdNdE1XWwqk8n1HW-c0eY95pEQ3iVkXZNHU3Vl7cv5ZOFC7v9u-HF90XoK1A6T453dfdUDlz4O6q48yU67ItMkbiqLh5sBNVNfCKbFzOFUK9bUPdKOZp5ZDUvTURDNrcu_BbyU5KPtsWaq6ZWcVtSgnJZ_4Mpb39-NZ32F2To1nnqWMaOLA14h5EHf3qhLU__KD9RVr0pkghv9_-Ew-IAc0pV3tkEqG1kdTPwgwKQAp41J0cGxf7y2McnykaJbDRGdjJxvalRFPt08rZEROI_V397XykNPC7tc_YatzoY32FOy56fJ8hXNpXR8OKc02DNu8fCw';
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
