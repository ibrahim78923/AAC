import {
  newIncidentFormFieldsDynamic,
  newIncidentValidationSchema,
  newIncidentsDefaultValuesFunction,
} from './NewIncident.data';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { errorSnackbar, makeDateTime, successSnackbar } from '@/utils/api';
import { MODULE_TYPE, TICKET_TYPE } from '@/constants/strings';
import {
  useLazyGetAgentDropdownQuery,
  useLazyGetAssociateAssetsDropdownQuery,
  useLazyGetCategoriesDropdownQuery,
  useLazyGetDepartmentDropdownQuery,
  useLazyGetRequesterDropdownQuery,
  usePostTicketsMutation,
} from '@/services/airServices/tickets';

import { useRouter } from 'next/router';

import { usePatchExistingIncidentMutation } from '@/services/airServices/assets/inventory/single-inventory-details/associations';

export const useNewIncident = (props: any) => {
  const { setIsOpenDrawer } = props;

  const router = useRouter();

  const [postTicketTrigger, postTicketStatus] = usePostTicketsMutation();
  const [existingIncidentTrigger, existingIncidentStatus] =
    usePatchExistingIncidentMutation();

  const methods: any = useForm<any>({
    resolver: yupResolver(newIncidentValidationSchema),
    defaultValues: newIncidentsDefaultValuesFunction(),
  });

  const { handleSubmit, reset } = methods;

  const onSubmit = async (formData: any) => {
    const newIncidentTicketFormData = new FormData();
    newIncidentTicketFormData?.append('requester', formData?.requester?._id);
    newIncidentTicketFormData?.append('subject', formData?.subject);
    !!formData?.description &&
      newIncidentTicketFormData?.append('description', formData?.description);
    !!formData?.category?._id &&
      newIncidentTicketFormData?.append('category', formData?.category?._id);
    newIncidentTicketFormData?.append('status', formData?.status?._id);
    newIncidentTicketFormData?.append('pirority', formData?.priority?._id);
    !!formData?.department?._id &&
      newIncidentTicketFormData?.append(
        'department',
        formData?.department?._id,
      );
    !!formData?.source &&
      newIncidentTicketFormData?.append('source', formData?.source?._id);
    !!formData?.impact &&
      newIncidentTicketFormData?.append('impact', formData?.impact?._id);
    !!formData?.agent &&
      newIncidentTicketFormData?.append('agent', formData?.agent?._id);
    (!!formData?.plannedEndDate || !!formData?.plannedEndTime) &&
      newIncidentTicketFormData?.append(
        'plannedEndDate',
        makeDateTime(
          formData?.plannedEndDate,
          formData?.plannedEndTime,
        )?.toISOString(),
      );
    !!formData?.plannedEffort &&
      newIncidentTicketFormData?.append(
        'plannedEffort',
        formData?.plannedEffort,
      );
    formData?.attachFile !== null &&
      newIncidentTicketFormData?.append('fileUrl', formData?.attachFile);
    !!formData?.associatesAssets?.length &&
      newIncidentTicketFormData?.append(
        'associateAssets',
        formData?.associatesAssets?.map((asset: any) => asset?._id),
      );
    newIncidentTicketFormData?.append('moduleType', MODULE_TYPE?.TICKETS);
    newIncidentTicketFormData?.append('ticketType', TICKET_TYPE?.INC);

    const postTicketParameter = {
      body: newIncidentTicketFormData,
    };

    try {
      await postTicketTrigger(postTicketParameter)?.unwrap();
      successSnackbar('Incident Associated Successfully');
      reset();
      onClose();
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
    }
  };

  const associateIncident = async () => {
    const associationExistingParams = {
      id: 'associationsInventoryId',
      ticketIds: 'checkedIds',
    };

    try {
      const response = await existingIncidentTrigger(
        associationExistingParams,
      )?.unwrap();
      successSnackbar(response?.message);
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
    }
  };

  const apiQueryDepartment = useLazyGetDepartmentDropdownQuery();
  const apiQueryRequester = useLazyGetRequesterDropdownQuery();
  const apiQueryAgent = useLazyGetAgentDropdownQuery();
  const apiQueryAssociateAsset = useLazyGetAssociateAssetsDropdownQuery();
  const apiQueryCategories = useLazyGetCategoriesDropdownQuery();

  const newIncidentFormFields = newIncidentFormFieldsDynamic(
    apiQueryRequester,
    apiQueryDepartment,
    apiQueryAgent,
    apiQueryCategories,
    apiQueryAssociateAsset,
    router,
  );

  const onClose = () => {
    setIsOpenDrawer?.(false);
    reset?.();
  };

  return {
    handleSubmit,
    onSubmit,
    methods,
    newIncidentFormFields,
    onClose,
    postTicketStatus,
    associateIncident,
    existingIncidentStatus,
  };
};
