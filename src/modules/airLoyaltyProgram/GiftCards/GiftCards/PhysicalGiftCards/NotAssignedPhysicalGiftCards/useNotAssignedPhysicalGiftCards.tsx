import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { EXPORT_FILE_TYPE } from '@/constants/strings';
import { PAGINATION } from '@/config';
import { errorSnackbar, successSnackbar } from '@/utils/api';
import { downloadFile } from '@/utils/file';
import { ExportModal } from '@/components/ExportModal';
import { AddPhysicalGiftCard } from '../AddPhysicalGiftCard';
import {
  useLazyExportUnAssignedPhysicalGiftCardListQuery,
  useLazyGetUnAssignedPhysicalGiftCardListQuery,
} from '@/services/airLoyaltyProgram/giftCards/giftCards/physical-gift-card/unassigned';
import { notAssignedPhysicalGiftCardColumnsFunction } from './NotAssignedPhysicalGiftCards.data';
import { AssignedPhysicalGiftCard } from './AssignedPhysicalGiftCard';
import { getActivePermissionsSession } from '@/utils';

export const useNotAssignedPhysicalGiftCards = () => {
  const [selectedUnAssignedPhysicalCards, setSelectedUnAssignedPhysicalCards] =
    useState([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(PAGINATION?.CURRENT_PAGE);
  const [pageLimit, setPageLimit] = useState(PAGINATION?.PAGE_LIMIT);
  const router = useRouter();
  const overallPermissions = getActivePermissionsSession();
  const [isPortalOpen, setIsPortalOpen] = useState<any>({});
  const [
    lazyGetUnAssignedPhysicalGiftCardListTrigger,
    lazyGetUnAssignedPhysicalGiftCardListStatus,
  ]: any = useLazyGetUnAssignedPhysicalGiftCardListQuery();
  const [lazyExportUnAssignedPhysicalGiftCardListTrigger]: any =
    useLazyExportUnAssignedPhysicalGiftCardListQuery();

  const getAssignedPhysicalGiftCardList = async () => {
    const queryParams: any = { page, limit: pageLimit };
    const apiDataParameter = { queryParams };
    try {
      await lazyGetUnAssignedPhysicalGiftCardListTrigger(
        apiDataParameter,
      )?.unwrap();
    } catch (error) {}
  };

  useEffect(() => {
    getAssignedPhysicalGiftCardList?.();
  }, [page, pageLimit, search]);

  const handleFileExportSubmit = async (type: any) => {
    const queryParams: any = { page, limit: pageLimit };
    const apiDataParameter = { queryParams };
    try {
      const response: any =
        await lazyExportUnAssignedPhysicalGiftCardListTrigger(
          apiDataParameter,
        )?.unwrap();
      downloadFile(response, 'DigitalCardList', EXPORT_FILE_TYPE?.[type]);
      successSnackbar(`File Exported successfully`);
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
    }
  };

  const renderPortalComponent: any = () => {
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
    if (isPortalOpen?.isAssigned) {
      return (
        <AssignedPhysicalGiftCard
          isPortalOpen={isPortalOpen}
          setIsPortalOpen={setIsPortalOpen}
        />
      );
    }
    return <></>;
  };
  const notAssignedPhysicalGiftCardColumns =
    notAssignedPhysicalGiftCardColumnsFunction(
      router,
      selectedUnAssignedPhysicalCards,
      setSelectedUnAssignedPhysicalCards,
      lazyGetUnAssignedPhysicalGiftCardListStatus?.data?.data,
      setIsPortalOpen,
      overallPermissions,
    );

  return {
    notAssignedPhysicalGiftCardColumns,
    setSearch,
    setIsPortalOpen,
    isPortalOpen,
    renderPortalComponent,
    lazyGetUnAssignedPhysicalGiftCardListStatus,
    setPage,
    setPageLimit,
  };
};
