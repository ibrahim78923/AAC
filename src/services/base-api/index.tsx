import { BASE_URL } from '@/config';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Tags
export const TAGS = ['USERS', 'PLAN_MANEGEMENT'];

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  prepareHeaders: (headers) => {
    const token:
      | string
      | null = `eyJraWQiOiJuRTJPbWRNU0xEUTdvVHQxbjc0bTVtTXNaU1loZFVvN2sweHNseDhZRjNJPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiIzMTE5YjkyNi1lNzMwLTQyZjgtYmJiZC01MmFkOTg1NWQ3ZjQiLCJjb2duaXRvOmdyb3VwcyI6WyJPUkdfRU1QTE9ZRUUiXSwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLmV1LXdlc3QtMi5hbWF6b25hd3MuY29tXC9ldS13ZXN0LTJfcTNkTFU2enZLIiwiY2xpZW50X2lkIjoiMzhlbDUzYXRvc2xkcTJ0aWd1YjdkMWtyM2MiLCJvcmlnaW5fanRpIjoiNmZkODA2ZjgtNDIxMi00YzM3LTgzZDgtOWNlY2ZmYWZjOTkyIiwiZXZlbnRfaWQiOiI0ZGYxMDAzMi1jYjc1LTRlMDgtOGE4Yi0wZDAwYjdhZTA1NWMiLCJ0b2tlbl91c2UiOiJhY2Nlc3MiLCJzY29wZSI6ImF3cy5jb2duaXRvLnNpZ25pbi51c2VyLmFkbWluIiwiYXV0aF90aW1lIjoxNjk5NDY1MDk2LCJleHAiOjE2OTk1NTE0OTYsImlhdCI6MTY5OTQ2NTA5NiwianRpIjoiZGI3MjJlYzUtNmZhMS00Yjk5LThkMzItOGVkZDQyZWY2NTcyIiwidXNlcm5hbWUiOiIzMTE5YjkyNi1lNzMwLTQyZjgtYmJiZC01MmFkOTg1NWQ3ZjQifQ.D2HRYh935YnUby_xSdLNcasUg9pwD2XJ6R-1pdXAXozwMAkVkLtGtAezWn1piGOPCVYCPT_HVcw5H_rKkc-nQRCfgvVXuFRFScDj5kQxPg_fMZ-kE1-zZaGD6rDCYohJU-ZZpYcXhTZH1i4TL4UP1_wqJYHrjTnB-Crq7SaBXjPRnn3Fh6CTN4_TmvSgy0SW8orOoilxyn0fJh3-Wo1itU6UWobqTjnaM3unJkOeUSyozRs7gGJyMGYQoDwxI2fVR_wZHwSh6pjYQf68rcFgGXncQMPA9pj0j2rUSjWzHb2KeOBtUCR0F7hR_PFnGf8mEi0dGvEPn_0xgdEAcEj8UA`;
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
