import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { enqueueSnackbar } from 'notistack';
import { ASSET_TYPE, NOTISTACK_VARIANTS } from '@/constants/strings';
import {
  categoriesOfServices,
  upsertServiceDefaultValues,
  upsertServiceValidationSchema,
} from './UpsertService.data';
import { useEffect, useState } from 'react';
import { AIR_SERVICES } from '@/constants';
import { useRouter } from 'next/router';
import { usePostAddServiceCatalogMutation } from '@/services/airServices/settings/service-management/service-catalog';

const useUpsertService = () => {
  const [results, setResults] = useState<any[]>(categoriesOfServices);
  const [postAddServiceCatalogTrigger] = usePostAddServiceCatalogMutation();
  const methods: any = useForm<any>({
    resolver: yupResolver(upsertServiceValidationSchema),
    defaultValues: upsertServiceDefaultValues,
  });
  const router = useRouter();
  const { handleSubmit, watch, reset } = methods;
  const assetsType = watch('assetType');
  useEffect(() => {
    let filteredServices;

    if (assetsType === ASSET_TYPE?.HARDWARE_CONSUMABLE) {
      filteredServices = categoriesOfServices.filter(
        (service) => service?.text === ASSET_TYPE?.HARDWARE_CONSUMABLE,
      );
    } else {
      filteredServices = categoriesOfServices.filter(
        (service) => service?.text === ASSET_TYPE?.SOFTWARE,
      );
    }

    setResults(filteredServices);
  }, [assetsType, categoriesOfServices]);

  const onSubmit = async (data: any) => {
    const upsertServiceFormData = new FormData();
    upsertServiceFormData?.append('itemName', data?.itemName);
    upsertServiceFormData?.append('cost', data?.cost);
    upsertServiceFormData?.append('serviceCategory', data?.serviceCategory);
    upsertServiceFormData?.append('estimatedDelivery', data?.estimatedDelivery);
    upsertServiceFormData?.append('description', data?.description);
    upsertServiceFormData?.append('fileUrl', data?.fileUrl);
    upsertServiceFormData?.append('assetType', data?.assetType);
    upsertServiceFormData?.append('agentVisibilty', data?.agentVisibilty);
    upsertServiceFormData?.append('product', data?.product);
    upsertServiceFormData?.append(
      'requesterVisibilty',
      data?.requesterVisibilty,
    );
    upsertServiceFormData?.append('software', data?.software);
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

  return {
    methods,
    handleSubmit,
    onSubmit,
    assetsType,
    results,
  };
};
export default useUpsertService;
