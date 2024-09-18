import { useRouter } from 'next/router';
import { useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import {
  TYPE_VALUES,
  getAssociateCompanyColumns,
  validationSchema,
  defaultValues,
} from './Companies.data';
import { drawerInitialState } from '../Association.data';
import { ASSOCIATIONS_API_PARAMS_FOR } from '@/constants';
import {
  useGetAssociateTicketsQuery,
  usePostCompanyMutation,
  usePostRemoveAssociateTicketsMutation,
} from '@/services/airServices/tickets/single-ticket-details/association';
import { yupResolver } from '@hookform/resolvers/yup';
import { errorSnackbar, successSnackbar } from '@/utils/api';

export default function useCompanies({ setIsDrawerOpen }: any) {
  const router = useRouter();

  const [selected, setSelected] = useState([]);
  const [modalId, setModalId] = useState({
    view: false,
    delete: false,
    id: '',
  });

  const { ticketId } = router?.query;

  const methodsNewCompany = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues,
  });
  const { handleSubmit, reset: resetNewCompany } = methodsNewCompany;

  const methods = useForm({
    defaultValues: { type: TYPE_VALUES?.EXISTING_COMPANY },
  });
  const { control, reset } = methods;

  const type = useWatch({
    control,
    name: 'type',
    defaultValue: TYPE_VALUES?.EXISTING_COMPANY,
  });

  const associateTicketsAssetsParameter = {
    queryParams: {
      recordId: ticketId,
      recordType: ASSOCIATIONS_API_PARAMS_FOR?.TICKETS,
      associationType: ASSOCIATIONS_API_PARAMS_FOR?.COMPANIES,
    },
  };

  const { data, isLoading, isFetching, isError, isSuccess } =
    useGetAssociateTicketsQuery(associateTicketsAssetsParameter, {
      refetchOnMountOrArgChange: true,
    });

  const associateCompanyColumns = getAssociateCompanyColumns({
    setModalId,
  });

  const onClose = () => {
    setIsDrawerOpen(drawerInitialState);
    reset();
    resetNewCompany();
  };

  const [postRemoveAssociateTicketsTrigger, postRemoveAssociateTicketsStatus] =
    usePostRemoveAssociateTicketsMutation();

  const [postCompanyTrigger, postCompanyStatus] = usePostCompanyMutation();

  const onSubmit = async (data: any) => {
    const body = new FormData();
    Object.entries(data)?.forEach(([key, value]: any) => {
      if (value !== undefined && value !== null && value !== '') {
        switch (key) {
          case 'ownerId':
            body?.append(key, value?._id);
            break;
          default:
            body?.append(key, value);
            break;
        }
      }
    });

    try {
      const res: any = await postCompanyTrigger(body)?.unwrap();
      if (res) {
        const body = {
          recordId: ticketId,
          recordType: ASSOCIATIONS_API_PARAMS_FOR?.TICKETS,
          operation: ASSOCIATIONS_API_PARAMS_FOR?.ADD,
          companiesIds: [res?.data?._id],
        };
        const postRemoveAssociateTicketsParameter = {
          body,
        };
        try {
          await postRemoveAssociateTicketsTrigger(
            postRemoveAssociateTicketsParameter,
          )?.unwrap();
          successSnackbar('Company Associated Successfully!');
          resetNewCompany();
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
      companiesIds: selected,
    };
    const postRemoveAssociateTicketsParameter = {
      body,
    };
    try {
      await postRemoveAssociateTicketsTrigger(
        postRemoveAssociateTicketsParameter,
      )?.unwrap();
      successSnackbar('Company Associated Successfully!');
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

  const removeTicketsAssociatesCompany = async () => {
    const postRemoveAssociateTicketsParameter = {
      body: {
        recordId: ticketId,
        recordType: ASSOCIATIONS_API_PARAMS_FOR?.TICKETS,
        operation: ASSOCIATIONS_API_PARAMS_FOR?.REMOVE,
        companiesIds: [modalId?.id],
      },
    };
    try {
      await postRemoveAssociateTicketsTrigger(
        postRemoveAssociateTicketsParameter,
      )?.unwrap();
      successSnackbar('Company Detached Successfully!');
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
    associateCompanyColumns,
    modalId,
    setModalId,
    onModalClose,
    removeTicketsAssociatesCompany,
    methodsNewCompany,
    handleSubmit,
    onSubmit,
    postCompanyStatus,
  };
}
