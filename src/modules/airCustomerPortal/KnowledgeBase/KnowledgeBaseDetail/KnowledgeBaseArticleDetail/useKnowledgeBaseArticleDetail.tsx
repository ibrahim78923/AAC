import { useRouter } from 'next/router';
import { useTheme } from '@mui/material';
import { AIR_CUSTOMER_PORTAL } from '@/constants';
import { useEffect, useMemo, useState } from 'react';
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
import { ARRAY_INDEX, ARTICLE_STATUS } from '@/constants/strings';
import { getActiveProductSession, getSession } from '@/utils';

export const useKnowledgeBaseArticleDetail = () => {
  const theme = useTheme();
  const [showFeedbackField, setShowFeedbackField] = useState(false);
  const [showOkFeedback, setShowOkFeedback] = useState(false);
  const route = useRouter();
  const product = getActiveProductSession();
  const session: any = getSession();
  const sessionCompanyId = session?.user?.companyId;
  const companyIdStorage = product?.accounts?.[ARRAY_INDEX?.ZERO]?.company?._id;
  const sessionUserId = session?.user?._id;

  const { companyId } = route?.query;
  const decryptedId = useMemo(() => {
    const id = Array.isArray(companyId)
      ? companyId[ARRAY_INDEX?.ZERO]
      : companyId;
    return atob(id ?? '');
  }, [companyId]);

  const folderId = route?.query?.folderId;
  const singleArticleId = route?.query?.articleId;

  const relatedArticlesParams = {
    folderId,
    status: ARTICLE_STATUS?.PUBLISHED,
    companyId: decryptedId || companyIdStorage || sessionCompanyId,
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
    companyId: decryptedId || companyIdStorage || sessionCompanyId,
  };

  const { data, isLoading, isFetching } = useGetSingleKnowledgeBaseArticleQuery(
    params,
    {
      refetchOnMountOrArgChange: true,
      skip: !!!singleArticleId,
    },
  );
  const singleArticlesData = data?.data;

  const handlePageBack = () => {
    route?.push({
      pathname: AIR_CUSTOMER_PORTAL?.KNOWLEDGE_BASE_DETAIL,
      query: { folderId, ...(companyId && { companyId }) },
    });
  };

  const handleRelatedArticles = (articleId: any) => {
    route?.push({
      pathname: AIR_CUSTOMER_PORTAL?.KNOWLEDGE_BASE_TICKET_DETAIL,
      query: {
        articleId: articleId,
        folderId: folderId,
        ...(companyId && { companyId }),
      },
    });
  };
  const feedbackMethod: any = useForm<any>({
    resolver: yupResolver(feedbackValidationSchema(companyId)),
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
      ...(sessionUserId && { createdBy: sessionUserId }),
      ...(companyId && { email: data?.email }),
      companyId: decryptedId || companyIdStorage || sessionCompanyId,
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
    companyId,
  };
};
