import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { digitalGiftCardColumnsFunction } from './DigitalGiftCards.data';
import { ExportModal } from '@/components/ExportModal';
import { AddDigitalGiftCard } from './AddDigitalGiftCard';
import { DigitalGiftCardFilter } from './DigitalGiftCardFilter';
import {
  useLazyExportDigitalGiftCardListQuery,
  useLazyGetDigitalGiftCardListQuery,
} from '@/services/airLoyaltyProgram/giftCards/giftCards/digital-gift-card';
import { PAGINATION } from '@/config';
import { buildQueryParams, errorSnackbar, successSnackbar } from '@/utils/api';
import { EXPORT_FILE_TYPE } from '@/constants/strings';
import { downloadFile } from '@/utils/file';

export const useDigitalGiftCards = () => {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(PAGINATION?.CURRENT_PAGE);
  const [pageLimit, setPageLimit] = useState(PAGINATION?.PAGE_LIMIT);
  const [filterDigitalCard, setFilterDigitalCard] = useState({});
  const router = useRouter();
  const [isPortalOpen, setIsPortalOpen] = useState<any>({});
  const [
    lazyGetDigitalGiftCardListTrigger,
    lazyGetDigitalGiftCardListStatus,
  ]: any = useLazyGetDigitalGiftCardListQuery();
  const [lazyExportDigitalGiftCardListTrigger]: any =
    useLazyExportDigitalGiftCardListQuery();

  const getDigitalGiftCardList = async () => {
    const additionalParams = [
      ['page', page + ''],
      ['limit', pageLimit + ''],
    ];
    const getDigitalGiftCardParam: any = buildQueryParams(
      additionalParams,
      filterDigitalCard,
    );
    const apiDataParameter = { queryParams: getDigitalGiftCardParam };
    try {
      await lazyGetDigitalGiftCardListTrigger(apiDataParameter)?.unwrap();
    } catch (error) {}
  };

  useEffect(() => {
    getDigitalGiftCardList?.();
  }, [page, pageLimit, search, filterDigitalCard]);

  const handleFileExportSubmit = async (type: any) => {
    const additionalParams = [
      ['page', page + ''],
      ['limit', pageLimit + ''],
    ];
    const getExportDigitalGiftCardParam: any = buildQueryParams(
      additionalParams,
      filterDigitalCard,
    );
    const apiDataParameter = { queryParams: getExportDigitalGiftCardParam };
    try {
      const response: any =
        await lazyExportDigitalGiftCardListTrigger(apiDataParameter)?.unwrap();
      downloadFile(response, 'DigitalCardList', EXPORT_FILE_TYPE?.[type]);
      successSnackbar(`File Exported successfully`);
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
    }
  };

  const digitalGiftCardColumns = digitalGiftCardColumnsFunction(router);

  const renderPortalComponent = () => {
    if (isPortalOpen?.isFilter) {
      return (
        <DigitalGiftCardFilter
          isPortalOpen={isPortalOpen}
          setIsPortalOpen={setIsPortalOpen}
          filterDigitalCard={filterDigitalCard}
          setFilterDigitalCard={setFilterDigitalCard}
        />
      );
    }
    if (isPortalOpen?.isAdd) {
      return (
        <AddDigitalGiftCard
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
    digitalGiftCardColumns,
    setSearch,
    setIsPortalOpen,
    isPortalOpen,
    renderPortalComponent,
    lazyGetDigitalGiftCardListStatus,
    setPage,
    setPageLimit,
  };
};
