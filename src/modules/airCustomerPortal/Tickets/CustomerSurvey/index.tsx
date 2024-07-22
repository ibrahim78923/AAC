import { AIR_CUSTOMER_PORTAL } from '@/constants';
import useAuth from '@/hooks/useAuth';
import { UpsertSurveyResponse } from '@/modules/airServices/FeedbackSurvey/UpsertSurveyResponse';
import { useRouter } from 'next/router';

export const CustomerSurvey = () => {
  const { user } = useAuth();
  const router = useRouter();
  return (
    <>
      <UpsertSurveyResponse
        loggedInUser={user?.email}
        goBack={() =>
          router?.push({ pathname: AIR_CUSTOMER_PORTAL?.DASHBOARD })
        }
      />
    </>
  );
};
