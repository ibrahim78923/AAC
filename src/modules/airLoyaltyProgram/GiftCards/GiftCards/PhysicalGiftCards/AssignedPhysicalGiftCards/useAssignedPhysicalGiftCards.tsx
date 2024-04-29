import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { assignedPhysicalGiftCardColumnsFunction } from './AssignedPhysicalGiftCards.data';
import { EXPORT_FILE_TYPE } from '@/constants/strings';
import {
  useLazyExportAssignedPhysicalGiftCardListQuery,
  useLazyGetAssignedPhysicalGiftCardListQuery,
} from '@/services/airLoyaltyProgram/giftCards/giftCards/physical-gift-card/assigned';
import { PAGINATION } from '@/config';
import { buildQueryParams, errorSnackbar, successSnackbar } from '@/utils/api';
import { downloadFile } from '@/utils/file';
import { AssignedPhysicalGiftCardsFilter } from './AssignedPhysicalGiftCardsFilter';
import { ExportModal } from '@/components/ExportModal';
import { AddPhysicalGiftCard } from '../AddPhysicalGiftCard';
import { getActivePermissionsSession } from '@/utils';

export const useAssignedPhysicalGiftCards = () => {
  const [selectedAssignedPhysicalCards, setSelectedAssignedPhysicalCards] =
    useState([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(PAGINATION?.CURRENT_PAGE);
  const [pageLimit, setPageLimit] = useState(PAGINATION?.PAGE_LIMIT);
  const [filterAssignedPhysicalCard, setFilterAssignedPhysicalCard] = useState(
    {},
  );
  const overallPermissions = getActivePermissionsSession();

  const router = useRouter();
  const [isPortalOpen, setIsPortalOpen] = useState<any>({});
  const [
    lazyGetAssignedPhysicalGiftCardListTrigger,
    lazyGetAssignedPhysicalGiftCardListStatus,
  ]: any = useLazyGetAssignedPhysicalGiftCardListQuery();
  const [lazyExportAssignedPhysicalGiftCardListTrigger]: any =
    useLazyExportAssignedPhysicalGiftCardListQuery();

  const getAssignedPhysicalGiftCardList = async () => {
    const additionalParams = [
      ['page', page + ''],
      ['limit', pageLimit + ''],
    ];
    const getDigitalGiftCardParam: any = buildQueryParams(
      additionalParams,
      filterAssignedPhysicalCard,
    );
    const apiDataParameter = { queryParams: getDigitalGiftCardParam };
    try {
      await lazyGetAssignedPhysicalGiftCardListTrigger(
        apiDataParameter,
      )?.unwrap();
    } catch (error) {}
  };

  useEffect(() => {
    getAssignedPhysicalGiftCardList?.();
  }, [page, pageLimit, search, filterAssignedPhysicalCard]);

  const handleFileExportSubmit = async (type: any) => {
    const additionalParams = [
      ['page', page + ''],
      ['limit', pageLimit + ''],
    ];
    const getExportDigitalGiftCardParam: any = buildQueryParams(
      additionalParams,
      filterAssignedPhysicalCard,
    );
    const apiDataParameter = { queryParams: getExportDigitalGiftCardParam };
    try {
      const response: any =
        await lazyExportAssignedPhysicalGiftCardListTrigger(
          apiDataParameter,
        )?.unwrap();
      downloadFile(response, 'DigitalCardList', EXPORT_FILE_TYPE?.[type]);
      successSnackbar(`File Exported successfully`);
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
    }
  };

  const renderPortalComponent = () => {
    if (isPortalOpen?.isFilter) {
      return (
        <AssignedPhysicalGiftCardsFilter
          isPortalOpen={isPortalOpen}
          setIsPortalOpen={setIsPortalOpen}
          filterAssignedPhysicalCard={filterAssignedPhysicalCard}
          setFilterAssignedPhysicalCard={setFilterAssignedPhysicalCard}
        />
      );
    }
    if (isPortalOpen?.isAdd) {
      return (
        <AddPhysicalGiftCard
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
  const assignedPhysicalGiftCardColumns =
    assignedPhysicalGiftCardColumnsFunction(
      router,
      selectedAssignedPhysicalCards,
      setSelectedAssignedPhysicalCards,
      lazyGetAssignedPhysicalGiftCardListStatus?.data?.data,
      overallPermissions,
    );

  return {
    assignedPhysicalGiftCardColumns,
    setSearch,
    setIsPortalOpen,
    isPortalOpen,
    renderPortalComponent,
    lazyGetAssignedPhysicalGiftCardListStatus,
    setPage,
    setPageLimit,
  };
};
