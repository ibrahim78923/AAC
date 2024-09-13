import { AIR_CUSTOMER_PORTAL } from '@/constants';
import useAuth from '@/hooks/useAuth';
import { UpsertSurveyResponse } from '@/modules/airServices/FeedbackSurvey/UpsertSurveyResponse';
import { NextRouter, useRouter } from 'next/router';

export const CustomerSurvey = () => {
  const { user }: any = useAuth();
  const router: NextRouter = useRouter();
  const { companyId } = router?.query;
  return (
    <>
      <UpsertSurveyResponse
        loggedInUser={user?.email}
        goBack={() =>
          router?.push({
            pathname: AIR_CUSTOMER_PORTAL?.DASHBOARD,
            ...(!!companyId && {
              query: {
                companyId,
              },
            }),
          })
        }
      />
    </>
  );
};
