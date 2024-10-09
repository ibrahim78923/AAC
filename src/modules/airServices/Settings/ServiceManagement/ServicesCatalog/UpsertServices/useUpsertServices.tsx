import {
  getUpsertServiceData,
  upsertServiceDefaultValues,
  upsertServiceValidationSchema,
} from './UpsertServices.data';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/router';
import { AIR_SERVICES } from '@/constants';
import {
  useLazyGetAirServicesSettingsServicesProductDropdownListQuery,
  useLazyGetAirServicesSettingsServicesSoftwareDropdownListQuery,
  useLazyGetAirServicesSettingsServiceCategoriesDropdownQuery,
  useLazyGetAirServicesSettingsServicesAllUsersDropdownListQuery,
  useLazyGetAirServicesSettingsServicesAssetsCategoryDropdownQuery,
  usePostAirServicesSettingsAddServiceCatalogMutation,
} from '@/services/airServices/settings/service-management/service-catalog';
import useAuth from '@/hooks/useAuth';
import { useEffect } from 'react';
import { errorSnackbar, successSnackbar } from '@/utils/api';
import { IErrorResponse } from '@/types/shared/ErrorResponse';
import { SERVICE_CATALOG_STATUSES } from '@/constants/strings';

export const useUpsertServices = () => {
  const router = useRouter();

  const auth: any = useAuth();

  const { _id: productId } = auth?.product;

  const methods = useForm({
    resolver: yupResolver(upsertServiceValidationSchema),
    defaultValues: upsertServiceDefaultValues,
  });

  const { handleSubmit, watch, reset, setValue } = methods;

  const categoryTypeWatch = watch('categoryType');

  useEffect(() => {
    setValue('requesterVisibilty', []);
    setValue('agentVisibilty', []);
    setValue('software', null);
    setValue('assetType', null);
    setValue('product', null);
  }, [categoryTypeWatch]);

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
      successSnackbar('Service Added Successfully');
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

  const apiServiceCategoryQuery =
    useLazyGetAirServicesSettingsServiceCategoriesDropdownQuery();
  const apiAssetCategoryQuery =
    useLazyGetAirServicesSettingsServicesAssetsCategoryDropdownQuery();
  const apiSoftwareQuery =
    useLazyGetAirServicesSettingsServicesSoftwareDropdownListQuery();
  const apiProductQuery =
    useLazyGetAirServicesSettingsServicesProductDropdownListQuery();
  const apiRequesterAndAgentQuery =
    useLazyGetAirServicesSettingsServicesAllUsersDropdownListQuery();

  const upsertServiceData = getUpsertServiceData(
    apiServiceCategoryQuery,
    categoryTypeWatch,
    apiAssetCategoryQuery,
    apiSoftwareQuery,
    apiProductQuery,
    productId,
    apiRequesterAndAgentQuery,
  );

  return {
    handleCancelBtn,
    methods,
    handleSubmit,
    onSubmit,
    upsertServiceData,
    postAddServiceCatalogStatus,
  };
};
