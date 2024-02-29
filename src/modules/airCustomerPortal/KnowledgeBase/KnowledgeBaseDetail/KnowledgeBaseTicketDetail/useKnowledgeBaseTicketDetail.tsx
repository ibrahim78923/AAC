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
import {
  useGetAllKnowledgeBaseArticleQuery,
  useGetSingleKnowledgeBaseArticleQuery,
  usePostArticleFeedbackMutation,
} from '@/services/airCustomerPortal/KnowledgeBase';
import { errorSnackbar, successSnackbar } from '@/utils/api';

export const useKnowledgeBaseTicketDetail = () => {
  const theme = useTheme();
  const [showFeedbackField, setShowFeedbackField] = useState(false);
  const [showOkFeedback, setShowOkFeedback] = useState(false);

  const route = useRouter();

  const folderId = route?.query?.folderId;
  const singleArticleId = route?.query?.articleId;
  const relatedArticlesParams = {
    folderId: folderId,
  };
  const { data: articlesData, isLoading: loadingArticles } =
    useGetAllKnowledgeBaseArticleQuery(relatedArticlesParams);
  const relatedArticlesData = articlesData?.data?.articles;

  const params = {
    id: singleArticleId,
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

  const handleRelatedArticles = (articleId: any) => {
    push({
      pathname: AIR_CUSTOMER_PORTAL?.KNOWLEDGE_BASE_TICKET_DETAIL,
      query: {
        articleId: articleId,
        folderId: folderId,
      },
    });
  };
  const feedbackMethod: any = useForm<any>({
    resolver: yupResolver(feedbackValidationSchema),
    defaultValues: feedbackDefaultValues,
  });
  const { handleSubmit, reset } = feedbackMethod;

  const [postArticleFeedbackTrigger, postArticleFeedbackProgress] =
    usePostArticleFeedbackMutation();
  const feedbackIsLoading = postArticleFeedbackProgress?.isLoading;

  const onSubmit = async (data: any) => {
    const payload = {
      id: singleArticleId,
      helpful: false,
      feedback: JSON.stringify({
        content: data?.content,
        information: data?.information,
        link: data?.link,
        understand: data?.understand,
      }),
      comment: data?.comment,
    };

    try {
      const res: any = await postArticleFeedbackTrigger(payload)?.unwrap();
      successSnackbar(res?.message ?? 'Feedback Added Successfully');
      setShowFeedbackField(false);
      setShowOkFeedback(true);
      reset(feedbackDefaultValues);
    } catch (error) {
      errorSnackbar();
    }
  };

  const helpfulSubmit = async () => {
    const payload = {
      id: singleArticleId,
      helpful: true,
    };
    try {
      const res: any = await postArticleFeedbackTrigger(payload)?.unwrap();
      successSnackbar(res?.message ?? 'This answer is helpful');
      setShowOkFeedback(true);
    } catch (error) {
      errorSnackbar();
    }
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
    handleRelatedArticles,
    singleArticleId,
    feedbackIsLoading,
    helpfulSubmit,
  };
};
