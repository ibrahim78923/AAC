import { useState } from 'react';
import { useTheme } from '@mui/material';
import { useGetTicketsQuery } from '@/services/airSales/deals/view-details/association';
import { enqueueSnackbar } from 'notistack';
import { NOTISTACK_VARIANTS } from '@/constants/strings';
import { useRouter } from 'next/router';
import { ASSOCIATIONS_API_PARAMS_FOR, TASK_STATUS } from '@/constants';
import { usePostAssociationMutation } from '@/services/commonFeatures/contacts/associations';

const useTickets = () => {
  const theme = useTheme();
  const [searchName, setSearchName] = useState('');
  const [openDrawer, setOpenDrawer] = useState({
    isToggle: false,
    type: '',
    data: {},
  });
  const [isOpenAlert, setIsOpenAlert] = useState({
    isToggle: false,
    data: {},
  });
  const [ticketRecord, setTicketRecord] = useState<any>({});

  const router = useRouter();
  const { id: recordId } = router?.query;

  const ticketsParam = {
    recordId: recordId,
    search: searchName ? searchName : undefined,
    recordType: TASK_STATUS?.DEALS,
    associationType: TASK_STATUS?.TICKETS,
  };

  const { data: ticketsData, isLoading: getTicketsLoading } =
    useGetTicketsQuery(ticketsParam);

  const [postAssociation, { isLoading: delTicketLoading }] =
    usePostAssociationMutation();

  const deleteTicketHandler = async (data: any) => {
    try {
      const payload = {
        recordId: recordId,
        recordType: ASSOCIATIONS_API_PARAMS_FOR?.DEALS,
        operation: ASSOCIATIONS_API_PARAMS_FOR?.REMOVE,
        ticketsIds: [data?._id],
      };
      await postAssociation({
        body: payload,
      })?.unwrap();
      enqueueSnackbar('Record Deleted Successfully', {
        variant: NOTISTACK_VARIANTS?.SUCCESS,
      });
      setIsOpenAlert({ isToggle: false, data: {} });
    } catch (error: any) {
      const errMsg = error?.data?.message;
      enqueueSnackbar(errMsg ?? 'Error occurred', {
        variant: NOTISTACK_VARIANTS?.ERROR,
      });
    }
  };

  const handleCloseAlert = () => {
    setIsOpenAlert({ isToggle: false, data: {} });
  };

  return {
    deleteTicketHandler,
    handleCloseAlert,
    delTicketLoading,
    setTicketRecord,
    setIsOpenAlert,
    setSearchName,
    setOpenDrawer,
    ticketRecord,
    isOpenAlert,
    searchName,
    openDrawer,
    theme,
    ticketsData,
    getTicketsLoading,
  };
};

export default useTickets;
