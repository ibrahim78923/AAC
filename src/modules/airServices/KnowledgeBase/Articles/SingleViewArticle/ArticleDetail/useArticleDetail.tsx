import { ARRAY_INDEX } from '@/constants/strings';
import useAuth from '@/hooks/useAuth';
import { useLazyGetArticleByIdQuery } from '@/services/airServices/knowledge-base/articles';
import { Theme, useTheme } from '@mui/material';
import { NextRouter, useRouter } from 'next/router';
import { useEffect } from 'react';
import { sideData } from './ArticleDetail.data';

export const useArticleDetail = () => {
  const theme: Theme = useTheme();
  const router: NextRouter = useRouter();
  const { articleId } = router?.query;

  const auth: any = useAuth();
  const [lazyGetArticleByIdTrigger, lazyGetArticleByIdStatus] =
    useLazyGetArticleByIdQuery();

  const { _id: companyId } =
    auth?.product?.accounts?.[ARRAY_INDEX?.ZERO]?.company ?? {};

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
  };
};
