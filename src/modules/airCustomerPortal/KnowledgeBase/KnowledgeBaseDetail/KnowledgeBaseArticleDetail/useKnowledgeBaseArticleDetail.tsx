import { useRouter } from 'next/router';
import { useTheme } from '@mui/material';
import { AIR_CUSTOMER_PORTAL } from '@/constants';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  feedbackDefaultValues,
  feedbackValidationSchema,
  feedbackDataArray,
} from './KnowledgeBaseArticleDetail.data';
import {
  useGetAllKnowledgeBaseArticleQuery,
  useGetSingleKnowledgeBaseArticleQuery,
  usePostArticleFeedbackMutation,
} from '@/services/airCustomerPortal/KnowledgeBase';
import { errorSnackbar, successSnackbar } from '@/utils/api';
import { ARTICLE_STATUS } from '@/constants/strings';

export const useKnowledgeBaseArticleDetail = () => {
  const theme = useTheme();
  const [showFeedbackField, setShowFeedbackField] = useState(false);
  const [showOkFeedback, setShowOkFeedback] = useState(false);
  const route = useRouter();

  const folderId = route?.query?.folderId;
  const singleArticleId = route?.query?.articleId;

  const relatedArticlesParams = {
    folderId: folderId,
    status: ARTICLE_STATUS?.PUBLISHED,
  };
  const {
    data: articlesData,
    isLoading: loadingArticles,
    isFetching: fetchingArticles,
  } = useGetAllKnowledgeBaseArticleQuery(relatedArticlesParams, {
    refetchOnMountOrArgChange: true,
    skip: !!!folderId,
  });
  const relatedArticlesData = articlesData?.data?.articles;

  const params = {
    id: singleArticleId,
  };

  const { data, isLoading, isFetching } = useGetSingleKnowledgeBaseArticleQuery(
    params,
    {
      refetchOnMountOrArgChange: true,
      skip: !!!singleArticleId,
    },
  );
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
      feedback: JSON.stringify(data?.feedback),
      comment: data?.comment,
    };

    try {
      const res: any = await postArticleFeedbackTrigger(payload)?.unwrap();
      successSnackbar(res?.message ?? 'Feedback Added Successfully');
      setShowFeedbackField(false);
      setShowOkFeedback(true);
      reset(feedbackDefaultValues);
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
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
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
    }
  };

  useEffect(() => {
    setShowOkFeedback(false);
  }, [singleArticleId]);

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
    isFetching,
    fetchingArticles,
  };
};
