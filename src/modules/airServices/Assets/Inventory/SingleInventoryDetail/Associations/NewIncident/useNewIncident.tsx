import {
  newIncidentFormFieldsDynamic,
  newIncidentValidationSchema,
  newIncidentsDefaultValuesFunction,
} from './NewIncident.data';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { errorSnackbar, makeDateTime, successSnackbar } from '@/utils/api';
import { MODULE_TYPE, TICKET_TYPE } from '@/constants/strings';
import {
  useGetTicketsByIdQuery,
  useLazyGetAgentDropdownQuery,
  useLazyGetAssociateAssetsDropdownQuery,
  useLazyGetCategoriesDropdownQuery,
  useLazyGetDepartmentDropdownQuery,
  useLazyGetRequesterDropdownQuery,
  usePostTicketsMutation,
} from '@/services/airServices/tickets';
import { useRouter } from 'next/router';
import usePath from '@/hooks/usePath';
export const useNewIncident = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { makePath } = usePath();
  const ticketId = searchParams?.get('ticketId');

  const getSingleTicketParameter = {
    pathParam: {
      ticketId,
    },
  };
  const [postTicketTrigger, postTicketStatus] = usePostTicketsMutation();
  const methods: any = useForm<any>({
    resolver: yupResolver(newIncidentValidationSchema),
    defaultValues: newIncidentsDefaultValuesFunction(),
  });
  const { data, isLoading, isFetching, isError } = useGetTicketsByIdQuery(
    getSingleTicketParameter,
    {
      refetchOnMountOrArgChange: true,
      skip: !!!ticketId,
    },
  );

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
    (!!formData?.plannedEndDate || !!data?.plannedEndTime) &&
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
    newIncidentTicketFormData?.append(
      'moduleType',
      data?.data?.[0]?.moduleType ?? MODULE_TYPE?.TICKETS,
    );
    newIncidentTicketFormData?.append(
      'ticketType',
      data?.data?.[0]?.ticketType ?? TICKET_TYPE?.INC,
    );
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
  useEffect(() => {
    reset(() => newIncidentsDefaultValuesFunction(data?.data));
  }, [data, reset]);

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
    router?.push(
      makePath({
        path: router?.pathname,
        skipQueries: ['ticketAction'],
      }),
    );
    reset?.();
  };

  return {
    handleSubmit,
    onSubmit,
    methods,
    newIncidentFormFields,
    isLoading,
    isFetching,
    isError,
    onClose,
    postTicketStatus,
  };
};
