import { useRouter } from 'next/router';
import { useTheme } from '@mui/material';
import { AIR_CUSTOMER_PORTAL } from '@/constants';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  feedbackDefaultValues,
  feedbackValidationSchema,
  feedbackDataArray,
} from './KnowledgeBaseTicketDetail.data';
import { enqueueSnackbar } from 'notistack';
import { NOTISTACK_VARIANTS } from '@/constants/strings';
import {
  useGetAllKnowledgeBaseArticleQuery,
  useGetSingleKnowledgeBaseArticleQuery,
} from '@/services/airCustomerPortal/KnowledgeBase';

export const useKnowledgeBaseTicketDetail = () => {
  const theme = useTheme();
  const [showFeedbackField, setShowFeedbackField] = useState(false);
  const [showOkFeedback, setShowOkFeedback] = useState(false);

  const route = useRouter();

  const folderId = route?.query?.folderId;
  const relatedArticlesParams = {
    folderId: folderId,
  };
  const { data: articlesData, isLoading: loadingArticles } =
    useGetAllKnowledgeBaseArticleQuery(relatedArticlesParams);
  const relatedArticlesData = articlesData?.data?.articles;

  const params = {
    id: route?.query?.articleId,
  };

  const { data, isLoading } = useGetSingleKnowledgeBaseArticleQuery(params);

  const singleArticlesData = data?.data;

  const { push } = useRouter();
  const handlePageBack = () => {
    push({
      pathname: AIR_CUSTOMER_PORTAL?.KNOWLEDGE_BASE_DETAIL,
      query: { folderId },
    });
  };
  const feedbackMethod: any = useForm<any>({
    resolver: yupResolver(feedbackValidationSchema),
    defaultValues: feedbackDefaultValues,
  });
  const { handleSubmit, reset } = feedbackMethod;

  const onSubmit = () => {
    enqueueSnackbar('Feedback Added Successfully', {
      variant: NOTISTACK_VARIANTS?.SUCCESS,
    });
    setShowFeedbackField(false);
    setShowOkFeedback(true);
    reset(feedbackDefaultValues);
  };
  const feedbackSubmit = handleSubmit(onSubmit);
  return {
    handlePageBack,
    theme,
    showFeedbackField,
    setShowFeedbackField,
    feedbackSubmit,
    feedbackMethod,
    feedbackDataArray,
    showOkFeedback,
    setShowOkFeedback,
    singleArticlesData,
    isLoading,
    relatedArticlesData,
    loadingArticles,
  };
};
