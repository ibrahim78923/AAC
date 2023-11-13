import { BASE_URL } from '@/config';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

//TAG
export const TAGS = [
  'USERS',
  'PLAN_MANEGEMENT',
  'InventoryActivity',
  'Expense',
];

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  prepareHeaders: (headers) => {
    const token = `eyJraWQiOiJuRTJPbWRNU0xEUTdvVHQxbjc0bTVtTXNaU1loZFVvN2sweHNseDhZRjNJPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiIzMTE5YjkyNi1lNzMwLTQyZjgtYmJiZC01MmFkOTg1NWQ3ZjQiLCJjb2duaXRvOmdyb3VwcyI6WyJPUkdfRU1QTE9ZRUUiXSwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLmV1LXdlc3QtMi5hbWF6b25hd3MuY29tXC9ldS13ZXN0LTJfcTNkTFU2enZLIiwiY2xpZW50X2lkIjoiMzhlbDUzYXRvc2xkcTJ0aWd1YjdkMWtyM2MiLCJvcmlnaW5fanRpIjoiZjQ1OTlmMGYtZTk5OS00YTA1LWFlYTQtZjc1Y2I4YjEzMGE0IiwiZXZlbnRfaWQiOiI1ZjkzMThjNC0xODRiLTQwYzUtOTM2ZC02ZjMwNTM4YjkyZDYiLCJ0b2tlbl91c2UiOiJhY2Nlc3MiLCJzY29wZSI6ImF3cy5jb2duaXRvLnNpZ25pbi51c2VyLmFkbWluIiwiYXV0aF90aW1lIjoxNjk5NjMwNDA2LCJleHAiOjE2OTk3MTY4MDYsImlhdCI6MTY5OTYzMDQwNiwianRpIjoiMmUzMDE2YmQtNTQ5Ni00NWNjLThjZDYtZDkxYjNiYWZjYTgyIiwidXNlcm5hbWUiOiIzMTE5YjkyNi1lNzMwLTQyZjgtYmJiZC01MmFkOTg1NWQ3ZjQifQ.Mf_i16GTlQEr-QvSErcg3m35vvvRc8SaiwHjdUObWlSSZr3sAygkanWw4ul4RqjK8k74aGcn5Y_l3sw4R4CC7rqL3VAqc79Iwu-9Y4i-i0WZUsniMgynM4rQ0SPHMZUYctGQcXQcrPOVgPK_ByJlAVCA7rEVzdT81Kyy9KPMsEKgSCnYWzNjxEYTxxickPzCbyKHFLq-3oGBgEOFsnngETzzfKagavUu1GO7qtVwzDJ5Wt3KuEEZVnxAcj6uq8ogg-pbS5BSn01JVNrWb4JF6Cx64UsQSuciKolsQRqop9Y5EDyNlDwLOq2Zqn6FgrCXeO33pVJldyFxlSfwMxvMqQ`;
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
