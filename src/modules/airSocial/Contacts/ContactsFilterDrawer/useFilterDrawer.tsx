import useAuth from '@/hooks/useAuth';
import {
  useLazyGetContactsLifeCycleStagesQuery,
  useLazyGetContactsOwnerListQuery,
  useLazyGetContactsStatusListQuery,
} from '@/services/commonFeatures/contacts';

const useFilterDrawer = () => {
  const { user }: any = useAuth();
  const orgId = user?.organization?._id;

  const contactOwnerData = useLazyGetContactsOwnerListQuery();
  const contactStatusData = useLazyGetContactsStatusListQuery();
  const lifeCycleStagesData = useLazyGetContactsLifeCycleStagesQuery();

  return {
    orgId,
    contactOwnerData,
    lifeCycleStagesData,
    contactStatusData,
  };
};

export default useFilterDrawer;
