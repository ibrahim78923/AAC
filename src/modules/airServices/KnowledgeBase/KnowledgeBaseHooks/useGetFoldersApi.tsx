import useAuth from '@/hooks/useAuth';
import { useLazyGetArticlesFoldersForFilterQuery } from '@/services/airServices/knowledge-base/articles';
import { getActiveAccountSession } from '@/utils';
import { useMemo } from 'react';

export const useGetFoldersApi = () => {
  const auth: any = useAuth();
  const product = useMemo(() => getActiveAccountSession(), []);
  const companyId = product?.company?._id ?? {};
  const { _id: userId } = auth?.user;
  const { _id: organizationId } = auth?.user?.organization;

  const [
    lazyGetArticlesFoldersForFilterTrigger,
    lazyGetArticlesFoldersForFilterStatus,
  ] = useLazyGetArticlesFoldersForFilterQuery();

  const getArticlesFolderListForFilterData = async () => {
    const apiDataParameter = {
      queryParams: {
        userId,
        companyId,
        organizationId,
      },
    };
    try {
      await lazyGetArticlesFoldersForFilterTrigger(apiDataParameter)?.unwrap();
    } catch (error: any) {}
  };

  return {
    getArticlesFolderListForFilterData,
    lazyGetArticlesFoldersForFilterStatus,
  };
};
