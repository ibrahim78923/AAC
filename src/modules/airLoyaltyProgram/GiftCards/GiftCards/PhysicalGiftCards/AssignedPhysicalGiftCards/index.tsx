import { Box, Button } from '@mui/material';
import TanstackTable from '@/components/Table/TanstackTable';
import Search from '@/components/Search';
import { AddWhiteBgIcon, ExportBlackIcon } from '@/assets/icons';
import FilterListIcon from '@mui/icons-material/FilterList';
import { useAssignedPhysicalGiftCards } from './useAssignedPhysicalGiftCards';

export const AssignedPhysicalGiftCards = () => {
  const {
    assignedPhysicalGiftCardColumns,
    setSearch,
    setIsPortalOpen,
    isPortalOpen,
    renderPortalComponent,
    lazyGetAssignedPhysicalGiftCardListStatus,
    setPage,
    setPageLimit,
  } = useAssignedPhysicalGiftCards();

  return (
    <>
      <Box
        display={'flex'}
        justifyContent={'space-between'}
        alignItems={'center'}
        flexWrap={'wrap'}
        gap={2}
      >
        <Search label="Search Here" setSearchBy={setSearch} />
        <Box display={'flex'} alignItems={'center'} gap={2} flexWrap={'wrap'}>
          <Button
            variant="contained"
            startIcon={<AddWhiteBgIcon />}
            onClick={() => setIsPortalOpen({ isOpen: true, isAdd: true })}
          >
            Add
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            startIcon={<FilterListIcon />}
            onClick={() => setIsPortalOpen({ isOpen: true, isFilter: true })}
          >
            Filter
          </Button>

          <Button
            variant="outlined"
            color="secondary"
            startIcon={<ExportBlackIcon />}
            onClick={() => setIsPortalOpen({ isOpen: true, isExport: true })}
          >
            Export
          </Button>
        </Box>
      </Box>
      <br />
      <TanstackTable
        columns={assignedPhysicalGiftCardColumns}
        data={lazyGetAssignedPhysicalGiftCardListStatus?.data?.data}
        isLoading={lazyGetAssignedPhysicalGiftCardListStatus?.isLoading}
        currentPage={
          lazyGetAssignedPhysicalGiftCardListStatus?.data?.data?.meta?.page
        }
        count={
          lazyGetAssignedPhysicalGiftCardListStatus?.data?.data?.meta?.pages
        }
        pageLimit={
          lazyGetAssignedPhysicalGiftCardListStatus?.data?.data?.meta?.limit
        }
        totalRecords={
          lazyGetAssignedPhysicalGiftCardListStatus?.data?.data?.meta?.total
        }
        setPage={setPage}
        setPageLimit={setPageLimit}
        isFetching={lazyGetAssignedPhysicalGiftCardListStatus?.isFetching}
        isError={lazyGetAssignedPhysicalGiftCardListStatus?.isError}
        isSuccess={lazyGetAssignedPhysicalGiftCardListStatus?.isSuccess}
        onPageChange={(page: any) => setPage(page)}
        isPagination
      />
      {isPortalOpen?.isOpen && renderPortalComponent?.()}
    </>
  );
};
