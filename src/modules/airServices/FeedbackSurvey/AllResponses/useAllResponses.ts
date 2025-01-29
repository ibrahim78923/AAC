import { useGetSingleSurveyDetailsForAllResponseQuery } from '@/services/airServices/feedback-survey/responses';
import { useRouter } from 'next/router';

export const useAllResponses = () => {
  const router = useRouter();
  const { surveyId } = router?.query;

  const apiDataParameter = {
    queryParams: {
      id: surveyId,
    },
  };
  const { data, isLoading, isFetching, isError, refetch } =
    useGetSingleSurveyDetailsForAllResponseQuery?.(apiDataParameter, {
      refetchOnMountOrArgChange: true,
      skip: !surveyId,
    });

  return {
    data,
    isLoading,
    isFetching,
    isError,
    refetch,
  };
};
