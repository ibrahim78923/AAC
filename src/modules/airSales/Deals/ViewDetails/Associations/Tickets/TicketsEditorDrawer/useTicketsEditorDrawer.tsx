import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  ticketsDefaultValues,
  ticketsValidationSchema,
} from './TicketsEditorDrawer.data';
import {
  useLazyGetCategoriesDropdownQuery,
  useLazyGetRequesterDropdownQuery,
} from '@/services/airServices/tickets';
import { useLazyGetAllTicketsQuery } from '@/services/common-APIs';
import { usePostAssociationMutation } from '@/services/commonFeatures/contacts/associations';
import { usePostTicketMutation } from '@/services/commonFeatures/contacts/associations/tickets';
import { ASSOCIATIONS_API_PARAMS_FOR, TICKETS_TYPE } from '@/constants';
import { useRouter } from 'next/router';
import { enqueueSnackbar } from 'notistack';
import { MODULE_TYPE, TICKET_TYPE } from '@/constants/strings';
import { useEffect } from 'react';

const useTicketsEditorDrawer = (setOpenDrawer: any, viewData: any) => {
  const router = useRouter();
  const { id: ticketRecordId } = router.query;

  const methodsNewTickets = useForm({
    resolver: yupResolver(ticketsValidationSchema),
    defaultValues: ticketsDefaultValues,
  });

  const { handleSubmit, watch, setValue } = methodsNewTickets;
  const watchTickets = watch('ticketStatus');

  const [postTicket, { isLoading: loadingPostTicket }] =
    usePostTicketMutation();

  const [postAssociation, { isLoading: loadingPostAssociation }] =
    usePostAssociationMutation();

  useEffect(() => {
    const fieldsToSet: any = {
      subject: viewData?.subject,
      requester: viewData?.requester,
      description: viewData?.description,
      category: viewData?.category,
      status: viewData?.status,
      priority: viewData?.priority,
      ticketId: viewData?.subject ? viewData : null,
    };

    for (const key in fieldsToSet) {
      setValue(key, fieldsToSet[key]);
    }
  }, [viewData]);

  const onSubmit = async (values: any) => {
    const payload = {
      recordId: ticketRecordId,
      recordType: ASSOCIATIONS_API_PARAMS_FOR?.DEALS,
      operation: ASSOCIATIONS_API_PARAMS_FOR?.ADD,
      ticketsIds: [values.ticketId?._id],
    };

    if (watchTickets !== TICKETS_TYPE?.NEW_TICKETS) {
      delete values.ticketId;
      try {
        await postAssociation({
          body: payload,
        }).unwrap();
        setOpenDrawer({ isToggle: false, type: '', data: {} });
        enqueueSnackbar('Ticket created successfully', { variant: 'success' });
      } catch {
        enqueueSnackbar('Error while creating ticket', { variant: 'error' });
      }
    } else {
      try {
        values.requester = values.requester?._id;
        values.category = values.category?._id;
        delete values.ticketStatus;
        delete values.priority;

        const formData = new FormData();

        Object.entries(values)?.forEach(([key, value]: any) => {
          if (value !== undefined && value !== null && value !== '') {
            formData?.append(key, value);
          }
        });

        formData.append('moduleType', MODULE_TYPE?.TICKETS);
        formData.append('ticketType', TICKET_TYPE?.INC);

        const response = await postTicket(formData).unwrap();
        if (!response?.data) throw new Error('No data in response');

        try {
          payload.ticketsIds = [response?.data?._id];
          await postAssociation({
            body: payload,
          }).unwrap();
          setOpenDrawer({ isToggle: false, type: '' });
          enqueueSnackbar('Ticket created successfully', {
            variant: 'success',
          });
        } catch {
          enqueueSnackbar('Error while creating ticket', { variant: 'error' });
        }
      } catch {
        enqueueSnackbar('Error while creating ticket', { variant: 'error' });
      }
    }
  };

  const ticketsList = useLazyGetAllTicketsQuery();
  const apiQueryRequester = useLazyGetRequesterDropdownQuery();
  const apiQueryCategories = useLazyGetCategoriesDropdownQuery();

  return {
    handleSubmit,
    onSubmit,
    methodsNewTickets,
    watchTickets,
    apiQueryCategories,
    apiQueryRequester,
    ticketsList,
    loadingPostTicket,
    loadingPostAssociation,
  };
};

export default useTicketsEditorDrawer;
