import { AIR_CUSTOMER_PORTAL } from '@/constants';
import { useTheme } from '@mui/material';
import { useRouter } from 'next/router';
import { SingleTicketDetailPropsI } from './SingleTicketDetail.interface';
import { getCustomerPortalStyling } from '@/utils';

export const useSingleTicketDetail = (props: SingleTicketDetailPropsI) => {
  const { lazyGetSingleDefaultSurveyForCustomerTicketsStatus } = props;
  const theme = useTheme();
  const router = useRouter();
  const { companyId } = router?.query;
  const getCustomerSurvey = () => {
    router?.push({
      pathname: AIR_CUSTOMER_PORTAL?.UPSERT_SURVEY_RESPONSE,
      query: {
        surveyId:
          lazyGetSingleDefaultSurveyForCustomerTicketsStatus?.data?.data?.UUID,
        ...(!!companyId && { companyId }),
      },
    });
  };
  const portalStyles = getCustomerPortalStyling();
  return { theme, router, getCustomerSurvey, portalStyles };
};
