import { FilterSharedIcon } from '@/assets/icons';
import Search from '@/components/Search';
import { Box, Button } from '@mui/material';
import { useManageDashboardHeader } from './useManageDashboardHeader';
import { renderPortalComponent } from './ManageDashboardHeader.data';

export const ManageDashboardHeader = () => {
  const { openFilterPortal, handleSearch, isPortalOpen } =
    useManageDashboardHeader();

  return (
    <>
      <Box
        display={'flex'}
        justifyContent={'space-between'}
        alignItems={'center'}
        gap={2}
        flexWrap={'wrap'}
        p={2}
      >
        <Search label="Search Here" setSearchBy={handleSearch} />
        <Button
          className="small"
          variant="outlined"
          color="secondary"
          startIcon={<FilterSharedIcon />}
          onClick={openFilterPortal}
        >
          Filter
        </Button>
      </Box>
      {isPortalOpen?.isOpen && renderPortalComponent?.[isPortalOpen?.action]}
    </>
  );
};
