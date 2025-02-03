import Search from '@/components/Search';
import { SingleDropdownButton } from '@/components/Buttons/SingleDropdownButton';
import { Box } from '@mui/material';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_OPERATIONS_WORKFLOWS_SERVICES_WORKFLOW_PERMISSIONS } from '@/constants/permission-keys';
import { Permissions } from '@/constants/permissions';
import { WorkflowListHeaderI } from '@/types/modules/AirOperations/WorkflowAutomation';
import FilterWorkflow from '../../../FilterWorkflow';
import { useTicketsHeader } from './useTicketsHeader';
import { AIR_OPERATIONS } from '@/constants/routes';
import { DeleteWorkflows } from '../../../DeleteWorkflows';
import { AddNewItemButton } from '@/components/Buttons/AddNewItemButton';
import { FilterButton } from '@/components/Buttons/FilterButton';

const TicketsHeader: React.FC<WorkflowListHeaderI> = (props) => {
  const {
    selectedList,
    onSubmitListFilter,
    isDrawerOpen,
    setIsDrawerOpen,
    dropdownOptions,
    router,
    setDeleteWorkflow,
    deleteWorkflow,
    handleWorkflow,
    setPage,
    totalRecords,
    page,
    selectedAction,
    setSelectedAction,
  } = props;

  const { handleSearch } = useTicketsHeader(props);

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 2,
          flexWrap: 'wrap',
        }}
      >
        <PermissionsGuard
          permissions={[
            AIR_OPERATIONS_WORKFLOWS_SERVICES_WORKFLOW_PERMISSIONS?.SEARCH_RECORD,
          ]}
        >
          <Box mb={1}>
            <Search label="Search Here" setSearchBy={handleSearch} />
          </Box>
        </PermissionsGuard>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 2,
            flexWrap: 'wrap',
          }}
        >
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
            <FilterButton onClick={() => setIsDrawerOpen?.(true)}>
              Filter
            </FilterButton>
          </PermissionsGuard>
          <PermissionsGuard
            permissions={[
              AIR_OPERATIONS_WORKFLOWS_SERVICES_WORKFLOW_PERMISSIONS?.CREATE_SUPERVISOR_RULES,
            ]}
          >
            <AddNewItemButton
              name="Create Rules"
              onClick={() =>
                router?.push(AIR_OPERATIONS?.UPSERT_SUPERVISOR_RULES)
              }
              hasStartIcon={false}
            />
          </PermissionsGuard>
        </Box>
      </Box>
      <br />
      {isDrawerOpen && (
        <FilterWorkflow
          isDrawerOpen={isDrawerOpen}
          setIsDrawerOpen={setIsDrawerOpen}
          onSubmitFilter={onSubmitListFilter}
          handleWorkflow={handleWorkflow}
          setPage={setPage}
        />
      )}
      {deleteWorkflow && (
        <DeleteWorkflows
          deleteWorkflow={deleteWorkflow}
          setDeleteWorkflow={setDeleteWorkflow}
          setPage={setPage}
          page={page}
          totalRecords={totalRecords}
          selectedAction={selectedAction}
          setSelectedAction={setSelectedAction}
        />
      )}
    </>
  );
};

export default TicketsHeader;
