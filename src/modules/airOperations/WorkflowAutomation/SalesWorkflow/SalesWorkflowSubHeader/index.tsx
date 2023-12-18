import Search from '@/components/Search';
import { Box, Button } from '@mui/material';
import { FilterIcon } from '@/assets/icons';
import { SingleDropdownButton } from '@/components/SingleDropdownButton';
import { FilterSalesWorkflow } from '../FilterSalesWorkflow';

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
        <Search label="Search Here" searchBy={search} setSearchBy={setSearch} />
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
          <Button
            variant="outlined"
            onClick={() => setIsFilterOpen?.(true)}
            size="large"
            startIcon={<FilterIcon />}
            color="secondary"
          >
            Filter
          </Button>
        </Box>
      </Box>
      <FilterSalesWorkflow
        isFilterOpen={isFilterOpen}
        setIsFilterOpen={setIsFilterOpen}
      />
    </>
  );
};
