import {
  getUpsertServiceData,
  upsertServiceDefaultValues,
  upsertServiceValidationSchema,
} from './UpsertServices.data';
import { useRouter } from 'next/router';
import { AIR_SERVICES } from '@/constants/routes';
import {
  usePostAirServicesSettingsAddServiceCatalogMutation,
  useGetAirServicesSettingsServiceCatalogSingleServiceDetailsQuery,
} from '@/services/airServices/settings/service-management/service-catalog';
import { useEffect } from 'react';
import { errorSnackbar, successSnackbar } from '@/lib/snackbar';
import { IErrorResponse } from '@/types/shared/ErrorResponse';
import { useFormLib } from '@/hooks/useFormLib';
import { SERVICE_CATALOG_STATUSES } from '@/constants/services';

export const useUpsertServices = () => {
  const router = useRouter();
  const { serviceId, categoryId } = router?.query;

  const formLibProps = {
    validationSchema: upsertServiceValidationSchema,
    defaultValues: upsertServiceDefaultValues?.(),
  };

  const { handleSubmit, watch, reset, setValue, methods } =
    useFormLib(formLibProps);

  const categoryTypeWatch = watch('categoryType');

  useEffect(() => {
    if (!!serviceId) return;
    setValue('requesterVisibilty', []);
    setValue('agentVisibilty', []);
    setValue('software', null);
    setValue('assetType', null);
    setValue('product', null);
  }, [categoryTypeWatch]);

  const skipApiCall = serviceId && categoryId;

  const apiDataParameter = {
    queryParams: {
      id: serviceId,
      categoryId,
    },
  };
  const { data, isLoading, isFetching, isError, refetch } =
    useGetAirServicesSettingsServiceCatalogSingleServiceDetailsQuery(
      apiDataParameter,
      {
        refetchOnMountOrArgChange: true,
        skip: !skipApiCall,
      },
    );

  const [postAddServiceCatalogTrigger, postAddServiceCatalogStatus] =
    usePostAirServicesSettingsAddServiceCatalogMutation();

  const onSubmit = async (data: any) => {
    const newFormData = new FormData();

    newFormData?.append('itemName', data?.itemName);
    !!data?.cost && newFormData?.append('cost', data?.cost);
    newFormData?.append('serviceCategory', data?.serviceCategory?._id);
    !!data?.estimatedDelivery &&
      newFormData?.append('estimatedDelivery', data?.estimatedDelivery);
    !!data?.description &&
      newFormData?.append('description', data?.description);
    !!data?.fileUrl && newFormData?.append('fileUrl', data?.fileUrl);
    !!data?.assetType && newFormData?.append('assetType', data?.assetType?._id);
    !!data?.agentVisibilty &&
      newFormData?.append(
        'agentVisibilty',
        data?.agentVisibilty?.map((agent: any) => agent?._id),
      );
    !!data?.product && newFormData?.append('product', data?.product?._id);
    !!data?.requesterVisibilty &&
      newFormData?.append(
        'requesterVisibilty',
        data?.requesterVisibilty?.map((requester: any) => requester?._id),
      );
    !!data?.software && newFormData?.append('software', data?.software?._id);
    newFormData?.append('status', SERVICE_CATALOG_STATUSES?.DRAFT);

    try {
      await postAddServiceCatalogTrigger({
        body: newFormData,
      })?.unwrap();
      successSnackbar('Service added successfully');
      handleCancelBtn?.();
    } catch (error) {
      const errorResponse = error as IErrorResponse;
      errorSnackbar(errorResponse?.data?.message);
    }
  };

  const handleCancelBtn = () => {
    reset();
    router?.push({ pathname: AIR_SERVICES?.SERVICE_CATALOG });
  };

  const upsertServiceData = getUpsertServiceData(
    categoryTypeWatch,
    serviceId,
    data?.data?.attachmentDetails,
  );

  useEffect(() => {
    reset(() => upsertServiceDefaultValues?.(data?.data));
  }, [reset, data]);

  return {
    handleCancelBtn,
    methods,
    handleSubmit,
    onSubmit,
    upsertServiceData,
    postAddServiceCatalogStatus,
    serviceId,
    isLoading,
    isFetching,
    isError,
    refetch,
  };
};
