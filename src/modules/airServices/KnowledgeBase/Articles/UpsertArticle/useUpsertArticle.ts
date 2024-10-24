import { useEffect, useMemo } from 'react';
import { useForm, UseFormReturn } from 'react-hook-form';
import { NextRouter, useRouter } from 'next/router';
import { Theme, useTheme } from '@mui/material';
import {
  upsertArticleDefaultValues,
  upsertArticleFormFieldsDynamic,
  upsertArticleValidationSchema,
} from './UpsertArticle.data';
import { yupResolver } from '@hookform/resolvers/yup';
import { ARTICLE_STATUS } from '@/constants/strings';
import { UpsertArticlesFormFieldsI } from './UpsertArticles.interface';
import {
  useAddServicesKnowledgeBaseSingleArticleMutation,
  useGetServicesKnowledgeBaseSingleArticleByIdQuery,
  useUpdateServicesKnowledgeBaseSingleArticleMutation,
} from '@/services/airServices/knowledge-base/articles';
import { getActiveAccountSession } from '@/utils';
import { AIR_SERVICES } from '@/constants/routes';
import { isoDateString } from '@/lib/date-time';
import { errorSnackbar, successSnackbar } from '@/lib/snackbar';

const { KNOWLEDGE_BASE } = AIR_SERVICES ?? {};
const { DRAFT } = ARTICLE_STATUS ?? {};

export const useUpsertArticle: any = () => {
  const router: NextRouter = useRouter();
  const theme: Theme = useTheme();
  const { articleId } = router?.query;

  const product = useMemo(() => getActiveAccountSession(), []);
  const companyId = product?.company?._id ?? {};

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

  const moveToHome = () => router?.push(KNOWLEDGE_BASE);

  const cancelBtnHandler = (type: string) => {
    if (type === '') {
      moveToHome?.();
      return;
    }
    if (type === DRAFT) {
      handleSubmit?.(upsertArticleSubmit)(DRAFT as any);
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
      successSnackbar('Article added successfully');
      moveToHome?.();
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
      successSnackbar('Article updated successfully');
      moveToHome?.();
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
    }
  };

  const newArticleFields = upsertArticleFormFieldsDynamic?.(needApprovals);

  return {
    methods,
    upsertArticleSubmit,
    needApprovals,
    theme,
    newArticleFields,
    articleId,
    postArticleStatus,
    patchArticleStatus,
    isLoading,
    isFetching,
    cancelBtnHandler,
    isError,
    refetch,
    moveToHome,
  };
};
