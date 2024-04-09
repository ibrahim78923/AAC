import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

import { ASSET_TYPE } from '@/constants/strings';
import {
  categoriesOfServices,
  upsertServiceData,
  upsertServiceDefaultValues,
  upsertServiceValidationSchema,
} from './UpsertService.data';

import { AIR_SERVICES } from '@/constants';
import { useRouter } from 'next/router';
import {
  useLazyGetCategoriesAgentDropdownQuery,
  useLazyGetCategoriesRequesterDropdownQuery,
  usePostAddServiceCatalogMutation,
  useLazyGetServiceCategoriesDropdownQuery,
  useLazyGetAgentDropdownQuery,
  useLazyGetRequesterDropdownQuery,
  useLazyGetAssetTypeForServicesDropdownQuery,
  useLazyGetSoftwareDropdownQuery,
  useLazyGetProductDropdownQuery,
} from '@/services/airServices/settings/service-management/service-catalog';
import { errorSnackbar, successSnackbar } from '@/utils/api';

const useUpsertService = () => {
  const router = useRouter();
  const { categoryId } = router?.query;
  const apiQueryAgent = useLazyGetCategoriesAgentDropdownQuery();
  const apiRequestorQuery = useLazyGetCategoriesRequesterDropdownQuery();
  const apiServiceCategoryQuery = useLazyGetServiceCategoriesDropdownQuery();
  const apiQueryRequester = useLazyGetRequesterDropdownQuery();
  const apiServiceCategoryAgentQuery = useLazyGetAgentDropdownQuery();
  const apiQueryAssetType = useLazyGetAssetTypeForServicesDropdownQuery();
  const apiQuerySoftware = useLazyGetSoftwareDropdownQuery();
  const upsertServiceFormField = upsertServiceData(apiServiceCategoryQuery);
  const apiQueryProductCatalog = useLazyGetProductDropdownQuery();

  const [postAddServiceCatalogTrigger, postAddServiceCatalogStatus] =
    usePostAddServiceCatalogMutation();

  const methods: any = useForm<any>({
    resolver: yupResolver(upsertServiceValidationSchema),
    defaultValues: upsertServiceDefaultValues,
  });

  const { handleSubmit, watch, reset } = methods;

  const handleCancelBtn = () => {
    router?.push({ pathname: AIR_SERVICES?.SERVICE_CATALOG });
  };

  const assetsType = watch('assetType');

  let filteredServices;

  if (assetsType === ASSET_TYPE?.HARDWARE_CONSUMABLE) {
    filteredServices = categoriesOfServices(
      apiQueryAgent,
      apiRequestorQuery,
      router,
      apiServiceCategoryAgentQuery,
      apiQueryRequester,
      apiQueryAssetType,
      apiQuerySoftware,
      apiQueryProductCatalog,
    )?.filter(
      (service: any) => service?.text === ASSET_TYPE?.HARDWARE_CONSUMABLE,
    );
  } else {
    filteredServices = categoriesOfServices(
      apiQueryAgent,
      apiRequestorQuery,
      router,
      apiServiceCategoryAgentQuery,
      apiQueryRequester,
      apiQueryAssetType,
      apiQuerySoftware,
      apiQueryProductCatalog,
    )?.filter((service: any) => service?.text === ASSET_TYPE?.SOFTWARE);
  }

  const onSubmit = async (data: any) => {
    const upsertServiceFormData = new FormData();
    upsertServiceFormData?.append('itemName', data?.itemName);
    upsertServiceFormData?.append('cost', data?.cost);
    upsertServiceFormData?.append(
      'serviceCategory',
      data?.serviceCategory?._id,
    );
    upsertServiceFormData?.append('estimatedDelivery', data?.estimatedDelivery);
    upsertServiceFormData?.append('description', data?.description);
    data?.fileUrl !== null &&
      upsertServiceFormData?.append('fileUrl', data?.fileUrl);
    !!data?.selectAssetsCategories?.length &&
      upsertServiceFormData?.append(
        'assetType',
        data?.selectAssetsCategories?._id,
      );
    upsertServiceFormData?.append(
      'agentVisibilty',
      data?.selectAgentVisibility?._id ?? data?.agentVisibilty?._id,
    );
    !!data?.product?.length &&
      upsertServiceFormData?.append('product', data?.product?._id);
    upsertServiceFormData?.append(
      'requesterVisibilty',
      data?.requesterVisibilty?._id ?? data?.requestedFor?._id,
    );
    !!data?.software &&
      upsertServiceFormData?.append('software', data?.software?._id);

    try {
      await postAddServiceCatalogTrigger({
        body: upsertServiceFormData,
      })?.unwrap();
      successSnackbar('Service Add Successfully');
      reset();
      handleCancelBtn?.();
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
    }
  };

  const categoriesOfServicesFormField = categoriesOfServices(
    apiQueryAgent,
    apiRequestorQuery,
    router,
    apiServiceCategoryAgentQuery,
    apiQueryRequester,
    apiQueryAssetType,
    apiQuerySoftware,
    apiQueryProductCatalog,
  );

  return {
    methods,
    handleSubmit,
    onSubmit,
    assetsType,
    upsertServiceFormField,
    categoriesOfServicesFormField,
    apiRequestorQuery,
    categoryId,
    router,
    handleCancelBtn,
    postAddServiceCatalogStatus,
    filteredServices,
  };
};
export default useUpsertService;
