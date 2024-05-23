import useAuth from '@/hooks/useAuth';
import { useLazyGetOrganizationUsersQuery } from '@/services/dropdowns';
import {
  useLazyGetLifeCycleStagesQuery,
  useLazyGetContactsStatusQuery,
} from '@/services/common-APIs';

const useFilterDrawer = () => {
  const { user }: any = useAuth();
  const orgId = user?.organization?._id;

  const contactOwnerData = useLazyGetOrganizationUsersQuery();
  const contactStatusData = useLazyGetContactsStatusQuery();
  const lifeCycleStagesData = useLazyGetLifeCycleStagesQuery();

  return {
    orgId,
    contactOwnerData,
    lifeCycleStagesData,
    contactStatusData,
  };
};

export default useFilterDrawer;
