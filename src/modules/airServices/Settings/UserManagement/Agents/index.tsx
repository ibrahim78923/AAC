import HorizontalTabs from '@/components/Tabs/HorizontalTabs';
import Agent from './Agent';
import AgentRequest from './AgentRequest';
import { AIR_SERVICES } from '@/constants';
import { useRouter } from 'next/router';
import { PageTitledHeader } from '@/components/PageTitledHeader';

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
      <HorizontalTabs tabsDataArray={agentsDataArray}>
        <Agent />
        <AgentRequest />
      </HorizontalTabs>
    </>
  );
};

export default Agents;
