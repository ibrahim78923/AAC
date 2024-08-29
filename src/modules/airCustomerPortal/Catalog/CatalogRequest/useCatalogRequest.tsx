import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, useWatch } from 'react-hook-form';
import {
  placeRequest,
  placeRequestDefaultValues,
  placeRequestValidationSchema,
} from './CatalogRequest.data';
import {
  useLazyGetRequesterDropdownQuery,
  usePostTicketsMutation,
} from '@/services/airCustomerPortal/catalog';
import { NextRouter, useRouter } from 'next/router';
import { errorSnackbar, successSnackbar } from '@/utils/api';
import {
  CATALOG_SERVICE_TYPES,
  MODULE_TYPE,
  TICKET_STATUS,
  TICKET_TYPE,
} from '@/constants/strings';
import { AIR_CUSTOMER_PORTAL } from '@/constants';
import { useEffect } from 'react';
import { CatalogRequestI } from './CatalogRequest.interface';

const useCatalogRequest = (props: CatalogRequestI) => {
  const { servicesDetails, setOpen } = props;
  const router: NextRouter = useRouter();
  const { serviceId } = router?.query;

  const [postTicketTrigger, postTicketStatus] = usePostTicketsMutation();
  const categoryType = servicesDetails?.data?.serviceType;

  const searchStringLowerCase = categoryType?.toLowerCase();

  const methodRequest = useForm<any>({
    resolver: yupResolver(
      placeRequestValidationSchema?.(searchStringLowerCase),
    ),
    defaultValues: placeRequestDefaultValues,
  });

  const { handleSubmit, getValues, control, reset, setValue, clearErrors } =
    methodRequest;

  const onSubmitRequest = async (data: any) => {
    const addItemToDescription =
      categoryType?.toLowerCase() ===
      CATALOG_SERVICE_TYPES?.HARDWARE?.toLowerCase()
        ? `${servicesDetails?.data?.description} No of item ${data?.noOfItem}`
        : servicesDetails?.data?.description;

    const placeRequestData = new FormData();
    placeRequestData?.append('requester', data?.requestor?._id);
    placeRequestData?.append('status', TICKET_STATUS?.OPEN);
    placeRequestData?.append('subject', servicesDetails?.data?.itemName);
    placeRequestData?.append('serviceId', serviceId as string);
    placeRequestData?.append('moduleType', MODULE_TYPE?.CUSTOMER_PORTAL);
    placeRequestData?.append('ticketType', TICKET_TYPE?.SR);
    placeRequestData?.append('description', addItemToDescription);
    const postTicketParameter = {
      body: placeRequestData,
    };

    try {
      await postTicketTrigger(postTicketParameter)?.unwrap();
      successSnackbar('Ticket Created Successfully');
      handleClose?.();
      router?.push({
        pathname: AIR_CUSTOMER_PORTAL?.TICKETS,
      });
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
    }
  };

  const handleClose = () => {
    reset();
    setOpen(false);
  };

  const requestForSomeOne = useWatch({
    control,
    name: 'requestForSomeOneElse',
    defaultValue: false,
  });

  useEffect(() => {
    setValue('requestor', null);
    clearErrors('requestor');
  }, [requestForSomeOne]);

  const apiQueryRequester = useLazyGetRequesterDropdownQuery();

  const catalogRequestFormField = placeRequest(
    apiQueryRequester,
    searchStringLowerCase,
    requestForSomeOne,
  );

  return {
    methodRequest,
    handleSubmit,
    onSubmitRequest,
    getValues,
    control,
    catalogRequestFormField,
    requestForSomeOne,
    handleClose,
    searchStringLowerCase,
    reset,
    postTicketStatus,
  };
};
export default useCatalogRequest;
