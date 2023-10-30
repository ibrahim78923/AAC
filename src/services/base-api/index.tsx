import { BASE_URL } from '@/config';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Tags
export const TAGS = ['USERS', 'PLAN_MANEGEMENT'];

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  prepareHeaders: (headers) => {
    const token: string | null =
      'eyJraWQiOiJtclZVQUJXVFJoUm1yc0YxQ0Z1cFZFMmNsYWZ1ckZOckdsUHViSU1SbXlrPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiJkNTE4ZDRiMS0yN2U4LTQxMWQtYTc5NC1jNzIwZDIwM2UxZjUiLCJjb2duaXRvOmdyb3VwcyI6WyJPUkdfQURNSU4iXSwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLmV1LXdlc3QtMi5hbWF6b25hd3MuY29tXC9ldS13ZXN0LTJfMlZROUI3bG5nIiwiY2xpZW50X2lkIjoiMWd0azFkcGNwazA5cmEzdTZvcmxiZm8zNTgiLCJvcmlnaW5fanRpIjoiMzkyZDljOTAtYmM5ZC00M2Q1LTk5ZGMtOTBmNmE3MjE0YTFkIiwiZXZlbnRfaWQiOiJjNTdhNjAxYy00M2ZmLTQ5YjEtYWUwMC05YTNlNzdiOTllODIiLCJ0b2tlbl91c2UiOiJhY2Nlc3MiLCJzY29wZSI6ImF3cy5jb2duaXRvLnNpZ25pbi51c2VyLmFkbWluIiwiYXV0aF90aW1lIjoxNjk4NjYwMzIzLCJleHAiOjE2OTg2NjM5MjMsImlhdCI6MTY5ODY2MDMyMywianRpIjoiMmQ1YjYzZWEtMzViZi00MjEwLTk4MmItYjhjNDFkYTU0NDBkIiwidXNlcm5hbWUiOiJkNTE4ZDRiMS0yN2U4LTQxMWQtYTc5NC1jNzIwZDIwM2UxZjUifQ.PvC4JpaeeMYiOBJVoKnakKRMjGDfuYGpNARQ1pOWoJEQgWdZj2crd8zR1b4w2bfX75SRbmoFTaMOcL87nvIqPh26KRXofQJS0QAujQE5sh2f2D3WXR23iZc6Y5umZyyZC89IpydaLMlD9U8iNcIZrAAacJHEo0Mgl9EcW3Ck-XQwv50w4XPMSGWrRrAmnzLeTNmjK7dGCmfOjohq_OlwMLYNsRBRYWY5g49CMYc2rcZ_n47ZXw-ZrSAqWwpm8C2kHkE2m4HwsVYTYbuf7hRaGLVkJ4UBWMn793zoiz9xFCE0oOCKPA_HGAIo_d3MKHqzZdDQBY7JID7NtA11Bp5C9g';
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
