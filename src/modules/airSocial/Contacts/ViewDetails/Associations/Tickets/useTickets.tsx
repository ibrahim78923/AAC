import { useEffect, useState } from 'react';
import { useTheme } from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  useGetAssociationQuery,
  usePostAssociationMutation,
} from '@/services/commonFeatures/contacts/associations';
import { usePostTicketMutation } from '@/services/commonFeatures/contacts/associations/tickets';
import { DRAWER_TITLE } from '@/constants';
import { enqueueSnackbar } from 'notistack';
import {
  MODULE_TYPE,
  NOTISTACK_VARIANTS,
  TICKET_TYPE,
} from '@/constants/strings';
import { ASSOCIATIONS_API_PARAMS_FOR } from '@/constants';
import {
  FORM_TYPE,
  ticketValidationSchema,
  ticketDefaultValuesFunction,
  existingTicketValidationSchema,
  existingTicketDefaultValues,
} from './TicketsEditorDrawer/TicketsEditorDrawer.data';
import { makeDateTime } from '@/utils/api';

const useTickets = (contactId: any) => {
  const theme = useTheme();

  // Get Association Tickets
  const [searchValue, setSearchValue] = useState(null);
  let searchPayLoad;
  if (searchValue) {
    searchPayLoad = { search: searchValue };
  }
  const filterParams = {
    recordId: contactId,
    recordType: ASSOCIATIONS_API_PARAMS_FOR?.CONTACTS,
    associationType: ASSOCIATIONS_API_PARAMS_FOR?.TICKETS,
  };
  const {
    data: dataGetTickets,
    isLoading: loadingTickets,
    isFetching: fetchingTickets,
  } = useGetAssociationQuery({
    params: { ...searchPayLoad, ...filterParams },
  });

  // Handle Change Form type
  const [formType, setFormType] = useState(FORM_TYPE?.NEW);
  const handleChangeFormType = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormType((event.target as HTMLInputElement).value);
  };

  const [openDrawer, setOpenDrawer] = useState(false);
  const [drawerTitle, setDrawerTitle] = useState(DRAWER_TITLE?.ADD);
  const [ticketData, setTicketData] = useState(null);
  const [disabledField, setDisabledField] = useState(false);

  const methodsNewTicket = useForm<any>({
    resolver: yupResolver(ticketValidationSchema()),
    defaultValues: ticketDefaultValuesFunction(ticketData),
  });

  const { handleSubmit: handleSubmitNew, reset: resetNewForm }: any =
    methodsNewTicket;

  useEffect(() => {
    resetNewForm(() => ticketDefaultValuesFunction(ticketData));
  }, [ticketData, resetNewForm]);

  const methodsExistingTicktet = useForm<any>({
    resolver: yupResolver(existingTicketValidationSchema),
    defaultValues: existingTicketDefaultValues,
  });
  const {
    handleSubmit: handleSubmitExistingTicket,
    reset: resetExistingForm,
  }: any = methodsExistingTicktet;

  useEffect(() => {
    resetNewForm();
    resetExistingForm();
  }, [formType]);

  const handleOpenDrawer = (title: string, data: any) => {
    if (data) {
      setTicketData(data);
      setDisabledField(true);
    } else {
      setTicketData(null);
      setDisabledField(false);
    }
    setDrawerTitle(title);
    setOpenDrawer(true);
  };
  const handleCloseDrawer = () => {
    setOpenDrawer(false);
    setFormType(FORM_TYPE?.NEW);
  };

  const [postTicket] = usePostTicketMutation();

  const [postAssociation, { isLoading: loadingPostAssociation }] =
    usePostAssociationMutation();

  const [loadingAddTicket, setLoadingAddTicket] = useState(false);

  const onSubmit = async (values: any) => {
    const formData = new FormData();
    formData.append('moduleType', MODULE_TYPE?.TICKETS);
    formData.append('ticketType', TICKET_TYPE?.INC);

    Object.entries(values)?.forEach(([key, value]: any) => {
      if (!value) return;

      switch (key) {
        case 'plannedStartDate':
        case 'plannedStartTime':
        case 'plannedEndTime':
          return;

        case 'requester':
        case 'category':
        case 'status':
        case 'pirority':
        case 'department':
        case 'source':
        case 'impact':
        case 'agent':
          formData.append(key, value._id);
          break;

        case 'associateAssets':
          const assets = value?.map((asset: any) => asset?._id);
          formData.append(key, JSON.stringify(assets));
          break;

        case 'plannedEndDate':
          formData.append(
            key,
            makeDateTime(value, values.plannedEndTime).toISOString(),
          );
          break;

        default:
          formData.append(key, value);
      }
    });

    try {
      setLoadingAddTicket(true);
      const response = await postTicket(formData).unwrap();
      if (!response?.data) throw new Error('No data in response');

      try {
        await postAssociation({
          body: {
            recordId: contactId,
            recordType: ASSOCIATIONS_API_PARAMS_FOR?.CONTACTS,
            operation: ASSOCIATIONS_API_PARAMS_FOR?.ADD,
            ticketsIds: [response.data._id],
          },
        }).unwrap();

        handleCloseDrawer();
        enqueueSnackbar('Ticket created successfully', { variant: 'success' });
      } catch {
        enqueueSnackbar('Error while creating ticket', { variant: 'error' });
      } finally {
        setLoadingAddTicket(false);
      }
    } catch {
      setLoadingAddTicket(false);
      enqueueSnackbar('Error while creating ticket', { variant: 'error' });
    }
  };

  const handleAddTicketSubmit = handleSubmitNew(onSubmit);

  const onExistingDealSubmit = async (values: any) => {
    const payload: any = {
      recordId: contactId,
      recordType: ASSOCIATIONS_API_PARAMS_FOR?.CONTACTS,
      operation: ASSOCIATIONS_API_PARAMS_FOR?.ADD,
      ticketsIds: [values?.ticketId?._id],
    };

    try {
      await postAssociation({
        body: payload,
      }).unwrap();
      handleCloseDrawer();
      enqueueSnackbar('Ticket added successfully', {
        variant: 'success',
      });
    } catch (error: any) {
      enqueueSnackbar('Error while adding ticket', {
        variant: 'error',
      });
    }
  };
  const handleExsistingTicketSubmit =
    handleSubmitExistingTicket(onExistingDealSubmit);

  // Remove Association
  const [isOpenAlert, setIsOpenAlert] = useState(false);
  const [ticketId, setTicketId] = useState<string>('');
  const handleOpenAlert = (id: string) => {
    setTicketId(id);
    setIsOpenAlert(true);
  };
  const handleCloseAlert = () => {
    setIsOpenAlert(false);
  };

  const handleRemoveAssociation = async () => {
    try {
      await postAssociation({
        body: {
          recordId: contactId,
          recordType: ASSOCIATIONS_API_PARAMS_FOR?.CONTACTS,
          ticketsIds: [ticketId],
          operation: ASSOCIATIONS_API_PARAMS_FOR?.REMOVE,
        },
      })?.unwrap();
      enqueueSnackbar('Record Deleted Successfully', {
        variant: NOTISTACK_VARIANTS?.SUCCESS,
      });
      setIsOpenAlert(false);
    } catch (error: any) {
      const errMsg = error?.data?.message;
      enqueueSnackbar(errMsg ?? 'Error occurred', {
        variant: NOTISTACK_VARIANTS?.ERROR,
      });
    }
  };

  return {
    theme,
    setSearchValue,
    loadingTickets,
    fetchingTickets,
    dataGetTickets,
    drawerTitle,
    openDrawer,
    handleOpenDrawer,
    handleCloseDrawer,
    formType,
    handleChangeFormType,
    disabledField,
    methodsNewTicket,
    methodsExistingTicktet,
    handleAddTicketSubmit,
    handleExsistingTicketSubmit,
    loadingAddTicket,

    isOpenAlert,
    handleOpenAlert,
    handleCloseAlert,
    handleRemoveAssociation,
    loadingPostAssociation,
  };
};

export default useTickets;
