import { useTheme } from '@mui/material';
import { useEffect, useState } from 'react';
import { PAGINATION } from '@/config';
import { useRouter } from 'next/router';
import { errorSnackbar, successSnackbar } from '@/lib/snackbar';
import { ASSOCIATIONS_API_PARAMS_FOR } from '@/constants';
import {
  usePostAirServicesRemoveAssociateTicketsMutation,
  useLazyGetServicesInventoryAssociationExitingTicketsQuery,
} from '@/services/airServices/tickets/single-ticket-details/association';

export const useExistingIncident = (props: {
  openDrawer: boolean;
  setIsOpenDrawer: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { setIsOpenDrawer } = props;
  const theme: any = useTheme();
  const router = useRouter();

  const [searchBy, setSearchBy] = useState<any>('');
  const [checkboxValues, setCheckboxValues] = useState<any>({});
  const [page, setPage] = useState(PAGINATION?.CURRENT_PAGE);
  const [pageLimit, setPageLimit] = useState(PAGINATION?.PAGE_LIMIT);

  const [lazyGetTicketsTrigger, lazyGetTicketsStatus] =
    useLazyGetServicesInventoryAssociationExitingTicketsQuery();

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

  const handleSearch = (data: any) => {
    setPage(PAGINATION?.CURRENT_PAGE);
    setSearchBy(data);
  };

  const [postRemoveAssociateTicketsTrigger, { isLoading }] =
    usePostAirServicesRemoveAssociateTicketsMutation();

  const handleSubmit = async () => {
    const checkedIds = Object?.keys(checkboxValues ?? {})?.filter(
      (id) => checkboxValues?.[id],
    );

    const body = {
      recordId: associationsInventoryId,
      recordType: ASSOCIATIONS_API_PARAMS_FOR?.ASSETS,
      operation: ASSOCIATIONS_API_PARAMS_FOR?.ADD,
      ticketsIds: checkedIds,
    };
    const postRemoveAssociateTicketsParameter = {
      body,
    };

    try {
      await postRemoveAssociateTicketsTrigger(
        postRemoveAssociateTicketsParameter,
      )?.unwrap();
      successSnackbar('Ticket(s) Associated Successfully!');
      onClose?.();
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
    }
  };

  const onClose = () => {
    setIsOpenDrawer?.(false);
  };

  return {
    handleSubmit,
    searchBy,
    handleSearch,
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
    onClose,
  };
};
