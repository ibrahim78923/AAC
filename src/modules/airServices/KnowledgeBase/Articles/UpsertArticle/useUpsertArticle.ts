import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { useTheme } from '@mui/material';
import {
  useGetArticleByIdQuery,
  useLazyGetFoldersDropdownQuery,
  usePatchArticleMutation,
  usePostArticleMutation,
} from '@/services/airServices/knowledge-base/articles';
import {
  defaultValues,
  editArticleFieldsFunction,
  upsertArticleValidationSchema,
} from './UpsertArticle.data';
import { useLazyGetUsersDropdownQuery } from '@/services/airServices/assets/contracts';
import { errorSnackbar, successSnackbar } from '@/utils/api';
import { yupResolver } from '@hookform/resolvers/yup';
import { AIR_SERVICES } from '@/constants';
import { ARTICLE_STATUS } from '@/constants/strings';

export const useUpsertArticle: any = () => {
  const router = useRouter();
  const theme = useTheme();
  const { articleId } = router?.query;

  const [postArticleTrigger, postArticleStatus] = usePostArticleMutation();
  const [patchArticleTrigger, patchArticleStatus] = usePatchArticleMutation();

  const getSingleArticleParameter = {
    pathParam: {
      articleId,
    },
  };
  const { data, isLoading, isFetching } = useGetArticleByIdQuery(
    getSingleArticleParameter,
    {
      refetchOnMountOrArgChange: true,
      skip: !!!articleId,
    },
  );
  const editArticleMethods = useForm<any>({
    defaultValues: defaultValues(),
    resolver: yupResolver(upsertArticleValidationSchema),
  });

  const { reset, handleSubmit } = editArticleMethods;

  useEffect(() => {
    reset(() => defaultValues(data?.data));
  }, [articleId, data, reset]);

  const needApprovals = editArticleMethods?.watch('needsApproval');

  const cancelBtnHandler = (type: any) => {
    if (type === '') {
      router?.push(AIR_SERVICES?.KNOWLEDGE_BASE);
      return;
    }
    if (type === ARTICLE_STATUS?.DRAFT) {
      handleSubmit?.(upsertArticleSubmit)(ARTICLE_STATUS?.DRAFT as any);
      return;
    }
  };

  const upsertArticleSubmit = async (data: any, status?: any) => {
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
      upsertArticle?.append('reviewDate', data?.reviewDate);

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
    } catch (error) {
      errorSnackbar();
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
    } catch (error) {
      errorSnackbar();
    }
  };

  const apiQueryFolder = useLazyGetFoldersDropdownQuery();
  const apiQueryApprover = useLazyGetUsersDropdownQuery();
  const newArticleFields = editArticleFieldsFunction?.(
    needApprovals,
    apiQueryFolder,
    apiQueryApprover,
  );

  return {
    editArticleMethods,
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
  };
};
