import { PageTitledHeader } from '@/components/PageTitledHeader';
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
        moveBack={() => router?.back()}
      />
      <HorizontalTabs tabsDataArray={['All Responses']}>
        <AllResponses />
      </HorizontalTabs>
    </>
  );
};
