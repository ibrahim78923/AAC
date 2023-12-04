import Search from '@/components/Search';
import { Box, Button } from '@mui/material';
import { FilterIcon } from '@/assets/icons';
import { SingleDropdownButton } from '@/components/SingleDropdownButton';

export const MarketingWorkflowSubHeader = (props: any) => {
  const {
    onFilterClick,
    marketingWorkflowActionDropdown,
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
        <Search
          label="search"
          width="100%"
          searchBy={search}
          setSearchBy={setSearch}
        />
        <Box
          display={'flex'}
          justifyContent={'space-between'}
          flexWrap={'wrap'}
          gap={'.5rem'}
        >
          <SingleDropdownButton
            dropdownOptions={marketingWorkflowActionDropdown}
            disabled={disabledActionButton}
          />
          <Button
            variant="outlined"
            onClick={() => onFilterClick?.()}
            size="large"
            startIcon={<FilterIcon />}
            color="secondary"
          >
            Filter
          </Button>
        </Box>
      </Box>
    </>
  );
};
