import { useTheme } from '@mui/material';
import { useEffect, useState } from 'react';
import { useLazyGetExitingTicketsQuery } from '@/services/airServices/inventory/SingleInventoryDetail/Associations';
import { PAGINATION } from '@/config';
import { usePatchExistingIncidentMutation } from '@/services/airServices/assets/inventory/single-inventory-details/associations';
import { useRouter } from 'next/router';
import { errorSnackbar, successSnackbar } from '@/utils/api';

export const useExistingIncident = ({ onClose }: any) => {
  const theme: any = useTheme();
  const router = useRouter();

  const [searchBy, setSearchBy] = useState<any>('');
  const [checkboxValues, setCheckboxValues] = useState<any>({});
  const [page, setPage] = useState(PAGINATION?.CURRENT_PAGE);
  const [pageLimit, setPageLimit] = useState(PAGINATION?.PAGE_LIMIT);

  const [existingIncidentTrigger, { isLoading }] =
    usePatchExistingIncidentMutation();

  const [lazyGetTicketsTrigger, lazyGetTicketsStatus] =
    useLazyGetExitingTicketsQuery();

  const associationsInventoryId = router?.query?.inventoryId;

  const getValueTicketsListData = async () => {
    const getTicketsParam = new URLSearchParams();
    getTicketsParam?.append('page', page + '');
    getTicketsParam?.append('limit', pageLimit + '');
    getTicketsParam?.append('search', searchBy);
    getTicketsParam?.append('metaData', true + '');

    const getTicketsParameter = {
      queryParams: getTicketsParam,
    };

    try {
      await lazyGetTicketsTrigger(getTicketsParameter)?.unwrap();
      setCheckboxValues([]);
    } catch (error: any) {
      setCheckboxValues([]);
    }
  };

  const existingTicketsData = lazyGetTicketsStatus?.data?.data?.tickets;
  const metaData = lazyGetTicketsStatus?.data?.data?.meta;

  const handleCheckboxChange = (event: any) => {
    const { id, checked } = event?.target;
    setCheckboxValues((prevValues: any) => ({
      ...prevValues,
      [id]: checked,
    }));
  };

  useEffect(() => {
    getValueTicketsListData();
  }, [searchBy, page, pageLimit]);

  const handleSubmit = async () => {
    const checkedIds = Object?.keys(checkboxValues ?? {})?.filter(
      (id) => checkboxValues?.[id],
    );

    const associationExistingParams = {
      id: associationsInventoryId,
      ticketIds: checkedIds,
    };

    try {
      const response = await existingIncidentTrigger(
        associationExistingParams,
      )?.unwrap();
      successSnackbar(response?.message);
      onClose(false);
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
    }
  };

  return {
    handleSubmit,
    searchBy,
    setSearchBy,
    theme,
    checkboxValues,
    handleCheckboxChange,
    existingTicketsData,
    lazyGetTicketsStatus,
    pageLimit,
    setPageLimit,
    page,
    setPage,
    metaData,
    isLoading,
  };
};
