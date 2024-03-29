import HorizontalTabs from '@/components/Tabs/HorizontalTabs';
import { Tickets } from './Tickets';
import { Tasks } from './Tasks';
import { Assets } from './Assets';
import { Software } from './Software';
import { AgentBioData } from './AgentBioData';
import { Typography } from '@mui/material';
import { PageTitledHeader } from '@/components/PageTitledHeader';
import { AIR_SERVICES } from '@/constants';
import { useRouter } from 'next/router';
import { UpsertAgent } from '../UpsertAgent';
import { useSingleAgentDetail } from './useSingleAgentDetail';

export const SingleAgentDetail = () => {
  const router = useRouter();
  const {
    data,
    isLoading,
    isFetching,
    isError,
    departmentDetails,
    isAgentModalOpen,
    setIsAgentModalOpen,
    permissionRoleDetails,
  }: any = useSingleAgentDetail();
  return (
    <>
      <PageTitledHeader
        moveBack={() =>
          router?.push({
            pathname: AIR_SERVICES?.AGENTS_SETTINGS,
          })
        }
        canMovedBack
        title={'Profile'}
      />
      <AgentBioData
        data={data}
        isLoading={isLoading}
        isFetching={isFetching}
        isError={isError}
        departmentDetails={departmentDetails}
        handleEditButtonClick={() => setIsAgentModalOpen?.(true)}
      />
      <Typography my={3} variant="h3" color="slateBlue.main">
        Associations
      </Typography>
      <HorizontalTabs
        tabsDataArray={['Tickets', 'Tasks', 'Assets', 'Software']}
      >
        <Tickets />
        <Tasks />
        <Assets />
        <Software />
      </HorizontalTabs>
      {isAgentModalOpen && (
        <UpsertAgent
          isAgentModalOpen={isAgentModalOpen}
          setIsAgentModalOpen={setIsAgentModalOpen}
          selectedAgentList={[
            {
              ...data?.data,
              departmentData: departmentDetails?.data?.data,
              accountsPermissions: permissionRoleDetails?.data?.data,
            },
          ]}
        />
      )}
    </>
  );
};
