import { PageTitledHeader } from '@/components/PageTitledHeader';
import { AIR_SERVICES } from '@/constants';
import { useRouter } from 'next/router';
import { AllResponses } from '../AllResponses';
import HorizontalTabs from '@/components/Tabs/HorizontalTabs';

export const SingleDetailFeedbackSurvey = () => {
  const router = useRouter();
  return (
    <>
      <PageTitledHeader
        title="Feedback Survey - View Responses"
        canMovedBack
        moveBack={() => router?.push(AIR_SERVICES?.FEEDBACK_SURVEY)}
      />
      <HorizontalTabs tabsDataArray={['All Responses']}>
        <AllResponses />
      </HorizontalTabs>
    </>
  );
};
