import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, useWatch } from 'react-hook-form';
import {
  placeRequest,
  placeRequestDefaultValues,
  placeRequestValidationSchema,
} from './CatalogRequest.data';
import { usePostTicketsMutation } from '@/services/airCustomerPortal/catalog';
import { NextRouter, useRouter } from 'next/router';
import { errorSnackbar, successSnackbar } from '@/utils/api';
import { MODULE_TYPE, TICKET_STATUS, TICKET_TYPE } from '@/constants/strings';
import { AIR_CUSTOMER_PORTAL } from '@/constants';
import { useEffect } from 'react';
import { CatalogRequestI } from './CatalogRequest.interface';
import {
  getCustomerPortalPermissions,
  getCustomerPortalStyling,
} from '@/utils';
import { AIR_CUSTOMER_PORTAL_REQUESTER_PERMISSIONS } from '@/constants/permission-keys';

const useCatalogRequest = (props: CatalogRequestI) => {
  const { servicesDetails, setOpen } = props;
  const router: NextRouter = useRouter();
  const { serviceId } = router?.query;
  const getPortalPermissions = getCustomerPortalPermissions();

  const { companyId } = router?.query;

  const [postTicketTrigger, postTicketStatus] = usePostTicketsMutation();
  const categoryType = servicesDetails?.data?.assetType;

  const checkPermission =
    getPortalPermissions?.customerPortalPermissions?.includes(
      AIR_CUSTOMER_PORTAL_REQUESTER_PERMISSIONS?.SERVICE_CUSTOMER_SEARCH_REQUESTER_AGENT_BY_EVERYONE,
    );

  const methodRequest = useForm<any>({
    resolver: yupResolver(
      placeRequestValidationSchema?.(categoryType, checkPermission),
    ),
    defaultValues: placeRequestDefaultValues,
  });

  const { handleSubmit, getValues, control, reset, setValue, clearErrors } =
    methodRequest;

  const onSubmitRequest = async (data: any) => {
    const placeRequestData = new FormData();
    if (categoryType) {
      placeRequestData?.append('numberOfItems', data?.noOfItem);
    }
    if (checkPermission) {
      placeRequestData?.append('requester', data?.requestor?._id);
    }
    if (!checkPermission) {
      placeRequestData?.append('requesterEmail', data?.requesterEmail);
    }
    if (!checkPermission) {
      placeRequestData?.append('name', data?.requesterName);
    }
    placeRequestData?.append('status', TICKET_STATUS?.OPEN);
    placeRequestData?.append('subject', servicesDetails?.data?.itemName);
    placeRequestData?.append('description', servicesDetails?.data?.description);
    placeRequestData?.append('serviceId', serviceId as string);
    placeRequestData?.append('moduleType', MODULE_TYPE?.CUSTOMER_PORTAL);
    placeRequestData?.append('ticketType', TICKET_TYPE?.SR);
    placeRequestData?.append(
      'category',
      servicesDetails?.data?.categoryDetails?._id,
    );

    const postTicketParameter = {
      body: placeRequestData,
    };

    try {
      await postTicketTrigger(postTicketParameter)?.unwrap();
      successSnackbar('Ticket Created Successfully');
      handleClose?.();
      router?.push({
        pathname: AIR_CUSTOMER_PORTAL?.TICKETS,
        query: { ...(!!companyId && { companyId }) },
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

  const catalogRequestFormField = placeRequest(categoryType, checkPermission);

  const portalStyles = getCustomerPortalStyling();

  return {
    methodRequest,
    handleSubmit,
    onSubmitRequest,
    getValues,
    control,
    catalogRequestFormField,
    requestForSomeOne,
    handleClose,
    reset,
    postTicketStatus,
    checkPermission,
    portalStyles,
  };
};
export default useCatalogRequest;
