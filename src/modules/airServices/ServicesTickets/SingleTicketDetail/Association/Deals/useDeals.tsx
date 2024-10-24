import { useState } from 'react';
import { getAssociateDealsColumns } from './Deals.data';
import { drawerInitialState } from '../Association.data';
import { useRouter } from 'next/router';
import {
  useGetAirServicesAssociateTicketsQuery,
  usePostAirServicesRemoveAssociateTicketsMutation,
} from '@/services/airServices/tickets/single-ticket-details/association';
import { ASSOCIATIONS_API_PARAMS_FOR } from '@/constants';
import { errorSnackbar, successSnackbar } from '@/lib/snackbar';

export default function useDeals({ setIsDrawerOpen }: any) {
  const router = useRouter();

  const [modalId, setModalId] = useState({
    view: false,
    delete: false,
    id: '',
  });

  const [selected, setSelected] = useState([]);

  const { ticketId } = router?.query;

  const associateDealsColumns = getAssociateDealsColumns({ setModalId });

  const associateTicketsAssetsParameter = {
    queryParams: {
      recordId: ticketId,
      recordType: ASSOCIATIONS_API_PARAMS_FOR?.TICKETS,
      associationType: ASSOCIATIONS_API_PARAMS_FOR?.DEALS,
    },
  };

  const { data, isLoading, isFetching, isError, isSuccess } =
    useGetAirServicesAssociateTicketsQuery(associateTicketsAssetsParameter, {
      refetchOnMountOrArgChange: true,
    });

  const onClose = () => {
    setIsDrawerOpen(drawerInitialState);
    setSelected([]);
  };

  const onModalClose = () => {
    setModalId({
      view: false,
      delete: false,
      id: '',
    });
  };

  const [postRemoveAssociateTicketsTrigger, postRemoveAssociateTicketsStatus] =
    usePostAirServicesRemoveAssociateTicketsMutation();

  const submitHandler = async () => {
    const body = {
      recordId: ticketId,
      recordType: ASSOCIATIONS_API_PARAMS_FOR?.TICKETS,
      operation: ASSOCIATIONS_API_PARAMS_FOR?.ADD,
      dealIds: selected,
    };
    const postRemoveAssociateTicketsParameter = {
      body,
    };
    try {
      await postRemoveAssociateTicketsTrigger(
        postRemoveAssociateTicketsParameter,
      )?.unwrap();
      successSnackbar('Deal(s) Associated Successfully!');
      onClose?.();
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
    }
  };

  const removeTicketsAssociatesDeals = async () => {
    const postRemoveAssociateTicketsParameter = {
      body: {
        recordId: ticketId,
        recordType: ASSOCIATIONS_API_PARAMS_FOR?.TICKETS,
        operation: ASSOCIATIONS_API_PARAMS_FOR?.REMOVE,
        dealIds: [modalId?.id],
      },
    };
    try {
      await postRemoveAssociateTicketsTrigger(
        postRemoveAssociateTicketsParameter,
      )?.unwrap();
      successSnackbar('Deal Detached Successfully!');
      onModalClose?.();
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
      onModalClose?.();
    }
  };

  return {
    onClose,
    submitHandler,
    selected,
    setSelected,
    associateDealsColumns,
    modalId,
    onModalClose,
    data,
    isLoading,
    isFetching,
    isError,
    isSuccess,
    postRemoveAssociateTicketsStatus,
    removeTicketsAssociatesDeals,
    setModalId,
  };
}
