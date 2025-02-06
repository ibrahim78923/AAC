import Search from '@/components/Search';
import { Box } from '@mui/material';
import { useRestoreReportsListsHeader } from './useRestoreReportsListsHeader';
import { PublicSingleDropdownButton } from '@/components/Buttons/PublicSingleDropdownButton';
import { restoreReportListsActionComponent } from './RestoreReportsListsHeader.data';
import { CustomButton } from '@/components/Buttons/CustomButton';

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
        <Box display={'flex'} gap={2} alignItems={'center'} flexWrap={'wrap'}>
          <PublicSingleDropdownButton
            dropdownOptions={actionsDropdownForRestoreReportLists}
            disabled={!!!selectedRestoreReportsList?.length}
          />
          <CustomButton onClick={openFilterRestoreReportsPortal}>
            Filter
          </CustomButton>
        </Box>
      </Box>
      {isPortalOpen?.isOpen &&
        restoreReportListsActionComponent?.[isPortalOpen?.action]}
    </>
  );
};
