import { useForm, useWatch } from 'react-hook-form';
import {
  mergeTicketsFormDefaultValue,
  mergeTicketsFormFieldsDynamic,
  mergeTicketsFormValidationSchema,
} from './MergeTickets.data';
import { useRouter } from 'next/router';
import usePath from '@/hooks/usePath';
import {
  useLazyGetRequesterDropdownQuery,
  useLazyGetTicketByIdForMergeQuery,
  useLazyGetTicketByRequesterQuery,
  useLazyGetTicketBySubjectQuery,
  usePostMergeTicketsMutation,
} from '@/services/airServices/tickets';
import { errorSnackbar, successSnackbar } from '@/utils/api';
import { TICKET_SELECTION_TYPE } from '@/constants/strings';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';

export const useMergedTickets = (props: any) => {
  const router = useRouter();
  const { makePath } = usePath();
  const {
    setIsMergedTicketsModalOpen,
    setSelectedTicketList,
    selectedTicketList,
  } = props;
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
    postMergeTicketsParams?.append('ticketId', selectedTicketList?.[0]);
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
    router?.push(
      makePath({
        path: router?.pathname,
        skipQueries: ['ticketAction'],
      }),
    );
    reset();
    setSelectedTicketList?.([]);
    setIsMergedTicketsModalOpen?.(false);
  };

  const apiQueryRequester = useLazyGetRequesterDropdownQuery();
  const apiQueryTicketBySubject = useLazyGetTicketBySubjectQuery();
  const apiQueryTicketByRequester = useLazyGetTicketByRequesterQuery();
  const apiQueryTicketById = useLazyGetTicketByIdForMergeQuery();

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
  };
};
