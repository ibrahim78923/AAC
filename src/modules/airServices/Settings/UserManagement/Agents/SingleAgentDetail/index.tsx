import { AgentBioData } from './AgentBioData';
import { Typography } from '@mui/material';
import { PageTitledHeader } from '@/components/PageTitledHeader';
import { AIR_SERVICES } from '@/constants/routes';
import { useRouter } from 'next/router';
import { UpsertAgent } from '../UpsertAgent';
import { useSingleAgentDetail } from './useSingleAgentDetail';
import { PermissionsTabs } from '@/components/Tabs/PermissionsTabs';
import { getSingleAgentsTabsData } from './SingleAgentDetail.data';
import { SKELETON_TYPES } from '@/constants/mui-constant';
import { ApiRequestFlow } from '@/components/ApiRequestStates/ApiRequestFlow';

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
    refetch,
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
      <ApiRequestFlow
        showSkeleton={isLoading || isFetching}
        hasError={isError}
        refreshApi={refetch}
        errorHeight="40vh"
        length={3}
        skeletonType={SKELETON_TYPES?.GRID}
      >
        <AgentBioData
          data={data}
          isLoading={isLoading}
          isFetching={isFetching}
          isError={isError}
          departmentDetails={departmentDetails}
          handleEditButtonClick={() => setIsAgentModalOpen?.(true)}
          agentLevelDetail={agentLevelDetail}
        />
      </ApiRequestFlow>

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
