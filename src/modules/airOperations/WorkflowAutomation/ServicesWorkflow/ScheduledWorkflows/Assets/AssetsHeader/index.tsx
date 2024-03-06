import { FilterSharedIcon } from '@/assets/icons';
import Search from '@/components/Search';
import { SingleDropdownButton } from '@/components/SingleDropdownButton';
import { Box, Button } from '@mui/material';
import FilterWorkflow from '../../../FilterWorkflow';
import { useAssetsHeader } from './useAssetsHeader';
import { AIR_OPERATIONS } from '@/constants';
import { ScheduledWorkflowDelete } from '../../ScheduledWorkflowDelete';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_OPERATIONS_WORKFLOWS_SERVICES_WORKFLOW_PERMISSIONS } from '@/constants/permission-keys';
import { Permissions } from '@/constants/permissions';

const AssetsHeader = ({ selectedAssetsList }: any) => {
  const {
    searchValue,
    setSearchValue,
    isDrawerOpen,
    setIsDrawerOpen,
    dropdownOptions,
    router,
    setDeleteWorkflow,
    deleteWorkflow,
  } = useAssetsHeader();
  return (
    <>
      <Box display={'flex'} justifyContent={'space-between'}>
        <Box mb={1}>
          <PermissionsGuard
            permissions={[
              AIR_OPERATIONS_WORKFLOWS_SERVICES_WORKFLOW_PERMISSIONS?.SEARCH_RECORD,
            ]}
          >
            <Search
              value={searchValue}
              label="Search Here"
              setSearchBy={setSearchValue}
              onChange={(e: any) => setSearchValue(e?.target?.value)}
            />
          </PermissionsGuard>
        </Box>
        <Box display={'flex'} alignItems={'center'} flexWrap={'wrap'} gap={1.5}>
          <PermissionsGuard
            permissions={
              Permissions?.AIR_OPERATIONS_WORKFLOWS_SERVICES_WORKFLOW
            }
          >
            <SingleDropdownButton
              dropdownOptions={dropdownOptions}
              disabled={!!!selectedAssetsList?.length}
            />
          </PermissionsGuard>
          <PermissionsGuard
            permissions={[
              AIR_OPERATIONS_WORKFLOWS_SERVICES_WORKFLOW_PERMISSIONS?.FILTER_RECORD,
            ]}
          >
            <Button
              color="secondary"
              variant="outlined"
              startIcon={<FilterSharedIcon />}
              onClick={() => setIsDrawerOpen?.(true)}
            >
              Filter
            </Button>
          </PermissionsGuard>
          <PermissionsGuard
            permissions={[
              AIR_OPERATIONS_WORKFLOWS_SERVICES_WORKFLOW_PERMISSIONS?.CREATE_SCHEDULE_WORKFLOW,
            ]}
          >
            <Button
              variant="contained"
              onClick={() =>
                router?.push(AIR_OPERATIONS?.UPSERT_SCHEDULE_WORKFLOW)
              }
            >
              Create Scheduled workflows
            </Button>
          </PermissionsGuard>
        </Box>
      </Box>
      <FilterWorkflow
        isDrawerOpen={isDrawerOpen}
        setIsDrawerOpen={setIsDrawerOpen}
      />
      <ScheduledWorkflowDelete
        deleteWorkflow={deleteWorkflow}
        setDeleteWorkflow={setDeleteWorkflow}
      />
    </>
  );
};

export default AssetsHeader;
