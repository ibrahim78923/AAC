import { FilterSharedIcon } from '@/assets/icons';
import Search from '@/components/Search';
import { SingleDropdownButton } from '@/components/SingleDropdownButton';
import { Box, Button } from '@mui/material';
import FilterWorkflow from '../../../FilterWorkflow';
import { useTasksHeader } from './useTasksHeader';
import { AIR_OPERATIONS } from '@/constants';
import { EventBasedWorkflowDelete } from '../../EventBasedWorkflowDelete';
import { Permissions } from '@/constants/permissions';
import { AIR_OPERATIONS_WORKFLOWS_SERVICES_WORKFLOW_PERMISSIONS } from '@/constants/permission-keys';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';

const TasksHeader = ({
  selectedTasksList,
  setSearch,
  search,
  onSubmitTaskFilter,
  isDrawerOpen,
  setIsDrawerOpen,
}: any) => {
  const { dropdownOptions, router, setDeleteWorkflow, deleteWorkflow } =
    useTasksHeader();
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
              disabled={!!!selectedTasksList?.length}
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
        onSubmitFilter={onSubmitTaskFilter}
      />
      <EventBasedWorkflowDelete
        deleteWorkflow={deleteWorkflow}
        setDeleteWorkflow={setDeleteWorkflow}
      />
    </>
  );
};

export default TasksHeader;
