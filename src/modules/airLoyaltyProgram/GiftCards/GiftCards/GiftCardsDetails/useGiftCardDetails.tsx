import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { ExportModal } from '@/components/ExportModal';
import { PAGINATION } from '@/config';
import { buildQueryParams } from '@/utils/api';
import { EXPORT_FILE_TYPE } from '@/constants/strings';
import { downloadFile } from '@/utils/file';
import { GiftCardDetailsFilter } from './GiftCardDetailsFilter';
import { AddGiftCardDetails } from './AddGiftCardDetails';
import {
  useLazyExportGiftCardDetailsListQuery,
  useLazyGetGiftCardDetailsListQuery,
} from '@/services/airLoyaltyProgram/giftCards/giftCards';
import { errorSnackbar, successSnackbar } from '@/lib/snackbar';

export const useGiftCardsDetails = () => {
  const [page, setPage] = useState(PAGINATION?.CURRENT_PAGE);
  const [pageLimit, setPageLimit] = useState(PAGINATION?.PAGE_LIMIT);
  const [filterGiftCardDetails, setFilterGiftCardDetails] = useState({});
  const [isPortalOpen, setIsPortalOpen] = useState<any>({});

  const router = useRouter();
  const { giftCardNumber } = router?.query;

  const [lazyExportGiftCardDetailsListTrigger]: any =
    useLazyExportGiftCardDetailsListQuery();

  const giftCardParams = {
    cardNumber: giftCardNumber,
  };

  const [
    getSingleGiftCardTrigger,
    { data, isFetching, isLoading, isError, isSuccess },
  ] = useLazyGetGiftCardDetailsListQuery<any>();

  const handleGiftCard = async () => {
    try {
      await getSingleGiftCardTrigger(giftCardParams);
    } catch (error) {
      errorSnackbar(
        error ?? 'Error while fetching single gift card transaction list',
      );
    }
  };

  useEffect(() => {
    handleGiftCard();
  }, [page, pageLimit]);

  const handleFileExportSubmit = async (type: any) => {
    const additionalParams = [
      ['page', page + ''],
      ['limit', pageLimit + ''],
    ];
    const getExportGiftCardParam: any = buildQueryParams(
      additionalParams,
      filterGiftCardDetails,
    );
    const apiDataParameter = { queryParams: getExportGiftCardParam };
    try {
      const response: any =
        await lazyExportGiftCardDetailsListTrigger(apiDataParameter)?.unwrap();
      downloadFile(response, 'CardList', EXPORT_FILE_TYPE?.[type]);
      successSnackbar(`File Exported successfully`);
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
        />
      );
    }
    if (isPortalOpen?.isExport) {
      return (
        <ExportModal
          open={isPortalOpen?.isExport}
          onSubmit={(exportType: any) => handleFileExportSubmit?.(exportType)}
          handleClose={() => setIsPortalOpen({})}
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
    setPageLimit,
    router,
    data,
    isFetching,
    isLoading,
    isError,
    isSuccess,
  };
};
