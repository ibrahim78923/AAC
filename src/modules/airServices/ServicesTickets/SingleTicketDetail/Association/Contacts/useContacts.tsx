import { drawerInitialState } from '../Association.data';
import { useForm, useWatch } from 'react-hook-form';
import {
  TYPE_VALUES,
  getAssociateContactsColumns,
  validationSchema,
  defaultValues,
} from './Contacts.data';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { ASSOCIATIONS_API_PARAMS_FOR } from '@/constants';
import {
  useGetAirServicesAssociateTicketsQuery,
  usePostAirServicesContactMutation,
  usePostAirServicesRemoveAssociateTicketsMutation,
} from '@/services/airServices/tickets/single-ticket-details/association';
import { errorSnackbar, successSnackbar } from '@/lib/snackbar';
import { yupResolver } from '@hookform/resolvers/yup';
import { isoDateString } from '@/utils/dateTime';

export default function useContacts({ setIsDrawerOpen }: any) {
  const router = useRouter();

  const [selected, setSelected] = useState([]);
  const [modalId, setModalId] = useState({
    view: false,
    delete: false,
    id: '',
  });

  const { ticketId } = router?.query;

  const methodsNewContact = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues,
  });
  const { handleSubmit, reset: resetNewContact } = methodsNewContact;

  const methods = useForm({
    defaultValues: { type: TYPE_VALUES?.EXISTING_CONTACT },
  });
  const { control, reset } = methods;

  const type = useWatch({
    control,
    name: 'type',
    defaultValue: TYPE_VALUES?.EXISTING_CONTACT,
  });

  const associateTicketsAssetsParameter = {
    queryParams: {
      recordId: ticketId,
      recordType: ASSOCIATIONS_API_PARAMS_FOR?.TICKETS,
      associationType: ASSOCIATIONS_API_PARAMS_FOR?.CONTACTS,
    },
  };

  const { data, isLoading, isFetching, isError, isSuccess } =
    useGetAirServicesAssociateTicketsQuery(associateTicketsAssetsParameter, {
      refetchOnMountOrArgChange: true,
    });

  const associateContactsColumns = getAssociateContactsColumns({
    setModalId,
  });

  const onClose = () => {
    setIsDrawerOpen(drawerInitialState);
    reset();
    resetNewContact();
  };

  const [postRemoveAssociateTicketsTrigger, postRemoveAssociateTicketsStatus] =
    usePostAirServicesRemoveAssociateTicketsMutation();

  const [postContactTrigger, postContactStatus] =
    usePostAirServicesContactMutation();

  const onSubmit = async (data: any) => {
    const body = new FormData();
    Object.entries(data)?.forEach(([key, value]: any) => {
      if (value !== undefined && value !== null && value !== '') {
        switch (key) {
          case 'dateOfBirth':
          case 'dateOfJoining':
            body?.append(key, isoDateString(value));
            break;
          case 'contactOwnerId':
          case 'lifeCycleStageId':
          case 'statusId':
            body?.append(key, value?._id);
            break;
          default:
            body?.append(key, value);
            break;
        }
      }
    });

    try {
      const res: any = await postContactTrigger(body)?.unwrap();
      if (res) {
        const body = {
          recordId: ticketId,
          recordType: ASSOCIATIONS_API_PARAMS_FOR?.TICKETS,
          operation: ASSOCIATIONS_API_PARAMS_FOR?.ADD,
          contactsIds: [res?.data?._id],
        };
        const postRemoveAssociateTicketsParameter = {
          body,
        };
        try {
          await postRemoveAssociateTicketsTrigger(
            postRemoveAssociateTicketsParameter,
          )?.unwrap();
          successSnackbar('Contact(s) Associated Successfully!');
          resetNewContact();
          onClose?.();
        } catch (error: any) {
          errorSnackbar(error?.data?.message);
        }
      }
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
    }
  };

  const submitHandler = async () => {
    const body = {
      recordId: ticketId,
      recordType: ASSOCIATIONS_API_PARAMS_FOR?.TICKETS,
      operation: ASSOCIATIONS_API_PARAMS_FOR?.ADD,
      contactsIds: selected,
    };
    const postRemoveAssociateTicketsParameter = {
      body,
    };
    try {
      await postRemoveAssociateTicketsTrigger(
        postRemoveAssociateTicketsParameter,
      )?.unwrap();
      successSnackbar('Contact(s) Associated Successfully!');
      onClose?.();
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
    }
  };

  const onModalClose = () => {
    setModalId({
      view: false,
      delete: false,
      id: '',
    });
  };

  const removeTicketsAssociatesContacts = async () => {
    const postRemoveAssociateTicketsParameter = {
      body: {
        recordId: ticketId,
        recordType: ASSOCIATIONS_API_PARAMS_FOR?.TICKETS,
        operation: ASSOCIATIONS_API_PARAMS_FOR?.REMOVE,
        contactsIds: [modalId?.id],
      },
    };
    try {
      await postRemoveAssociateTicketsTrigger(
        postRemoveAssociateTicketsParameter,
      )?.unwrap();
      successSnackbar('Contact Detached Successfully!');
      onModalClose?.();
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
      onModalClose?.();
    }
  };

  return {
    onClose,
    type,
    submitHandler,
    selected,
    postRemoveAssociateTicketsStatus,
    methods,
    setSelected,
    isLoading,
    isFetching,
    isError,
    isSuccess,
    data,
    associateContactsColumns,
    modalId,
    setModalId,
    onModalClose,
    removeTicketsAssociatesContacts,
    methodsNewContact,
    handleSubmit,
    onSubmit,
    postContactStatus,
  };
}
