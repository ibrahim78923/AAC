import { AIR_SERVICES } from '@/constants/routes';
import { useRouter } from 'next/router';
import { PageTitledHeader } from '@/components/PageTitledHeader';
import { PermissionsTabs } from '@/components/Tabs/PermissionsTabs';
import { getAgentsTabsData } from './Agents.data';

export const agentsDataArray = ['Agent', 'Agents Request'];

const Agents = () => {
  const router = useRouter();
  return (
    <>
      <PageTitledHeader
        moveBack={() =>
          router?.push({
            pathname: AIR_SERVICES?.USER_MANAGEMENT,
          })
        }
        canMovedBack
        title={'Agents'}
      />

      <PermissionsTabs tabsDataArray={getAgentsTabsData} />
    </>
  );
};

export default Agents;
