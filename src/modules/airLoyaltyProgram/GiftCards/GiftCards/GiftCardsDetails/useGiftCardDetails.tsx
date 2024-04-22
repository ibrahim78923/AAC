import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { ExportModal } from '@/components/ExportModal';
import { PAGINATION } from '@/config';
import { buildQueryParams, errorSnackbar, successSnackbar } from '@/utils/api';
import { EXPORT_FILE_TYPE } from '@/constants/strings';
import { downloadFile } from '@/utils/file';
import { GiftCardDetailsFilter } from './GiftCardDetailsFilter';
import { AddGiftCardDetails } from './AddGiftCardDetails';
import {
  useLazyExportGiftCardDetailsListQuery,
  useLazyGetGiftCardDetailsListQuery,
} from '@/services/airLoyaltyProgram/giftCards/giftCards/details';

export const useGiftCardsDetails = () => {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(PAGINATION?.CURRENT_PAGE);
  const [pageLimit, setPageLimit] = useState(PAGINATION?.PAGE_LIMIT);
  const [filterGiftCardDetails, setFilterGiftCardDetails] = useState({});
  const router = useRouter();
  const [isPortalOpen, setIsPortalOpen] = useState<any>({});
  const [
    lazyGetGiftCardDetailsListTrigger,
    lazyGetGiftCardDetailsListStatus,
  ]: any = useLazyGetGiftCardDetailsListQuery();
  const [lazyExportGiftCardDetailsListTrigger]: any =
    useLazyExportGiftCardDetailsListQuery();

  const getGiftCardDetailsList = async () => {
    const additionalParams = [
      ['page', page + ''],
      ['limit', pageLimit + ''],
    ];
    const getGiftCardParam: any = buildQueryParams(
      additionalParams,
      filterGiftCardDetails,
    );
    const apiDataParameter = { queryParams: getGiftCardParam };
    try {
      await lazyGetGiftCardDetailsListTrigger(apiDataParameter)?.unwrap();
    } catch (error) {}
  };

  useEffect(() => {
    getGiftCardDetailsList?.();
  }, [page, pageLimit, search, filterGiftCardDetails]);

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
    setSearch,
    setIsPortalOpen,
    isPortalOpen,
    renderPortalComponent,
    lazyGetGiftCardDetailsListStatus,
    setPage,
    setPageLimit,
    router,
  };
};
