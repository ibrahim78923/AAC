import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import {
  placeRequest,
  placeRequestDefaultValues,
  placeRequestValidationSchema,
} from './CatalogRequest.data';
import {
  useLazyGetRequesterDropdownQuery,
  usePostTicketsMutation,
} from '@/services/airCustomerPortal/catalog';
import { useRouter } from 'next/router';
import { errorSnackbar, successSnackbar } from '@/utils/api';
import {
  CATALOG_SERVICE_TYPES,
  MODULE_TYPE,
  TICKET_STATUS,
  TICKET_TYPE,
} from '@/constants/strings';
import { AIR_CUSTOMER_PORTAL } from '@/constants';

const useCatalogRequest = (servicesDetails: any, setOpen: any) => {
  const router = useRouter();
  const { serviceId } = router?.query;
  const [postTicketTrigger, postTicketStatus] = usePostTicketsMutation();
  const CategoryType =
    servicesDetails?.data?.categoryDetails?.categoryName ||
    servicesDetails?.data?.itemName;

  const searchStringLowerCase = CategoryType?.toLowerCase();

  const methodRequest = useForm<any>({
    resolver: yupResolver(
      placeRequestValidationSchema?.(searchStringLowerCase),
    ),
    defaultValues: placeRequestDefaultValues,
  });
  const { handleSubmit, getValues, control, watch, reset } = methodRequest;

  const onSubmitRequest = async (data: any) => {
    const addItemToDescription =
      CategoryType?.toLowerCase() ===
      CATALOG_SERVICE_TYPES?.HARDWARE?.toLowerCase()
        ? `${servicesDetails?.data?.description} No of item ${data?.noOfItem}`
        : servicesDetails?.data?.description;

    const placeRequestData = new FormData();
    placeRequestData?.append(
      'requester',
      data?.requestor?._id || data?.requestorFor?._id,
    );
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
    } catch (error) {
      errorSnackbar();
    }
  };

  const handleClose = () => {
    methodRequest?.reset();
    setOpen(false);
  };
  const requestForSomeOne = watch('requestForSomeOneElse');

  const apiQueryRequester = useLazyGetRequesterDropdownQuery();

  const CatalogRequestFormField = placeRequest(
    apiQueryRequester,
    router,
    searchStringLowerCase,
    requestForSomeOne,
  );
  return {
    methodRequest,
    handleSubmit,
    onSubmitRequest,
    getValues,
    control,
    CatalogRequestFormField,
    requestForSomeOne,
    handleClose,
    searchStringLowerCase,
    reset,
    postTicketStatus,
  };
};
export default useCatalogRequest;
