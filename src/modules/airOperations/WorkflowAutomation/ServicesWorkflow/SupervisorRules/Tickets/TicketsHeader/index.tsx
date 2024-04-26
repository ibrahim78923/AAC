import { FilterSharedIcon } from '@/assets/icons';
import Search from '@/components/Search';
import { SingleDropdownButton } from '@/components/SingleDropdownButton';
import { Box, Button } from '@mui/material';
import { AIR_OPERATIONS } from '@/constants';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_OPERATIONS_WORKFLOWS_SERVICES_WORKFLOW_PERMISSIONS } from '@/constants/permission-keys';
import { Permissions } from '@/constants/permissions';
import FilterWorkflow from '../../../FilterWorkflow';
import { WorkflowDelete } from '../../WorkflowDelete';
import { useTicketsHeader } from './useTicketsHeader';

const TicketsHeader = (props: any) => {
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
  const { handleDelete, deleteStatus } = useTicketsHeader(props);
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
              AIR_OPERATIONS_WORKFLOWS_SERVICES_WORKFLOW_PERMISSIONS?.CREATE_SUPERVISOR_RULES,
            ]}
          >
            <Button
              variant="contained"
              onClick={() =>
                router?.push(AIR_OPERATIONS?.UPSERT_SUPERVISOR_RULES)
              }
            >
              Create Rules
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
      <WorkflowDelete
        deleteWorkflow={deleteWorkflow}
        setDeleteWorkflow={setDeleteWorkflow}
        handleDelete={handleDelete}
        deleteStatus={deleteStatus}
      />
    </>
  );
};

export default TicketsHeader;
