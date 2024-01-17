import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { useTheme } from '@mui/material';
import { enqueueSnackbar } from 'notistack';
import { AIR_SERVICES } from '@/constants';
import { defaultValues } from './EditArticle.data';
import { NOTISTACK_VARIANTS } from '@/constants/strings';
import {
  useGetArticleByIdQuery,
  useGetFoldersQuery,
} from '@/services/airServices/assets/knowledge-base/articles';

const { KNOWLEDGE_BASE, KNOWLEDGE_BASE_VIEW_ARTICLE } = AIR_SERVICES;

export const useEditArticle = () => {
  const { push, query } = useRouter();
  const articleId = query?.id;
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
  useEffect(() => {
    editArticleMethods?.reset(defaultValues(articleData));
  }, [articleId, data]);
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
  return {
    handlePageBack,
    editArticleMethods,
    needApprovals,
    editArticleSubmit,
    theme,
    articleData,
    folderOptions,
  };
};
