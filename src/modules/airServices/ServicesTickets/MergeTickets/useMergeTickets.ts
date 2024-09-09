import { useForm, useWatch } from 'react-hook-form';
import {
  mergeTicketsFormDefaultValue,
  mergeTicketsFormFieldsDynamic,
  mergeTicketsFormValidationSchema,
} from './MergeTickets.data';
import {
  useLazyGetAirServicesAllUsersAsRequestersDropdownListQuery,
  useLazyGetTicketByIdForMergeQuery,
  useLazyGetTicketByRequesterQuery,
  useLazyGetTicketBySubjectQuery,
  usePostMergeTicketsMutation,
} from '@/services/airServices/tickets';
import { errorSnackbar, successSnackbar } from '@/utils/api';
import { ARRAY_INDEX, TICKET_SELECTION_TYPE } from '@/constants/strings';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import {
  emptySelectedTicketLists,
  setIsPortalClose,
} from '@/redux/slices/airServices/tickets/slice';
import { useAppDispatch, useAppSelector } from '@/redux/store';

export const useMergedTickets = () => {
  const dispatch = useAppDispatch();
  const selectedTicketLists = useAppSelector(
    (state) => state?.servicesTickets?.selectedTicketLists,
  );
  const isPortalOpen = useAppSelector(
    (state) => state?.servicesTickets?.isPortalOpen,
  );
  const singleTicketDetail = selectedTicketLists?.[ARRAY_INDEX?.ZERO];

  const [postMergeTicketsTrigger, postMergeTicketsStatus] =
    usePostMergeTicketsMutation();
  const mergedTicketsFormMethod = useForm({
    defaultValues: mergeTicketsFormDefaultValue,
    resolver: yupResolver(mergeTicketsFormValidationSchema),
  });

  const { handleSubmit, reset, control, clearErrors, getValues } =
    mergedTicketsFormMethod;

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

  const apiQueryTicketBySubject = useLazyGetTicketBySubjectQuery();
  const apiQueryTicketByRequester = useLazyGetTicketByRequesterQuery();
  const apiQueryTicketById = useLazyGetTicketByIdForMergeQuery();
  const apiQueryRequester =
    useLazyGetAirServicesAllUsersAsRequestersDropdownListQuery();

  const mergeTicketsFormFields = mergeTicketsFormFieldsDynamic(
    watchForTicketSelection,
    apiQueryRequester,
    apiQueryTicketByRequester,
    apiQueryTicketBySubject,
    getValues,
    apiQueryTicketById,
  );

  return {
    mergedTicketsFormMethod,
    closeMergedTicketsModal,
    handleSubmit,
    submitMergedTicketsForm,
    mergeTicketsFormFields,
    postMergeTicketsStatus,
    isPortalOpen,
    singleTicketDetail,
  };
};
