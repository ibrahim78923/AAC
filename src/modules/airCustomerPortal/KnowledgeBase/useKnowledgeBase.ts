import { NextRouter, useRouter } from 'next/router';
import { useMemo, useState } from 'react';
import { useGetKnowledgeBaseFolderQuery } from '@/services/airCustomerPortal/KnowledgeBase';
import {
  getActiveAccountSession,
  getCustomerPortalPermissions,
  getSession,
} from '@/utils';
import { ARRAY_INDEX } from '@/constants/strings';

export const useKnowledgeBase = () => {
  const router: NextRouter = useRouter();
  const [search, setSearch] = useState<string>('');

  const customerPortalPermissions = getCustomerPortalPermissions();
  const product = useMemo(() => getActiveAccountSession(), []);
  const session: any = getSession();
  const sessionId = session?.user?.companyId;
  const companyIdStorage = product?.company?._id;

  const { companyId } = router?.query;
  const decryptedId = useMemo(() => {
    const id = Array.isArray(companyId)
      ? companyId[ARRAY_INDEX?.ZERO]
      : companyId;
    return atob(id ?? '');
  }, [companyId]);

  const apiDataParameter = {
    queryParams: {
      search,
      companyId: decryptedId || companyIdStorage || sessionId,
      organizationId: customerPortalPermissions?.organizationId,
    },
  };

  const { data, isLoading, isFetching, isError, refetch } =
    useGetKnowledgeBaseFolderQuery(apiDataParameter, {
      refetchOnMountOrArgChange: true,
    });

  const knowledgeBaseFolderData = data?.data;

  return {
    knowledgeBaseFolderData,
    isLoading,
    isFetching,
    isError,
    setSearch,
    refetch,
    router,
  };
};
