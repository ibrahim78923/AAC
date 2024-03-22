import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { enqueueSnackbar } from 'notistack';
import { ASSET_TYPE, NOTISTACK_VARIANTS } from '@/constants/strings';
import {
  categoriesOfServices,
  upsertServiceData,
  upsertServiceDefaultValues,
  upsertServiceValidationSchema,
} from './UpsertService.data';
import { useEffect, useState } from 'react';
import { AIR_SERVICES } from '@/constants';
import { useRouter } from 'next/router';
import {
  useLazyGetCategoriesAgentDropdownQuery,
  useLazyGetCategoriesRequesterDropdownQuery,
  usePostAddServiceCatalogMutation,
  useLazyGetServiceCategoriesDropdownQuery,
  useLazyGetAgentDropdownQuery,
  useLazyGetRequesterDropdownQuery,
  useLazyGetAssetTypeQuery,
  useLazyGetSoftwareDropdownQuery,
  useLazyGetProductDropdownQuery,
} from '@/services/airServices/settings/service-management/service-catalog';

const useUpsertService = () => {
  const router = useRouter();
  const { categoryId } = router?.query;
  const apiQueryAgent = useLazyGetCategoriesAgentDropdownQuery();
  const apiRequestorQuery = useLazyGetCategoriesRequesterDropdownQuery();
  const apiServiceCategoryQuery = useLazyGetServiceCategoriesDropdownQuery();
  const apiQueryRequester = useLazyGetRequesterDropdownQuery();
  // const apiQueryCategory = useLazyGetCategoriesDropdownQuery();
  const apiServiceCategoryAgentQuery = useLazyGetAgentDropdownQuery();
  const apiQueryAssetType = useLazyGetAssetTypeQuery();
  const apiQuerySoftware = useLazyGetSoftwareDropdownQuery();
  const upsertServiceFormField = upsertServiceData(apiServiceCategoryQuery);
  const apiQueryProductCatalog = useLazyGetProductDropdownQuery();
  const [results, setResults] = useState<any[]>(
    categoriesOfServices(
      apiQueryAgent,
      apiRequestorQuery,
      router,
      // apiQueryCategory,
      apiServiceCategoryAgentQuery,
      apiQueryRequester,
      apiQueryAssetType,
      apiQuerySoftware,
      apiQueryProductCatalog,
    ),
  );
  const [postAddServiceCatalogTrigger] = usePostAddServiceCatalogMutation();
  const methods: any = useForm<any>({
    resolver: yupResolver(upsertServiceValidationSchema),
    defaultValues: upsertServiceDefaultValues,
  });

  const { handleSubmit, watch, reset } = methods;
  const assetsType = watch('assetType');
  useEffect(() => {
    let filteredServices;

    if (assetsType === ASSET_TYPE?.HARDWARE_CONSUMABLE) {
      filteredServices = categoriesOfServices(
        apiQueryAgent,
        apiRequestorQuery,
        router,
        // apiQueryCategory,
        apiServiceCategoryAgentQuery,
        apiQueryRequester,
        apiQueryAssetType,
        apiQuerySoftware,
        apiQueryProductCatalog,
      ).filter(
        (service: any) => service?.text === ASSET_TYPE?.HARDWARE_CONSUMABLE,
      );
    } else {
      filteredServices = categoriesOfServices(
        apiQueryAgent,
        apiRequestorQuery,
        router,
        // apiQueryCategory,
        apiServiceCategoryAgentQuery,
        apiQueryRequester,
        apiQueryAssetType,
        apiQuerySoftware,
        apiQueryProductCatalog,
      ).filter((service: any) => service?.text === ASSET_TYPE?.SOFTWARE);
    }

    setResults(filteredServices);
  }, [assetsType, categoriesOfServices]);

  const onSubmit = async (data: any) => {
    const upsertServiceFormData = new FormData();
    upsertServiceFormData?.append('itemName', data?.itemName);
    upsertServiceFormData?.append('cost', data?.cost);
    upsertServiceFormData?.append(
      'serviceCategory',
      data?.serviceCategory?._id ?? '65fd00d618a17a26a86b8e1e',
    );
    upsertServiceFormData?.append('estimatedDelivery', data?.estimatedDelivery);
    upsertServiceFormData?.append('description', data?.description);
    !!data?.fileUrl?.length &&
      upsertServiceFormData?.append('fileUrl', data?.fileUrl);
    upsertServiceFormData?.append(
      'assetType',
      data?.assetType?._id ?? '65fd00d618a17a26a86b8e1e',
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
    !!data?.software?.length &&
      upsertServiceFormData?.append('software', data?.software?._id);
    try {
      const response = await postAddServiceCatalogTrigger({
        body: upsertServiceFormData,
      })?.unwrap();
      enqueueSnackbar(response?.message ?? 'Service Add Successfully', {
        variant: NOTISTACK_VARIANTS?.SUCCESS,
      });
      reset(upsertServiceDefaultValues);
    } catch (error) {
      enqueueSnackbar('Something went wrong', {
        variant: NOTISTACK_VARIANTS?.ERROR,
      });
    }

    setTimeout(() => {
      router.push(AIR_SERVICES?.SERVICE_CATALOG);
    }, 2000);
  };

  const categoriesOfServicesFormField = categoriesOfServices(
    apiQueryAgent,
    apiRequestorQuery,
    router,
    // apiQueryCategory,
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
    results,
    upsertServiceFormField,
    categoriesOfServicesFormField,
    // apiQueryCategory,
    apiRequestorQuery,
    categoryId,
  };
};
export default useUpsertService;
