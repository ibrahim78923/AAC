import { useState } from 'react';
import { useRouter } from 'next/router';
import { useTheme } from '@mui/material';
import { AIR_SERVICES } from '@/constants';
import { useGetArticleByIdQuery } from '@/services/airServices/assets/knowledge-base/articles';

export const useSingleViewArticle = () => {
  const [openDelete, setOpenDelete] = useState<boolean>(false);
  const theme = useTheme();
  const router = useRouter();
  const { articleId } = router?.query;
  const { KNOWLEDGE_BASE } = AIR_SERVICES;
  const handlePageBack = () => {
    router?.push(KNOWLEDGE_BASE);
  };

  const getSingleArticleParameter = {
    pathParam: {
      articleId,
    },
  };
  const { data, isLoading, isFetching, isError } = useGetArticleByIdQuery(
    getSingleArticleParameter,
    {
      refetchOnMountOrArgChange: true,
      skip: !!!articleId,
    },
  );

  const handleEditSubmit = () => {
    router?.push({
      pathname: AIR_SERVICES?.UPSERT_ARTICLE,
      query: {
        articleId,
      },
    });
  };
  return {
    handlePageBack,
    theme,
    openDelete,
    articleId,
    setOpenDelete,
    handleEditSubmit,
    data,
    isLoading,
    isFetching,
    isError,
  };
};
