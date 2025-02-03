import {
  moveTicketsDefaultValue,
  moveTicketsFormFieldsDynamic,
  moveTicketsValidationSchema,
} from './MoveTickets.data';
import { useUpdateSingleServicesTicketByIdMutation } from '@/services/airServices/tickets';
import { ARRAY_INDEX } from '@/constants/strings';
import { useGetTicketList } from '../TicketsServicesHooks/useGetTicketList';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import {
  emptySelectedTicketLists,
  setIsPortalClose,
  setPage,
} from '@/redux/slices/airServices/tickets/slice';
import { PAGINATION } from '@/config';
import { errorSnackbar, successSnackbar } from '@/lib/snackbar';
import {
  servicesTicketsIsPortalOpenSelector,
  servicesTicketsSelectedTicketListsSelector,
  servicesTicketsTotalRecordsSelector,
} from '@/redux/slices/airServices/tickets/selectors';
import { useFormLib } from '@/hooks/useFormLib';

export const useMoveTickets = () => {
  const dispatch = useAppDispatch();

  const { getTicketsListData, page } = useGetTicketList();

  const totalRecords = useAppSelector(servicesTicketsTotalRecordsSelector);

  const selectedTicketLists = useAppSelector(
    servicesTicketsSelectedTicketListsSelector,
  );

  const isPortalOpen = useAppSelector(servicesTicketsIsPortalOpenSelector);

  const singleTicketDetail = selectedTicketLists?.[ARRAY_INDEX?.ZERO];

  const [putTicketTrigger, putTicketStatus] =
    useUpdateSingleServicesTicketByIdMutation();

  const formLibProps = {
    defaultValues: moveTicketsDefaultValue,
    validationSchema: moveTicketsValidationSchema,
  };

  const { handleSubmit, reset, methods } = useFormLib(formLibProps);

  const refetchApi = async () => {
    const newPage =
      selectedTicketLists?.length === totalRecords
        ? PAGINATION?.CURRENT_PAGE
        : page;
    dispatch(setPage?.(newPage));
    await getTicketsListData?.(newPage);
  };

  const submitMoveTicketsForm = async (data: any) => {
    const moveTicketFormData = new FormData();
    moveTicketFormData?.append(
      'isChildTicket',
      singleTicketDetail?.isChildTicket,
    );
    !!singleTicketDetail?.requester &&
      moveTicketFormData?.append('requester', singleTicketDetail?.requester);
    moveTicketFormData?.append('ticketType', singleTicketDetail?.ticketType);
    moveTicketFormData?.append('moduleType', singleTicketDetail?.moduleType);
    moveTicketFormData?.append('id', singleTicketDetail?._id);
    moveTicketFormData?.append('department', data?.department?._id);
    !!data?.agent?._id && moveTicketFormData?.append('agent', data?.agent?._id);

    const putTicketParameter = {
      body: moveTicketFormData,
    };

    try {
      await putTicketTrigger(putTicketParameter)?.unwrap();
      successSnackbar('Ticket moved Successfully');
      closePortal?.();
      await refetchApi();
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
    }
  };

  const closePortal = () => {
    reset();
    dispatch(emptySelectedTicketLists());
    dispatch(setIsPortalClose());
  };

  const moveTicketsFormFields = moveTicketsFormFieldsDynamic();

  return {
    methods,
    closePortal,
    handleSubmit,
    submitMoveTicketsForm,
    moveTicketsFormFields,
    putTicketStatus,
    isPortalOpen,
  };
};
