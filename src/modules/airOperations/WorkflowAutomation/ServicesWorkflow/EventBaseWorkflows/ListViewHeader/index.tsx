import { FilterSharedIcon } from '@/assets/icons';
import Search from '@/components/Search';
import { SingleDropdownButton } from '@/components/SingleDropdownButton';
import { Box, Button } from '@mui/material';
import { AIR_OPERATIONS } from '@/constants';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_OPERATIONS_WORKFLOWS_SERVICES_WORKFLOW_PERMISSIONS } from '@/constants/permission-keys';
import { Permissions } from '@/constants/permissions';
import FilterWorkflow from '../../FilterWorkflow';
import { EventBasedWorkflowDelete } from '../EventBasedWorkflowDelete';
import { useListHeader } from './useListHeader';
import { WorkflowListHeaderI } from '@/types/modules/AirOperations/WorkflowAutomation';

const ListViewHeader: React.FC<WorkflowListHeaderI> = (props) => {
  const {
    selectedList,
    setSearch,
    search,
    onSubmitListFilter,
    isDrawerOpen,
    setIsDrawerOpen,
    dropdownOptions,
    router,
    setDeleteWorkflow,
    deleteWorkflow,
    handleWorkflow,
  } = props;
  const { handleDelete, deleteStatus } = useListHeader(props);
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
              label="Search Here"
              searchBy={search}
              setSearchBy={setSearch}
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
              disabled={selectedList}
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
              AIR_OPERATIONS_WORKFLOWS_SERVICES_WORKFLOW_PERMISSIONS?.CREATE_EVENTBASE_WORKFLOW,
            ]}
          >
            <Button
              variant="contained"
              onClick={() =>
                router?.push(AIR_OPERATIONS?.UPSERT_EVENT_BASED_WORKFLOW)
              }
            >
              Create Event base Workflow
            </Button>
          </PermissionsGuard>
        </Box>
      </Box>
      <FilterWorkflow
        isDrawerOpen={isDrawerOpen}
        setIsDrawerOpen={setIsDrawerOpen}
        onSubmitFilter={onSubmitListFilter}
        handleWorkflow={handleWorkflow}
      />
      <EventBasedWorkflowDelete
        deleteWorkflow={deleteWorkflow}
        setDeleteWorkflow={setDeleteWorkflow}
        handleDelete={handleDelete}
        deleteStatus={deleteStatus}
      />
    </>
  );
};

export default ListViewHeader;
