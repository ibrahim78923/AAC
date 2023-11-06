import { BASE_URL } from '@/config';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Tags
export const TAGS = ['USERS', 'PLAN_MANEGEMENT'];

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  prepareHeaders: (headers) => {
    const token: string | null =
      'eyJraWQiOiJuRTJPbWRNU0xEUTdvVHQxbjc0bTVtTXNaU1loZFVvN2sweHNseDhZRjNJPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiJmYWM4YmE0YS1hMDc2LTQ5YjctYmU0Zi1mOTljYmJkYzQyNmYiLCJjb2duaXRvOmdyb3VwcyI6WyJTVVBFUl9BRE1JTiJdLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAuZXUtd2VzdC0yLmFtYXpvbmF3cy5jb21cL2V1LXdlc3QtMl9xM2RMVTZ6dksiLCJjbGllbnRfaWQiOiIzOGVsNTNhdG9zbGRxMnRpZ3ViN2Qxa3IzYyIsIm9yaWdpbl9qdGkiOiJhMmQ4MmM1Zi1kYjgwLTRkNGQtOGRkMS0yMjEyYzM2YjE5NmUiLCJldmVudF9pZCI6ImZmOWFhNmYyLWFkNTAtNGU5Zi1iOGEzLTNkZmVkM2ZiYjM2ZiIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoiYXdzLmNvZ25pdG8uc2lnbmluLnVzZXIuYWRtaW4iLCJhdXRoX3RpbWUiOjE2OTkyNDg3MzEsImV4cCI6MTY5OTMzNTEzMSwiaWF0IjoxNjk5MjQ4NzMxLCJqdGkiOiJiOTExZDgwMi0yNzRiLTQxZTctOWY5OS05NTRkN2JiZjYwNWEiLCJ1c2VybmFtZSI6ImZhYzhiYTRhLWEwNzYtNDliNy1iZTRmLWY5OWNiYmRjNDI2ZiJ9.GDTacuByn0x08iA79bvFGb4zWZqegNLaoc1OB1ykQEspHnHxyD8BMUoOXU51ALJL1lvB56lcfNkiQ9JTrXIeUeDhHdBEg-jBQrAmIvWEwU4ii9BEvUUU0Fzz6sHrao2qvqHaszBbx2ItbncEqqjJ8kd2KggWy6lXNot2j-Ge3LvW2sUuu8XCkWl-oUBvch1sgfmDb3ZJObTgq62VC9kyK57tHjqpO1HfMDoV-Hx33Uf8NWwNMAiQiTt6XzhRSybgyDtg4ALvfLC6KvdepLhp-IXNK_nPYps-JigOUBDjDq_jRPt18ze5J_QLWfcHDC5vckDtpKh0zUgaU5BEQtkH_w';
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
