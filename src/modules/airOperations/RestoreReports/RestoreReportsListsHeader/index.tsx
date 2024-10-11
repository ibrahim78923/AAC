import Search from '@/components/Search';
import { Box, Button } from '@mui/material';
import { FilterIcon } from '@/assets/icons';
import { useRestoreReportsListsHeader } from './useRestoreReportsListsHeader';
import { PublicSingleDropdownButton } from '@/components/PublicSingleDropdownButton';
import { restoreReportListsActionComponent } from './RestoreReportsListsHeader.data';

export const RestoreReportsListsHeader = () => {
  const {
    openFilterRestoreReportsPortal,
    actionsDropdownForRestoreReportLists,
    selectedRestoreReportsList,
    handleSetSearch,
    isPortalOpen,
  } = useRestoreReportsListsHeader();

  return (
    <>
      <Box
        display={'flex'}
        justifyContent={'space-between'}
        alignItems={'center'}
        gap={2}
        flexWrap={'wrap'}
      >
        <Box>
          <Search label="Search Here" setSearchBy={handleSetSearch} />
        </Box>
        <Box display={'flex'} gap={2} flexWrap={'wrap'}>
          <PublicSingleDropdownButton
            dropdownOptions={actionsDropdownForRestoreReportLists}
            disabled={!!!selectedRestoreReportsList?.length}
          />
          <Button
            className="small"
            variant="outlined"
            color="inherit"
            startIcon={<FilterIcon />}
            onClick={openFilterRestoreReportsPortal}
          >
            Filter
          </Button>
        </Box>
      </Box>
      {isPortalOpen?.isOpen &&
        restoreReportListsActionComponent?.[isPortalOpen?.action]}
    </>
  );
};
