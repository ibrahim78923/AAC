import { useEffect } from 'react';
import { useForm, UseFormReturn } from 'react-hook-form';
import { NextRouter, useRouter } from 'next/router';
import { Theme, useTheme } from '@mui/material';
import {
  upsertArticleDefaultValues,
  upsertArticleFormFieldsDynamic,
  upsertArticleValidationSchema,
} from './UpsertArticle.data';
import { errorSnackbar, successSnackbar } from '@/utils/api';
import { yupResolver } from '@hookform/resolvers/yup';
import { AIR_SERVICES } from '@/constants';
import { ARRAY_INDEX, ARTICLE_STATUS } from '@/constants/strings';
import { UpsertArticlesFormFieldsI } from './UpsertArticles.interface';
import useAuth from '@/hooks/useAuth';
import { isoDateString } from '@/utils/dateTime';
import {
  useAddServicesKnowledgeBaseSingleArticleMutation,
  useGetServicesKnowledgeBaseSingleArticleByIdQuery,
  useUpdateServicesKnowledgeBaseSingleArticleMutation,
} from '@/services/airServices/knowledge-base/articles';

export const useUpsertArticle: any = () => {
  const router: NextRouter = useRouter();
  const theme: Theme = useTheme();
  const { articleId } = router?.query;
  const auth: any = useAuth();

  const { _id: companyId } =
    auth?.product?.accounts?.[ARRAY_INDEX?.ZERO]?.company ?? {};

  const [postArticleTrigger, postArticleStatus] =
    useAddServicesKnowledgeBaseSingleArticleMutation();
  const [patchArticleTrigger, patchArticleStatus] =
    useUpdateServicesKnowledgeBaseSingleArticleMutation();

  const getSingleArticleParameter = {
    pathParam: {
      articleId,
      companyId,
    },
  };

  const { data, isLoading, isFetching, isError, refetch }: any =
    useGetServicesKnowledgeBaseSingleArticleByIdQuery(
      getSingleArticleParameter,
      {
        refetchOnMountOrArgChange: true,
        skip: !!!articleId,
      },
    );

  const methods: UseFormReturn<UpsertArticlesFormFieldsI> = useForm<
    UpsertArticlesFormFieldsI | any
  >({
    defaultValues: upsertArticleDefaultValues(),
    resolver: yupResolver(upsertArticleValidationSchema),
  });

  const { reset, handleSubmit } = methods;

  useEffect(() => {
    reset(() => upsertArticleDefaultValues(data?.data));
  }, [articleId, data, reset]);

  const needApprovals = methods?.watch('needsApproval');

  const cancelBtnHandler = (type: string) => {
    if (type === '') {
      router?.push(AIR_SERVICES?.KNOWLEDGE_BASE);
      return;
    }
    if (type === ARTICLE_STATUS?.DRAFT) {
      handleSubmit?.(upsertArticleSubmit)(ARTICLE_STATUS?.DRAFT as any);
      return;
    }
  };

  const upsertArticleSubmit = async (
    data: UpsertArticlesFormFieldsI,
    status?: string | any,
  ) => {
    const upsertArticle = new FormData();
    !!data?.title && upsertArticle?.append('title', data?.title);
    !!data?.details && upsertArticle?.append('details', data?.details);
    !!data?.folder?._id && upsertArticle?.append('folder', data?.folder?._id);
    upsertArticle?.append('status', status);
    !!data?.tags?.length && upsertArticle?.append('tags', data?.tags);
    !!data?.keywords?.length &&
      upsertArticle?.append('keywords', data?.keywords);
    upsertArticle?.append('isApproval', data?.needsApproval);
    !!data?.approver?._id &&
      data?.needsApproval &&
      upsertArticle?.append('approver', data?.approver?._id);
    data?.needsApproval &&
      upsertArticle?.append('reviewDate', isoDateString(data?.reviewDate));
    !!data?.attachments && upsertArticle?.append('fileUrl', data?.attachments);
    const postArticleParameter = {
      body: upsertArticle,
    };

    if (!!articleId) {
      updateArticleSubmit?.(upsertArticle);
      return;
    }

    try {
      await postArticleTrigger(postArticleParameter)?.unwrap();
      successSnackbar('Article Added successfully');
      router?.push(AIR_SERVICES?.KNOWLEDGE_BASE);
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
    }
  };

  const updateArticleSubmit = async (data: any) => {
    data?.append('id', articleId);
    const patchArticleParameter = {
      body: data,
    };
    try {
      await patchArticleTrigger(patchArticleParameter)?.unwrap();
      successSnackbar('Article Updated successfully');
      router?.push(AIR_SERVICES?.KNOWLEDGE_BASE);
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
    }
  };

  const newArticleFields = upsertArticleFormFieldsDynamic?.(needApprovals);

  return {
    methods,
    needApprovals,
    upsertArticleSubmit,
    theme,
    newArticleFields,
    articleId,
    router,
    postArticleStatus,
    patchArticleStatus,
    isLoading,
    isFetching,
    cancelBtnHandler,
    isError,
    refetch,
  };
};
