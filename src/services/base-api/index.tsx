import { BASE_URL } from '@/config';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Tags
export const TAGS = ['USERS', 'PLAN_MANEGEMENT'];

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  prepareHeaders: (headers) => {
    const token: string | null =
      'eyJraWQiOiJuRTJPbWRNU0xEUTdvVHQxbjc0bTVtTXNaU1loZFVvN2sweHNseDhZRjNJPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiJmYWM4YmE0YS1hMDc2LTQ5YjctYmU0Zi1mOTljYmJkYzQyNmYiLCJjb2duaXRvOmdyb3VwcyI6WyJTVVBFUl9BRE1JTiJdLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAuZXUtd2VzdC0yLmFtYXpvbmF3cy5jb21cL2V1LXdlc3QtMl9xM2RMVTZ6dksiLCJjbGllbnRfaWQiOiIzOGVsNTNhdG9zbGRxMnRpZ3ViN2Qxa3IzYyIsIm9yaWdpbl9qdGkiOiJhZWM0YzM4Ni0wNjUwLTRjZGUtOGQzYy0xYjJhOWM0YzAzZWMiLCJldmVudF9pZCI6IjFiODA4OGJmLTEzNzItNGQzYy1hNWEwLWVkOTg0NDA0YTYzMyIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoiYXdzLmNvZ25pdG8uc2lnbmluLnVzZXIuYWRtaW4iLCJhdXRoX3RpbWUiOjE2OTg5OTAyMzEsImV4cCI6MTY5OTA3NjYzMSwiaWF0IjoxNjk4OTkwMjMxLCJqdGkiOiJiOGVlODU3Yi1hOGY4LTQ5N2YtYjJmMS1iZmQ0MzUyNGI5MWYiLCJ1c2VybmFtZSI6ImZhYzhiYTRhLWEwNzYtNDliNy1iZTRmLWY5OWNiYmRjNDI2ZiJ9.aM21oKEWtfx8clK7j7BjWgjFWkUSwxP8AhcyTpgB5DIgdYMAOg4T40doCX0jJH313SNJCOGEf4XRIkVXuV78VwUwYiacmURkzO9ZQkb6zeg5iy8Zur9X6OTLFoiar1KVigvkdEPews-iDFmoF9UIsZ-_8cYZ3TRwLMh95KLSfRtP5NbgQg6zjEJurLlfzR2RdTbhKJxo6_gpQVc-aZBgZ5L8NQZXnHrQkjzGfuPRKERvz1cVvTKIAv_s-tmoPdDPrTdIDc7xu1M0Hu9T-wcvcLRiNB8Zoefl33lMawIQzD5kO3du9CGrGHQZ2rKbXmd3lxVSY6XFEBB4As9SFsimWw';
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
