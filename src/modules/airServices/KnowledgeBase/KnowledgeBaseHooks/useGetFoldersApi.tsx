import useAuth from '@/hooks/useAuth';
import { useLazyGetServicesKnowledgeBaseFoldersListForFilterQuery } from '@/services/airServices/knowledge-base/articles';
import { getActiveAccountSession } from '@/utils';
import { useMemo } from 'react';

export const useGetFoldersApi = () => {
  const auth: any = useAuth();
  const product = useMemo(() => getActiveAccountSession(), []);
  const companyId = product?.company?._id ?? {};
  const userId = auth?.user?._id ?? {};
  const organizationId = auth?.user?.organization?._id ?? {};

  const [
    lazyGetArticlesFoldersForFilterTrigger,
    lazyGetArticlesFoldersForFilterStatus,
  ] = useLazyGetServicesKnowledgeBaseFoldersListForFilterQuery();

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
