import { useTheme } from '@mui/material';
import { useEffect, useState } from 'react';
import { enqueueSnackbar } from 'notistack';
import { useLazyGetExitingTicketsQuery } from '@/services/airServices/inventory/SingleInventoryDetail/Associations';
import { PAGINATION } from '@/config';
import { usePatchExistingIncidentMutation } from '@/services/airServices/assets/inventory/single-inventory-details/associations';
import { useRouter } from 'next/router';
export const useExistingIncident = ({ onClose }: any) => {
  const [searchBy, setSearchBy] = useState<any>('');

  const [checkboxValues, setCheckboxValues] = useState<any>({});

  const theme: any = useTheme();
  const [page, setPage] = useState(PAGINATION?.CURRENT_PAGE);
  const [pageLimit, setPageLimit] = useState(PAGINATION?.PAGE_LIMIT);
  const [existingIncidentTrigger, { isLoading }] =
    usePatchExistingIncidentMutation();
  const router = useRouter();
  const associationsInventoryId = router.query.inventoryId;
  const [lazyGetTicketsTrigger, lazyGetTicketsStatus] =
    useLazyGetExitingTicketsQuery();

  const getValueTicketsListData = async () => {
    const getTicketsParam = new URLSearchParams();
    getTicketsParam?.append('page', page + '');
    getTicketsParam?.append('limit', pageLimit + '');
    getTicketsParam?.append('search', searchBy);
    getTicketsParam?.append('metaData', 'true');
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
    const { id, checked } = event.target;
    setCheckboxValues((prevValues: any) => ({
      ...prevValues,
      [id]: checked,
    }));
  };
  useEffect(() => {
    getValueTicketsListData();
  }, [searchBy, page, pageLimit]);
  const handleSubmit = async () => {
    const checkedIds = Object.keys(checkboxValues).filter(
      (id) => checkboxValues[id],
    );

    const associationExistingParams = {
      id: associationsInventoryId,
      ticketIds: checkedIds,
    };
    try {
      const response = await existingIncidentTrigger(
        associationExistingParams,
      ).unwrap();
      const successMessage = response.message;

      enqueueSnackbar(successMessage, {
        variant: 'success',
      });

      onClose(false);
    } catch (error) {
      enqueueSnackbar('Failed to associate incident!', {
        variant: 'error',
      });
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
