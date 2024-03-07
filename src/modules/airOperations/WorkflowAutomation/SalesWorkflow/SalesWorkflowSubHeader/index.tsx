import Search from '@/components/Search';
import { Box, Button } from '@mui/material';
import { FilterIcon } from '@/assets/icons';
import { SingleDropdownButton } from '@/components/SingleDropdownButton';
import { FilterSalesWorkflow } from '../FilterSalesWorkflow';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_OPERATIONS_WORKFLOWS_SALES_WORKFLOW_PERMISSIONS } from '@/constants/permission-keys';

export const SalesWorkflowSubHeader = (props: any) => {
  const {
    isFilterOpen,
    setIsFilterOpen,
    salesWorkflowActionDropdown,
    search,
    setSearch,
    disabledActionButton,
  } = props;
  return (
    <>
      <Box
        display={'flex'}
        gap={'1rem'}
        justifyContent={'space-between'}
        flexWrap={'wrap'}
      >
        <PermissionsGuard
          permissions={[
            AIR_OPERATIONS_WORKFLOWS_SALES_WORKFLOW_PERMISSIONS?.SEARCH_RECORD,
          ]}
        >
          <Search
            label="Search Here"
            searchBy={search}
            setSearchBy={setSearch}
          />
        </PermissionsGuard>
        <Box
          display={'flex'}
          justifyContent={'space-between'}
          flexWrap={'wrap'}
          gap={'.5rem'}
        >
          <SingleDropdownButton
            dropdownOptions={salesWorkflowActionDropdown}
            disabled={disabledActionButton}
          />
          <PermissionsGuard
            permissions={[
              AIR_OPERATIONS_WORKFLOWS_SALES_WORKFLOW_PERMISSIONS?.FILTER_RECORD,
            ]}
          >
            <Button
              variant="outlined"
              onClick={() => setIsFilterOpen?.(true)}
              size="large"
              startIcon={<FilterIcon />}
              color="secondary"
            >
              Filter
            </Button>
          </PermissionsGuard>
        </Box>
      </Box>
      <FilterSalesWorkflow
        isFilterOpen={isFilterOpen}
        setIsFilterOpen={setIsFilterOpen}
      />
    </>
  );
};
