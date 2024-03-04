import { useTheme } from '@mui/material';
import { useEffect, useState } from 'react';
import { enqueueSnackbar } from 'notistack';
import { useLazyGetExitingTicketsQuery } from '@/services/airServices/inventory/SingleInventoryDetail/Associations';
import { PAGINATION } from '@/config';

export const useExistingIncident = ({ onClose }: any) => {
  const [searchBy, setSearchBy] = useState<any>('');

  const [checkboxValues, setCheckboxValues] = useState<any>({});

  const theme: any = useTheme();
  const [page, setPage] = useState(PAGINATION?.CURRENT_PAGE);
  const [pageLimit, setPageLimit] = useState(PAGINATION?.PAGE_LIMIT);
  const [lazyGetTicketsTrigger, lazyGetTicketsStatus] =
    useLazyGetExitingTicketsQuery();

  const getValueTicketsListData = async () => {
    const getTicketsParam = new URLSearchParams();
    getTicketsParam?.append('ticketType', 'SR');

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
  const handleSubmit: any = () => {
    Object.keys(checkboxValues)?.filter((id) => checkboxValues?.[id]);
    enqueueSnackbar('Incident Associated Successfully!', {
      variant: 'success',
    });
    onClose(false);
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
  };
};
