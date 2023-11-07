import { useState } from 'react';
import { useRouter } from 'next/router';
import { useTheme } from '@mui/material';
import { enqueueSnackbar } from 'notistack';
import { AIR_SERVICES } from '@/constants';

export const useViewArticlesDetail = () => {
  const [openDelete, setOpenDelete] = useState<boolean>(false);
  const theme = useTheme();
  const { push } = useRouter();
  const { KNOWLEDGE_BASE, KNOWLEDGE_BASE_EDIT_ARTICLE } = AIR_SERVICES;
  const handlePageBack = () => {
    push(KNOWLEDGE_BASE);
  };
  const handleDeleteSubmit = () => {
    enqueueSnackbar('Article deleted successfully', {
      variant: 'success',
      autoHideDuration: 2000,
    });
    setOpenDelete(false);
    push(KNOWLEDGE_BASE);
  };
  const handleEditSubmit = () => {
    push(KNOWLEDGE_BASE_EDIT_ARTICLE);
  };
  return {
    handlePageBack,
    theme,
    openDelete,
    setOpenDelete,
    handleDeleteSubmit,
    handleEditSubmit,
  };
};
