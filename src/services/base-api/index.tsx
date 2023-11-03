import { BASE_URL } from '@/config';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Tags
export const TAGS = ['USERS', 'PLAN_MANEGEMENT'];

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  prepareHeaders: (headers) => {
    const token: string | null =
      'eyJraWQiOiJuRTJPbWRNU0xEUTdvVHQxbjc0bTVtTXNaU1loZFVvN2sweHNseDhZRjNJPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiJmYWM4YmE0YS1hMDc2LTQ5YjctYmU0Zi1mOTljYmJkYzQyNmYiLCJjb2duaXRvOmdyb3VwcyI6WyJTVVBFUl9BRE1JTiJdLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAuZXUtd2VzdC0yLmFtYXpvbmF3cy5jb21cL2V1LXdlc3QtMl9xM2RMVTZ6dksiLCJjbGllbnRfaWQiOiIzOGVsNTNhdG9zbGRxMnRpZ3ViN2Qxa3IzYyIsIm9yaWdpbl9qdGkiOiIyZjNhZmYxOS01ODRlLTQzMDEtODUyNS03NmNhZThjNmUwMGMiLCJldmVudF9pZCI6ImYxNTFkMjVmLWNhNDUtNGE1Ni1hZmZhLTJlYzY1MWQzYWU1NiIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoiYXdzLmNvZ25pdG8uc2lnbmluLnVzZXIuYWRtaW4iLCJhdXRoX3RpbWUiOjE2OTg5ODQ3ODAsImV4cCI6MTY5OTA3MTE4MCwiaWF0IjoxNjk4OTg0NzgwLCJqdGkiOiI0Y2JmNjM3NS05ZjNlLTRlODctYWFjZC00N2ZkOGEzZmFkMjEiLCJ1c2VybmFtZSI6ImZhYzhiYTRhLWEwNzYtNDliNy1iZTRmLWY5OWNiYmRjNDI2ZiJ9.ZOEJAmMgD2j7Og6OqOt_-iHHXZ-cD2I6xMN0tVrvPluOi_vo3nz5fuLfzFnsxE19hMSM_LDCqjmHk2MI46gzlbCwTw4x9UADCTygKFQrfyatnk1r6WitulKY73f3ghq-pcUCbGZ2967XP_73aspnaWQ28C22KSf-EFbMRJid9YuQ8_U3jslkkoJOnb3l3nN9srJslwtwxYjsqJqLhYXNoh93Zpe6arJ6EIi2WkAqd8nDKU_dUJOLs0-yo2sZ1xiS6nfILDT07VyXuYs63wlNrdMaD6S7aiLZOdu0-mLL4R_BSKIEmpsXa7CLUV3j7BGtj1W3usvW-1CwhWyfB1TZUw';
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
