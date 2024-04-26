import {
  useGetContactsStatusQuery,
  useGetLifeCycleQuery,
} from '@/services/commonFeatures/contacts';
import { useGetOrganizationUsersQuery } from '@/services/dropdowns';

import useAuth from '@/hooks/useAuth';

const useFilterDrawer = () => {
  const { user }: any = useAuth();
  const { data: ContactOwners } = useGetOrganizationUsersQuery(
    user?.organization?._id,
  );

  const { data: lifeCycleStages } = useGetLifeCycleQuery({});

  const { data: ContactsStatus } = useGetContactsStatusQuery({});

  const contactOwnerData = ContactOwners?.data?.users?.map((user: any) => ({
    value: user?._id,
    label: `${user?.firstName} ${user?.lastName}`,
  }));

  const contactStatusData = ContactsStatus?.data?.conatactStatus?.map(
    (status: any) => ({ value: status?._id, label: status?.name }),
  );

  const lifeCycleStagesData = lifeCycleStages?.data?.lifecycleStages?.map(
    (stage: any) => ({ value: stage?._id, label: stage?.name }),
  );

  return {
    contactOwnerData,
    lifeCycleStagesData,
    contactStatusData,
  };
};

export default useFilterDrawer;
