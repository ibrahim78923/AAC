import { Box, Button } from '@mui/material';
import { useDigitalGiftCards } from './useDigitalGiftCards';
import TanstackTable from '@/components/Table/TanstackTable';
import Search from '@/components/Search';
import { AddWhiteBgIcon, ExportBlackIcon } from '@/assets/icons';
import FilterListIcon from '@mui/icons-material/FilterList';

export const DigitalGiftCards = () => {
  const {
    digitalGiftCardColumns,
    setSearch,
    setIsPortalOpen,
    isPortalOpen,
    renderPortalComponent,
    lazyGetDigitalGiftCardListStatus,
    setPage,
    setPageLimit,
  } = useDigitalGiftCards();

  return (
    <>
      <Box
        border={`1px solid`}
        borderColor={'grey.700'}
        borderRadius={2}
        p={1.5}
      >
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
            <Button
              variant="contained"
              startIcon={<AddWhiteBgIcon />}
              onClick={() => setIsPortalOpen({ isOpen: true, isAdd: true })}
            >
              Add
            </Button>
          </Box>
        </Box>
        <br />
        <TanstackTable
          columns={digitalGiftCardColumns}
          data={lazyGetDigitalGiftCardListStatus?.data?.data}
          isLoading={lazyGetDigitalGiftCardListStatus?.isLoading}
          currentPage={lazyGetDigitalGiftCardListStatus?.data?.data?.meta?.page}
          count={lazyGetDigitalGiftCardListStatus?.data?.data?.meta?.pages}
          pageLimit={lazyGetDigitalGiftCardListStatus?.data?.data?.meta?.limit}
          totalRecords={
            lazyGetDigitalGiftCardListStatus?.data?.data?.meta?.total
          }
          setPage={setPage}
          setPageLimit={setPageLimit}
          isFetching={lazyGetDigitalGiftCardListStatus?.isFetching}
          isError={lazyGetDigitalGiftCardListStatus?.isError}
          isSuccess={lazyGetDigitalGiftCardListStatus?.isSuccess}
          onPageChange={(page: any) => setPage(page)}
          isPagination
        />
      </Box>
      {isPortalOpen?.isOpen && renderPortalComponent?.()}
    </>
  );
};
