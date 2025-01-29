import { Header } from './Header';
import { ArticleDetail } from './ArticleDetail';
import { NextRouter, useRouter } from 'next/router';
import SkeletonTable from '@/components/Skeletons/SkeletonTable';
import NoData from '@/components/NoData';

export const SingleViewArticle = () => {
  const router: NextRouter = useRouter();
  const { articleId } = router?.query;

  if (!router?.isReady) return <SkeletonTable />;

  if (!!!articleId)
    return (
      <>
        <Header />
        <NoData message="No Article Found" />
      </>
    );

  return (
    <>
      <Header />
      <ArticleDetail />
    </>
  );
};
