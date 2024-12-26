import { useWatch } from 'react-hook-form';
import {
  mergeTicketsFormDefaultValue,
  mergeTicketsFormFieldsDynamic,
  mergeTicketsFormValidationSchema,
} from './MergeTickets.data';
import { useMergeServicesTicketsMutation } from '@/services/airServices/tickets';
import { ARRAY_INDEX, TICKET_SELECTION_TYPE } from '@/constants/strings';
import { useEffect } from 'react';
import {
  emptySelectedTicketLists,
  setIsPortalClose,
} from '@/redux/slices/airServices/tickets/slice';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { errorSnackbar, successSnackbar } from '@/lib/snackbar';
import {
  servicesTicketsIsPortalOpenSelector,
  servicesTicketsSelectedTicketListsSelector,
} from '@/redux/slices/airServices/tickets/selectors';
import { useFormLib } from '@/hooks/useFormLib';

export const useMergedTickets = () => {
  const dispatch = useAppDispatch();
  const selectedTicketLists = useAppSelector(
    servicesTicketsSelectedTicketListsSelector,
  );
  const isPortalOpen = useAppSelector(servicesTicketsIsPortalOpenSelector);

  const singleTicketDetail = selectedTicketLists?.[ARRAY_INDEX?.ZERO];

  const [postMergeTicketsTrigger, postMergeTicketsStatus] =
    useMergeServicesTicketsMutation();

  const formLibProps = {
    defaultValues: mergeTicketsFormDefaultValue,
    validationSchema: mergeTicketsFormValidationSchema,
  };

  const { handleSubmit, reset, methods, control, clearErrors, watch } =
    useFormLib(formLibProps);

  const watchForTicketSelection: any = useWatch({
    control,
    name: 'ticketSelection',
    defaultValue: {
      _id: TICKET_SELECTION_TYPE?.REQUESTER,
      label: TICKET_SELECTION_TYPE?.REQUESTER,
    },
  });

  useEffect(() => {
    clearErrors?.();
  }, [watchForTicketSelection?._id]);

  const submitMergedTicketsForm = async (data: any) => {
    const postMergeTicketsParams = new URLSearchParams();
    data?.ticketSelection?._id !== TICKET_SELECTION_TYPE?.ID &&
      data?.searchTicket?.forEach(
        (ticketId: any) =>
          postMergeTicketsParams?.append('searchTicket', ticketId?._id),
      );
    data?.ticketSelection?._id === TICKET_SELECTION_TYPE?.ID &&
      postMergeTicketsParams?.append('searchTicket', data?.searchTicketId?._id);
    postMergeTicketsParams?.append('findTicketBy', data?.ticketSelection?._id);
    postMergeTicketsParams?.append('ticketId', singleTicketDetail?._id);
    const postMergeTicketsParameter = {
      queryParams: postMergeTicketsParams,
    };
    try {
      await postMergeTicketsTrigger(postMergeTicketsParameter)?.unwrap();
      successSnackbar('Ticket merged successfully');
      closeMergedTicketsModal?.();
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
    }
  };

  const closeMergedTicketsModal = () => {
    reset();
    dispatch(emptySelectedTicketLists());
    dispatch(setIsPortalClose());
  };

  const mergeTicketsFormFields = mergeTicketsFormFieldsDynamic(
    watchForTicketSelection,
    watch,
  );

  return {
    methods,
    closeMergedTicketsModal,
    handleSubmit,
    submitMergedTicketsForm,
    mergeTicketsFormFields,
    postMergeTicketsStatus,
    isPortalOpen,
    singleTicketDetail,
  };
};
