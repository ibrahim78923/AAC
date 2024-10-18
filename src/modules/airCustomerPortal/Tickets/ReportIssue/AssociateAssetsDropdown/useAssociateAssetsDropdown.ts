import { ARRAY_INDEX } from '@/constants/strings';
import { useLazyGetAssociateAssetsDropdownByCompanyIdQuery } from '@/services/airCustomerPortal/Tickets';
import { getActiveAccountSession, getSession } from '@/utils';
import { useRouter } from 'next/router';
import { useMemo } from 'react';

export const useAssociateAssetsDropdown = () => {
  const router = useRouter();
  const { companyId } = router?.query;
  const product = useMemo(() => getActiveAccountSession(), []);
  const session: any = useMemo(() => getSession(), []);
  const sessionId = session?.user?.companyId;
  const companyIdStorage = product?.company?._id;
  const decryptedId = useMemo(() => {
    const id = Array.isArray(companyId)
      ? companyId[ARRAY_INDEX?.ZERO]
      : companyId;
    return atob(id ?? '');
  }, [companyId]);
  const getCompanyId = decryptedId || companyIdStorage || sessionId;
  const apiQueryAssociateAsset =
    useLazyGetAssociateAssetsDropdownByCompanyIdQuery();
  return {
    getCompanyId,
    apiQueryAssociateAsset,
  };
};
