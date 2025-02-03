import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, useWatch } from 'react-hook-form';
import {
  useEditSingleServicesTicketsDetailsByIdMutation,
  useGetSingleServicesTicketsDetailsForEditByIdQuery,
} from '@/services/airServices/tickets/single-ticket-details/details';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { filteredEmptyValues } from '@/utils/api';
import { ARRAY_INDEX, TICKET_TYPE } from '@/constants/strings';
import {
  editTicketDetailsDefaultValuesDynamic,
  editTicketDetailsFormFieldsDynamic,
  editTicketDetailsValidationSchema,
} from './EditTicketDetails.data';
import { DYNAMIC_FIELDS } from '@/utils/dynamic-forms';
import { REGEX } from '@/constants/validation';
import { AIR_SERVICES } from '@/constants/routes';
import { isoDateString } from '@/lib/date-time';
import { errorSnackbar, successSnackbar } from '@/lib/snackbar';
import { useDynamicForm } from '@/components/DynamicForm/useDynamicForm';

const { ZERO } = ARRAY_INDEX ?? {};
const { SR } = TICKET_TYPE ?? {};

export const useEditTicketDetails = () => {
  const router = useRouter();
  const ticketId = router?.query?.ticketId;

  const [editTicketsDetailsTrigger, editTicketsDetailsStatus] =
    useEditSingleServicesTicketsDetailsByIdMutation();

  const dynamicFormProps = {
    productType: DYNAMIC_FIELDS?.PT_SERVICES,
    moduleType: DYNAMIC_FIELDS?.MT_TICKETS,
  };

  const {
    form,
    handleUploadAttachments,
    isDynamicFormLoading,
    hasDynamicFormError,
    attachmentsApiCallInProgress,
    getDynamicFormData,
  } = useDynamicForm(dynamicFormProps);

  useEffect(() => {
    getDynamicFormData();
  }, []);

  const getSingleTicketParameter = {
    pathParam: {
      ticketId,
    },
  };

  const { data, isLoading, isFetching, isError, refetch } =
    useGetSingleServicesTicketsDetailsForEditByIdQuery(
      getSingleTicketParameter,
      {
        refetchOnMountOrArgChange: true,
        skip: !!!ticketId,
      },
    );

  const ticketDetail = data?.data?.[ZERO];
  const moveToTicket = () => router?.push(AIR_SERVICES?.TICKETS);

  const methods: any = useForm<any>({
    resolver: yupResolver(editTicketDetailsValidationSchema?.(form)),
    defaultValues: editTicketDetailsDefaultValuesDynamic(),
  });

  const { handleSubmit, reset, getValues, control, watch, setError, setValue } =
    methods;
  const watchForTicketType = useWatch({
    control,
    name: 'ticketType',
    defaultValue: null,
  });

  useEffect(() => {
    reset(() => editTicketDetailsDefaultValuesDynamic(ticketDetail, form));
  }, [data, reset, form]);

  const onSubmit = async (formData: any) => {
    if (
      formData?.ticketType?._id === SR &&
      formData?.category !== null &&
      formData?.category?._id !== formData?.service?.serviceCategory
    ) {
      errorSnackbar('Service does not belong to selected category');
      return;
    }
    const newFormData: any = filteredEmptyValues(formData);

    const { plannedEffort } = getValues();

    if (
      plannedEffort?.trim() !== '' &&
      !REGEX?.HOURS_AND_MINUTES?.test(plannedEffort)
    ) {
      setError('plannedEffort', {
        message:
          'Invalid format for Planned Effort. Please use format like 1h10m',
      });
      return;
    }

    try {
      const { body }: any = await handleUploadAttachments?.(
        formData,
        newFormData,
      );
      const ticketDetailsData = new FormData();
      !!ticketDetail?.requester &&
        ticketDetailsData?.append('requester', ticketDetail?.requester);
      ticketDetailsData.append('status', newFormData?.status?._id);
      ticketDetailsData.append('pirority', newFormData?.priority?._id);
      !!newFormData?.department?._id &&
        ticketDetailsData?.append('department', newFormData?.department?._id);
      !!newFormData?.source &&
        ticketDetailsData.append('source', newFormData?.source?._id);
      ticketDetailsData.append('ticketType', newFormData?.ticketType?._id);
      !!newFormData?.impact &&
        ticketDetailsData.append('impact', newFormData?.impact?._id);
      newFormData?.ticketType?._id === SR &&
        ticketDetailsData.append('serviceId', newFormData?.service?._id);
      newFormData?.ticketType?._id === SR &&
        ticketDetailsData.append('subject', newFormData?.service?.itemName);
      newFormData?.ticketType?._id === SR &&
        !!newFormData?.service?.assetType &&
        ticketDetailsData.append('numberOfItems', newFormData?.numberOfItems);
      newFormData?.ticketType?._id === SR &&
        ticketDetailsData.append(
          'description',
          newFormData?.service?.description,
        );
      !!newFormData?.agent &&
        ticketDetailsData.append('agent', newFormData?.agent?._id);
      !!newFormData?.category &&
        ticketDetailsData.append('category', newFormData?.category?._id);
      ticketDetailsData?.append('moduleType', ticketDetail?.moduleType);

      !!newFormData?.plannedEndDate &&
        ticketDetailsData?.append(
          'plannedEndDate',
          isoDateString(newFormData?.plannedEndDate),
        );
      !!newFormData?.plannedStartDate &&
        ticketDetailsData?.append(
          'plannedStartDate',
          isoDateString(newFormData?.plannedStartDate),
        );
      !!newFormData?.plannedEffort &&
        ticketDetailsData.append('plannedEffort', newFormData?.plannedEffort);
      ticketDetailsData?.append('isChildTicket', ticketDetail?.isChildTicket);
      ticketDetailsData?.append('id', ticketId as string);

      if (body?.customFields) {
        ticketDetailsData?.append(
          'customFields',
          JSON?.stringify(body?.customFields),
        );
      }

      const editTicketsDetailsParameter = {
        body: ticketDetailsData,
      };

      await editTicketsDetailsTrigger(editTicketsDetailsParameter)?.unwrap();
      successSnackbar('Ticket updated successfully');
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
    }
  };

  const ticketDetailsFormFields = editTicketDetailsFormFieldsDynamic(
    watchForTicketType,
    watch,
    ticketDetail,
    getValues,
    setValue,
  );
  const getApiCallInProgress = isLoading || isFetching || isDynamicFormLoading;

  const getApiCallHasError = hasDynamicFormError || isError;

  const ticketPostApiInProgress =
    editTicketsDetailsStatus?.isLoading || attachmentsApiCallInProgress;

  return {
    methods,
    handleSubmit,
    onSubmit,
    ticketDetailsFormFields,
    form,
    getDynamicFormData,
    refetch,
    ticketPostApiInProgress,
    getApiCallInProgress,
    moveToTicket,
    getApiCallHasError,
  };
};
