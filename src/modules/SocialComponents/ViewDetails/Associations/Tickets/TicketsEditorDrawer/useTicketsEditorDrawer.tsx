import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';
import {
  ticketsDataArray,
  ticketsDefaultValues,
  ticketsValidationSchema,
} from './TicketsEditorDrawer.data';
import {
  useLazyGetCategoriesDropdownQuery,
  useLazyGetRequesterDropdownQuery,
  usePostTicketsMutation,
} from '@/services/airServices/tickets';
import { successSnackbar } from '@/utils/api';
import { MODULE_TYPE, TICKET_TYPE } from '@/constants/strings';
import { ASSOCIATIONS_API_PARAMS_FOR, DRAWER_TITLE } from '@/constants';
import { usePostAssociationCompaniesMutation } from '@/services/commonFeatures/companies';

const useTicketsEditorDrawer = (
  setOpenDrawer: any,
  companyId: any,
  contactRecord: any,
  openDrawer: any,
) => {
  const [searchTicket, setSearchTicket] = useState('');
  const methodsTickets = useForm({
    resolver: yupResolver(ticketsValidationSchema),
    defaultValues: async () => {
      if (openDrawer !== DRAWER_TITLE?.ADD && contactRecord) {
        const { requester, subject, description, category, status, pirority } =
          contactRecord;
        return {
          ticketStatus: 'New Ticket',
          requester,
          subject,
          description,
          category,
          status,
          pirority,
        };
      }
      return ticketsDefaultValues;
    },
  });
  const [PostAssociationCompanies] = usePostAssociationCompaniesMutation();

  const [postTicketTrigger, { isLoading }] = usePostTicketsMutation();
  const onSubmit = async (values: any) => {
    const ticketFormData = new FormData();
    ticketFormData?.append('requester', values?.requester?._id);
    ticketFormData?.append('subject', values?.subject);
    !!values?.description &&
      ticketFormData?.append('description', values?.description);
    !!values?.category?._id &&
      ticketFormData?.append('category', values?.category?._id);
    !!values?.status?._id &&
      ticketFormData?.append('status', values?.status?._id);
    !!values?.priority?._id &&
      ticketFormData?.append('pirority', values?.priority?._id);
    !!values?.attachFile &&
      ticketFormData?.append('fileUrl', values?.attachFile);

    ticketFormData?.append('moduleType', MODULE_TYPE?.TICKETS); // companies
    ticketFormData?.append('ticketType', TICKET_TYPE?.INC);

    const postTicketParameter = {
      body: ticketFormData,
    };

    try {
      const response = await postTicketTrigger(postTicketParameter)?.unwrap();
      const payload = {
        recordId: companyId,
        recordType: ASSOCIATIONS_API_PARAMS_FOR?.COMPANIES,
        operation: ASSOCIATIONS_API_PARAMS_FOR?.ADD,
        ticketsIds: [response?.data?._id],
      };
      if (response) {
        await PostAssociationCompanies({ body: payload }).unwrap();

        successSnackbar('Ticket Added Successfully');
      }
      reset();
      setOpenDrawer(false);
    } catch (error: any) {
      successSnackbar(error?.data?.message);
    }
  };

  const { handleSubmit, watch, reset } = methodsTickets;
  const watchTickets = watch(['ticketStatus']);

  const apiQueryRequester = useLazyGetRequesterDropdownQuery();
  const apiQueryCategories = useLazyGetCategoriesDropdownQuery();

  const upsertTicketFormFields = ticketsDataArray(
    apiQueryRequester,
    apiQueryCategories,
    openDrawer,
  );

  return {
    handleSubmit,
    onSubmit,
    methodsTickets,
    watchTickets,
    setSearchTicket,
    searchTicket,
    upsertTicketFormFields,
    isLoading,
  };
};

export default useTicketsEditorDrawer;
