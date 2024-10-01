import { Theme, useTheme } from '@mui/material';
import { NextRouter, useRouter } from 'next/router';
import { useEffect, useMemo } from 'react';
import { sideData } from './ArticleDetail.data';
import { useLazyGetServicesKnowledgeBaseSingleArticleByIdQuery } from '@/services/airServices/knowledge-base/articles';
import { getActiveAccountSession } from '@/utils';

export const useArticleDetail = () => {
  const theme: Theme = useTheme();
  const router: NextRouter = useRouter();
  const { articleId } = router?.query;

  const product = useMemo(() => getActiveAccountSession(), []);
  const companyId = product?.company?._id ?? {};

  const [lazyGetArticleByIdTrigger, lazyGetArticleByIdStatus] =
    useLazyGetServicesKnowledgeBaseSingleArticleByIdQuery();

  const getSingleArticle = async () => {
    const getSingleArticleParameter = {
      pathParam: {
        articleId,
        companyId,
      },
    };
    try {
      await lazyGetArticleByIdTrigger(getSingleArticleParameter)?.unwrap();
    } catch (error) {}
  };

  useEffect(() => {
    if (!!articleId && !!companyId) getSingleArticle();
  }, [articleId, companyId]);

  const showLoader =
    lazyGetArticleByIdStatus?.isLoading || lazyGetArticleByIdStatus?.isFetching;
  const showError = lazyGetArticleByIdStatus?.isError;
  const data = lazyGetArticleByIdStatus?.data;
  const isApiCalled =
    !lazyGetArticleByIdStatus?.data && !lazyGetArticleByIdStatus?.error;

  const articleDetails = sideData?.(data?.data);

  return {
    theme,
    articleId,
    data,
    showLoader,
    router,
    showError,
    getSingleArticle,
    articleDetails,
    isApiCalled,
  };
};
