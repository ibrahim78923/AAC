import { useState } from 'react';
import { NextRouter, useRouter } from 'next/router';
import { Theme, useTheme } from '@mui/material';
import { AIR_SERVICES } from '@/constants';
import { useGetArticleByIdQuery } from '@/services/airServices/knowledge-base/articles';
import { ArticlesIsPortalOpenI } from '../Articles.interface';

export const useSingleViewArticle = () => {
  const [isPortalOpen, setIsPortalOpen] = useState<ArticlesIsPortalOpenI>({});
  const theme: Theme = useTheme();
  const router: NextRouter = useRouter();
  const { articleId } = router?.query;

  const handlePageBack = () => {
    router?.push(AIR_SERVICES?.KNOWLEDGE_BASE);
  };

  const getSingleArticleParameter = {
    pathParam: {
      articleId,
    },
  };
  const {
    data,
    isLoading,
    isFetching,
    isError,
    refetch,
  }: { [key: string]: any } = useGetArticleByIdQuery(
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
