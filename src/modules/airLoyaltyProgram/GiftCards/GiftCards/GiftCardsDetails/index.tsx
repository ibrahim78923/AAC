import { Box, Button, Skeleton } from '@mui/material';
import TanstackTable from '@/components/Table/TanstackTable';
import { giftCardDetailsColumn } from './GiftCardDetails.data';
import FilterListIcon from '@mui/icons-material/FilterList';
import { AddWhiteBgIcon, ExportBlackIcon } from '@/assets/icons';
import { PageTitledHeader } from '@/components/PageTitledHeader';
import { useGiftCardsDetails } from './useGiftCardDetails';
import { AIR_LOYALTY_PROGRAM } from '@/constants/routes';
import { SELECTED_ARRAY_LENGTH } from '@/constants/strings';

export const GiftCardsDetails = () => {
  const {
    setIsPortalOpen,
    isPortalOpen,
    renderPortalComponent,
    setPage,
    setLimit,
    router,
    data,
    isFetching,
    isLoading,
    isError,
    isSuccess,
  } = useGiftCardsDetails?.();
  return (
    <>
      <PageTitledHeader
        title={
          isLoading ? (
            <Skeleton width={200} />
          ) : (
            data?.data?.giftcards[SELECTED_ARRAY_LENGTH?.ZERO]?.cardNumber
          )
        }
        addTitle={'Add Transaction'}
        canMovedBack
        handleAction={() => setIsPortalOpen({ isOpen: true, isAdd: true })}
        moveBack={() => {
          router?.push(AIR_LOYALTY_PROGRAM?.GIFT_CARDS);
        }}
      >
        <Button
          variant="contained"
          className="small"
          startIcon={<AddWhiteBgIcon />}
          onClick={() => setIsPortalOpen({ isOpen: true, isAdd: true })}
        >
          Add Transaction
        </Button>
      </PageTitledHeader>
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
        </Box>
        <Box mt={2}>
          <TanstackTable
            columns={giftCardDetailsColumn}
            data={data?.data?.giftcards}
            isLoading={isLoading}
            isFetching={isFetching}
            isError={isError}
            isSuccess={isSuccess || true}
            currentPage={data?.data?.meta?.page}
            count={data?.data?.meta?.pages}
            pageLimit={data?.data?.meta?.limit}
            totalRecords={data?.data?.meta?.total}
            onPageChange={(page: any) => setPage(page)}
            setPage={setPage}
            setPageLimit={setLimit}
            isPagination
          />
        </Box>
        {isPortalOpen?.isOpen && renderPortalComponent?.()}
      </Box>
    </>
  );
};
