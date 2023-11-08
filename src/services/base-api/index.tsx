import { BASE_URL } from '@/config';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Tags
export const TAGS = ['USERS', 'PLAN_MANEGEMENT'];

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  prepareHeaders: (headers) => {
    const token: string | null =
      'eyJraWQiOiJuRTJPbWRNU0xEUTdvVHQxbjc0bTVtTXNaU1loZFVvN2sweHNseDhZRjNJPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiJmYWM4YmE0YS1hMDc2LTQ5YjctYmU0Zi1mOTljYmJkYzQyNmYiLCJjb2duaXRvOmdyb3VwcyI6WyJTVVBFUl9BRE1JTiJdLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAuZXUtd2VzdC0yLmFtYXpvbmF3cy5jb21cL2V1LXdlc3QtMl9xM2RMVTZ6dksiLCJjbGllbnRfaWQiOiIzOGVsNTNhdG9zbGRxMnRpZ3ViN2Qxa3IzYyIsIm9yaWdpbl9qdGkiOiI1ZjdkY2YyYi1mZjM3LTRlYjQtYjJkMi02YjU2ZmM1MmM1OGEiLCJldmVudF9pZCI6IjAxNDFiMTU3LTA4YzAtNDg4Zi05MTc3LTMwNWYyNjMzOWE5NSIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoiYXdzLmNvZ25pdG8uc2lnbmluLnVzZXIuYWRtaW4iLCJhdXRoX3RpbWUiOjE2OTkyNjQ5ODUsImV4cCI6MTY5OTM1MTM4NSwiaWF0IjoxNjk5MjY0OTg1LCJqdGkiOiI1OTExOTAzYi1lOGJkLTQ0NGUtOWU5YS1kZmFkNGY4OTIyMjEiLCJ1c2VybmFtZSI6ImZhYzhiYTRhLWEwNzYtNDliNy1iZTRmLWY5OWNiYmRjNDI2ZiJ9.OvXhbJIu-A4QCeq0n61KbkaRB_nIbeVOH61Z75n5HjEAWHTAYEvLien4Pcz01YN8WwbVvAf2n9VvXYW7_qhl5pkZ-FISbGrCOh-R9wlkXI0enw9xalWXlAkZQlJrS3Bm9xjiCNhZCEo9C1LRMtfJPmBRDXzsGnFaYrhqyZpvGhR2lgbKVv_5n775xmKgQVWaWPJ4v6SaEAtSdkbTFHDvd34Y1SESWuMAn45x6mgDqZRwDasvzj1jcadm6P8OsS0llWYOno54qVo1S4cdVCYCWSzNKbMeoTNbu_Xj1tWgt17bY6f3x9JiztosfuAreOnM8b09EeCvtih-dJkhaywxZA';
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
