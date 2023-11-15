import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { useTheme } from '@mui/material';
import { enqueueSnackbar } from 'notistack';
import { AIR_SERVICES } from '@/constants';
import { defaultValues } from './EditArticle.data';

const { KNOWLEDGE_BASE, KNOWLEDGE_BASE_VIEW_ARTICLE } = AIR_SERVICES;

export const useEditArticle = () => {
  const { push } = useRouter();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const editArticleMethods = useForm({
    defaultValues,
  });
  const needApprovals = editArticleMethods?.watch('needsApproval');
  const editArticleSubmit = async () => {
    enqueueSnackbar({
      message: 'New Article Created successfully',
      variant: 'success',
    });
    push(KNOWLEDGE_BASE_VIEW_ARTICLE);
  };
  const handlePageBack = () => {
    push(KNOWLEDGE_BASE);
  };
  const theme = useTheme();
  return {
    isDrawerOpen,
    setIsDrawerOpen,
    handlePageBack,
    editArticleMethods,
    needApprovals,
    editArticleSubmit,
    theme,
  };
};
