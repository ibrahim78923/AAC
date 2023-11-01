import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { defaultValues } from './UpsertArticle.data';
import { useRouter } from 'next/router';

import { enqueueSnackbar } from 'notistack';
import { AIR_SERVICES } from '@/constants';

const { KNOWLEDGE_BASE } = AIR_SERVICES;

export const useUpsertArticle = () => {
  const { push } = useRouter();

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const upsertArticleMethods = useForm({
    defaultValues,
  });

  const needApprovals = upsertArticleMethods?.watch('needsApproval');

  const upsertArticleSubmit = async () => {
    enqueueSnackbar({
      message: 'New Article Created successfully',
      variant: 'success',
    });
  };

  const handlePageBack = () => {
    push(KNOWLEDGE_BASE);
  };

  return {
    isDrawerOpen,
    setIsDrawerOpen,
    handlePageBack,
    upsertArticleMethods,
    needApprovals,
    upsertArticleSubmit,
  };
};
