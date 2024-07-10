import { FEEDBACK_SURVEY_PATH_TYPES } from '@/constants/strings';
import { useTheme } from '@mui/material';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export const useFeedbackSurvey = () => {
  const theme: any = useTheme();
  const router: any = useRouter();
  useEffect(() => {
    if (!router?.query?.type) {
      router?.push({
        pathname: router?.basePath,
        query: { type: FEEDBACK_SURVEY_PATH_TYPES?.CUSTOMER_SUPPORT },
      });
    }
  }, [!router?.query?.type]);
  const handleClick = (query: string) => {
    router?.push({
      pathname: router?.basePath,
      query: { type: query },
    });
  };
  return {
    handleClick,
    theme,
    router,
  };
};
