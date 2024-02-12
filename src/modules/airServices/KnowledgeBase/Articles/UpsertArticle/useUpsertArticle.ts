import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { useTheme } from '@mui/material';
import { enqueueSnackbar } from 'notistack';
import { AIR_SERVICES } from '@/constants';
import { NOTISTACK_VARIANTS } from '@/constants/strings';
import {
  useGetArticleByIdQuery,
  useGetFoldersQuery,
} from '@/services/airServices/assets/knowledge-base/articles';
import { defaultValues, editArticleFieldsFunction } from './UpsertArticle.data';

const { KNOWLEDGE_BASE, KNOWLEDGE_BASE_VIEW_ARTICLE } = AIR_SERVICES;

export const useUpsertArticle = () => {
  const { push, query } = useRouter();
  const articleId = query?.articleId;
  const { data } = useGetArticleByIdQuery(articleId);
  const articleData = data?.data;
  const { data: folderData } = useGetFoldersQuery({});
  const folderOptions =
    folderData?.data?.map?.((folder: any) => ({
      value: folder?._id,
      label: folder?.name,
    })) ?? [];

  const editArticleMethods = useForm({
    defaultValues: defaultValues(articleData),
  });
  const { reset } = editArticleMethods;
  useEffect(() => {
    reset(() => defaultValues(articleData));
  }, [articleId, data, reset]);

  const needApprovals = editArticleMethods?.watch('needsApproval');
  const editArticleSubmit = async () => {
    enqueueSnackbar({
      message: 'New Article Created successfully',
      variant: NOTISTACK_VARIANTS?.SUCCESS,
    });
    push(KNOWLEDGE_BASE_VIEW_ARTICLE);
  };
  const handlePageBack = () => {
    push(KNOWLEDGE_BASE);
  };
  const theme = useTheme();
  const newArticleFields = editArticleFieldsFunction?.(
    needApprovals,
    folderOptions,
  );
  return {
    handlePageBack,
    editArticleMethods,
    needApprovals,
    editArticleSubmit,
    theme,
    articleData,
    folderOptions,
    newArticleFields,
    articleId,
  };
};
