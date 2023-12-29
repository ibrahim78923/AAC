import { useState } from 'react';
import { useTheme } from '@emotion/react';
import { enqueueSnackbar } from 'notistack';
import { PAGINATION } from '@/config';
import { useGetTicketsAssociatesAssetsQuery } from '@/services/airServices/tickets/single-ticket-details/associates-assets';
import { useRouter } from 'next/router';
// import { NOTISTACK_VARIANTS } from '@/constants/strings';

export const useAssociatesLists = () => {
  const theme = useTheme();
  const router = useRouter();
  const [deleteModal, setDeleteModal] = useState(false);
  const [openDrawer, setOpenDrawer] = useState<any>(false);
  const [page, setPage] = useState(PAGINATION?.CURRENT_PAGE);
  const [pageLimit, setPageLimit] = useState(PAGINATION?.PAGE_LIMIT);
  const { ticketId } = router?.query;
  const getTicketsAssociatesAssetsParameter = {
    queryParams: {
      page,
      limit: pageLimit,
      ticketId,
    },
  };
  const { data, isLoading, isFetching, isError, isSuccess } =
    useGetTicketsAssociatesAssetsQuery(getTicketsAssociatesAssetsParameter, {
      refetchOnMountOrArgChange: true,
    });
  const submitDeleteModel = async () => {
    enqueueSnackbar('Task Delete Successfully', {
      variant: 'error',
      autoHideDuration: 2000,
    });
    setDeleteModal(false);
  };
  //TODO: we will use it in integration
  // const deleteTicket = async () => {

  //   const deleteTicketsParameter = {
  //   };
  //   try {
  //     // const response: any = await deleteTicketsTrigger(
  //     //   deleteTicketsParameter,
  //     // )?.unwrap();
  //     const response:any = {}
  //     enqueueSnackbar(response?.message ?? 'Ticket deleted successfully', {
  //       variant: NOTISTACK_VARIANTS?.SUCCESS,
  //     });
  //   } catch (error: any) {
  //     enqueueSnackbar(error?.data?.message?.error ?? 'Ticket not deleted', {
  //       variant: NOTISTACK_VARIANTS?.ERROR,
  //     });
  //   }
  // };
  return {
    theme,
    deleteModal,
    setDeleteModal,
    submitDeleteModel,
    openDrawer,
    setOpenDrawer,
    data,
    isLoading,
    isFetching,
    isError,
    isSuccess,
    setPage,
    setPageLimit,
  };
};
