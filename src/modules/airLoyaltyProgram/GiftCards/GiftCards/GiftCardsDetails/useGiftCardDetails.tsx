import { useRouter } from 'next/router';
import { useState } from 'react';
import { ExportModal } from '@/components/ExportModal';
import { PAGINATION } from '@/config';
import { EXPORT_FILE_TYPE } from '@/constants/strings';
import { downloadFile } from '@/utils/file';
import { GiftCardDetailsFilter } from './GiftCardDetailsFilter';
import { AddGiftCardDetails } from './AddGiftCardDetails';
import { useLazyExportGiftCardDetailsListQuery } from '@/services/airLoyaltyProgram/giftCards/giftCards';
import { errorSnackbar, successSnackbar } from '@/lib/snackbar';
import { otherDateFormat } from '@/lib/date-time';
import { CALENDAR_FORMAT } from '@/constants';
import { useGetTransactionListQuery } from '@/services/airLoyaltyProgram/giftCards/transactions';

export const useGiftCardsDetails = () => {
  const [page, setPage] = useState(PAGINATION?.CURRENT_PAGE);
  const [limit, setLimit] = useState(PAGINATION?.PAGE_LIMIT);
  const [filterGiftCardDetails, setFilterGiftCardDetails] = useState<any>({});
  const [isPortalOpen, setIsPortalOpen] = useState<any>({});

  const router = useRouter();
  const { giftCardNumber } = router?.query;

  const [
    lazyExportGiftCardDetailsListTrigger,
    lazyExportGiftCardDetailsListStatus,
  ]: any = useLazyExportGiftCardDetailsListQuery();

  const giftCardParams = {
    page,
    limit,
    cardNumber: giftCardNumber,
    ...(filterGiftCardDetails?.dateRange?.startDate && {
      activeFrom: otherDateFormat(
        filterGiftCardDetails?.dateRange?.startDate,
        CALENDAR_FORMAT?.YMD,
      ),
    }),
    ...(filterGiftCardDetails?.dateRange?.endDate && {
      activeTo: otherDateFormat(
        filterGiftCardDetails?.dateRange?.endDate,
        CALENDAR_FORMAT?.YMD,
      ),
    }),
    ...(filterGiftCardDetails?.maxAmount && {
      maxTransactionAmount: filterGiftCardDetails?.maxAmount,
    }),
    ...(filterGiftCardDetails?.minAmount && {
      minTransactionAmount: filterGiftCardDetails?.minAmount,
    }),
  };

  const { data, isFetching, isLoading, isError, isSuccess, refetch } =
    useGetTransactionListQuery<any>(giftCardParams, {
      refetchOnMountOrArgChange: true,
    });

  const handleRefetchTransactionsList = async () => {
    await refetch();
  };

  const handleFileExportSubmit = async (type: any) => {
    const params = {
      cardNumber: giftCardNumber,
      exportType: type,
    };

    const exportListParameter = {
      queryParams: params,
    };

    try {
      const response: any =
        await lazyExportGiftCardDetailsListTrigger(
          exportListParameter,
        )?.unwrap();
      downloadFile(response, 'Gift Card List', EXPORT_FILE_TYPE?.[type]);
      successSnackbar('File exported successfully');
      setIsPortalOpen({});
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
    }
  };

  const renderPortalComponent = () => {
    if (isPortalOpen?.isFilter) {
      return (
        <GiftCardDetailsFilter
          isPortalOpen={isPortalOpen}
          setIsPortalOpen={setIsPortalOpen}
          filterGiftCardDetails={filterGiftCardDetails}
          setFilterGiftCardDetails={setFilterGiftCardDetails}
          setPage={setPage}
        />
      );
    }
    if (isPortalOpen?.isAdd) {
      return (
        <AddGiftCardDetails
          isPortalOpen={isPortalOpen}
          setIsPortalOpen={setIsPortalOpen}
          handleRefetchTransactionsList={handleRefetchTransactionsList}
        />
      );
    }
    if (isPortalOpen?.isExport) {
      return (
        <ExportModal
          open={isPortalOpen?.isExport}
          onSubmit={(exportType: any) => handleFileExportSubmit?.(exportType)}
          handleClose={() => setIsPortalOpen({})}
          disableCancelBtn={
            lazyExportGiftCardDetailsListStatus?.isLoading ||
            lazyExportGiftCardDetailsListStatus?.isFetching
          }
          loading={
            lazyExportGiftCardDetailsListStatus?.isLoading ||
            lazyExportGiftCardDetailsListStatus?.isFetching
          }
        />
      );
    }
    return <></>;
  };

  return {
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
    giftCardNumber,
  };
};
