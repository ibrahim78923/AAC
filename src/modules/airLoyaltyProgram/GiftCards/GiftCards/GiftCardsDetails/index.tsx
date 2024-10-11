import { Box, Button } from '@mui/material';
import TanstackTable from '@/components/Table/TanstackTable';
import { data, giftCardDetailsColumn } from './GiftCardDetails.data';
import FilterListIcon from '@mui/icons-material/FilterList';
import { AddWhiteBgIcon, ExportBlackIcon } from '@/assets/icons';
import { PageTitledHeader } from '@/components/PageTitledHeader';
import { AIR_LOYALTY_PROGRAM } from '@/constants';
import { useGiftCardsDetails } from './useGiftCardDetails';

export const GiftCardsDetails = () => {
  const {
    setIsPortalOpen,
    isPortalOpen,
    renderPortalComponent,
    lazyGetGiftCardDetailsListStatus,
    setPage,
    setPageLimit,
    router,
  } = useGiftCardsDetails?.();
  return (
    <>
      <Box>
        <PageTitledHeader
          title={'TVKP12345'}
          addTitle={'Add Transaction'}
          canMovedBack
          handleAction={() => setIsPortalOpen({ isOpen: true, isAdd: true })}
          moveBack={() => {
            router?.push(AIR_LOYALTY_PROGRAM?.GIFT_CARDS);
          }}
        />
      </Box>
      <Box mt={2} border={'1px solid lightgrey'} borderRadius={3}>
        <Box display={'flex'} justifyContent={'flex-end'} mx={2} gap={1} mt={2}>
          <Button
            variant="outlined"
            color="secondary"
            className="small"
            startIcon={<FilterListIcon />}
            onClick={() => setIsPortalOpen({ isOpen: true, isFilter: true })}
          >
            Filters
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            className="small"
            startIcon={<ExportBlackIcon />}
            onClick={() => setIsPortalOpen({ isOpen: true, isExport: true })}
          >
            Export
          </Button>
          <Button
            variant="contained"
            className="small"
            startIcon={<AddWhiteBgIcon />}
            onClick={() => setIsPortalOpen({ isOpen: true, isAdd: true })}
          >
            Add Transaction
          </Button>
        </Box>
        <Box mt={2}>
          <TanstackTable
            columns={giftCardDetailsColumn}
            data={data}
            currentPage={
              lazyGetGiftCardDetailsListStatus?.data?.data?.meta?.page
            }
            count={lazyGetGiftCardDetailsListStatus?.data?.data?.meta?.pages}
            pageLimit={
              lazyGetGiftCardDetailsListStatus?.data?.data?.meta?.limit
            }
            totalRecords={
              lazyGetGiftCardDetailsListStatus?.data?.data?.meta?.total
            }
            setPage={setPage}
            setPageLimit={setPageLimit}
            onPageChange={(page: any) => setPage(page)}
            isPagination
          />
        </Box>
        {isPortalOpen?.isOpen && renderPortalComponent?.()}
      </Box>
    </>
  );
};
