import Search from '@/components/Search';
import { Box } from '@mui/material';
import { useManageDashboardHeader } from './useManageDashboardHeader';
import { renderPortalComponent } from './ManageDashboardHeader.data';
import { CustomButton } from '@/components/Buttons/CustomButton';

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
        <CustomButton onClick={openFilterPortal}>Filter</CustomButton>
      </Box>
      {isPortalOpen?.isOpen && renderPortalComponent?.[isPortalOpen?.action]}
    </>
  );
};
