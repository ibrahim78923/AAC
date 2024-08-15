import { useState } from 'react';
import { useRouter } from 'next/router';
import { useTheme } from '@mui/material';
import { AIR_SERVICES } from '@/constants';
import { useGetArticleByIdQuery } from '@/services/airServices/knowledge-base/articles';
import { ArticlesIsPortalOpenI } from '../Articles.interface';

export const useSingleViewArticle = () => {
  const [isPortalOpen, setIsPortalOpen] = useState<ArticlesIsPortalOpenI>({});
  const theme = useTheme();
  const router = useRouter();
  const { articleId } = router?.query;

  const handlePageBack = () => {
    router?.push(AIR_SERVICES?.KNOWLEDGE_BASE);
  };

  const getSingleArticleParameter = {
    pathParam: {
      articleId,
    },
  };
  const { data, isLoading, isFetching, isError, refetch } =
    useGetArticleByIdQuery(getSingleArticleParameter, {
      refetchOnMountOrArgChange: true,
      skip: !!!articleId,
    });

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
    isPortalOpen,
    setIsPortalOpen,
    articleId,
    handleEditSubmit,
    data,
    isLoading,
    isFetching,
    isError,
    router,
    refetch,
  };
};
