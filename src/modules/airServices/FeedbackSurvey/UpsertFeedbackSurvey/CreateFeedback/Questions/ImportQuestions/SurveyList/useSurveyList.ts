import { PAGINATION } from '@/config';
import { useLazyGetFeedbackListQuery } from '@/services/airServices/feedback-survey';
import { useEffect, useState } from 'react';
import { SurveyListI } from './SurveyList.interface';

export const useSurveyList = (props: SurveyListI) => {
  const { openImport, setSurveyId, setQuestionsList } = props;
  const [page, setPage] = useState<number>(PAGINATION?.CURRENT_PAGE);
  const [limit, setLimit] = useState<number>(PAGINATION?.PAGE_LIMIT);
  const [getFeedbackList, { data, isLoading, isFetching, isError, isSuccess }] =
    useLazyGetFeedbackListQuery();
  const queryParams = {
    page,
    limit,
  };
  useEffect(() => {
    getFeedbackList(queryParams);
  }, [openImport, page, limit]);
  const handleSurveyClick = (id: string) => {
    setSurveyId(id);
    setQuestionsList(true);
  };
  return {
    data,
    isLoading,
    isFetching,
    isSuccess,
    isError,
    setLimit,
    setPage,
    handleSurveyClick,
  };
};
