import { AgentBioData } from './AgentBioData';
import { Typography } from '@mui/material';
import { PageTitledHeader } from '@/components/PageTitledHeader';
import { AIR_SERVICES } from '@/constants';
import { useRouter } from 'next/router';
import { UpsertAgent } from '../UpsertAgent';
import { useSingleAgentDetail } from './useSingleAgentDetail';
import { PermissionsTabs } from '@/components/Tabs/PermissionsTabs';
import { getSingleAgentsTabsData } from './SingleAgentDetail.data';

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
    agentLevelDetail,
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
        agentLevelDetail={agentLevelDetail}
      />
      <Typography my={3} variant="h3" color="slateBlue.main">
        Associations
      </Typography>

      <PermissionsTabs tabsDataArray={getSingleAgentsTabsData} />

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
