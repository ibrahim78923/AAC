import { useState } from 'react';
import { useRouter } from 'next/router';
import { useTheme } from '@mui/material';
import { enqueueSnackbar } from 'notistack';
import { AIR_SERVICES } from '@/constants';

export const useSingleViewArticle = () => {
  const [openDelete, setOpenDelete] = useState<boolean>(false);
  const theme = useTheme();
  const { push } = useRouter();
  const { KNOWLEDGE_BASE } = AIR_SERVICES;
  const handlePageBack = () => {
    push(KNOWLEDGE_BASE);
  };
  const handleDeleteSubmit = () => {
    enqueueSnackbar('Article deleted successfully', {
      variant: 'success',
    });
    setOpenDelete(false);
    push(KNOWLEDGE_BASE);
  };
  const handleEditSubmit = () => {
    push({
      pathname: AIR_SERVICES?.UPSERT_ARTICLE,
    });
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
