import { AIR_CUSTOMER_PORTAL } from '@/constants';
import { useTheme } from '@mui/material';
import { useRouter } from 'next/router';

export const useSingleTicketDetail = () => {
  const theme = useTheme();
  const router = useRouter();
  const getCustomerSurvey = () => {
    router?.push({
      pathname: AIR_CUSTOMER_PORTAL?.UPSERT_SURVEY_RESPONSE,
      query: {
        surveyId: '',
      },
    });
  };
  return { theme, router, getCustomerSurvey };
};
