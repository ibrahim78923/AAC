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

const useUpsertService = () => {
  const [results, setResults] = useState<any[]>(categoriesOfServices);
  const methods: any = useForm<any>({
    resolver: yupResolver(upsertServiceValidationSchema),
    defaultValues: upsertServiceDefaultValues,
  });
  const router = useRouter();
  const { handleSubmit, watch } = methods;
  const assetsType = watch('accessDashboard');
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
  const onSubmit = () => {
    enqueueSnackbar('Service Added Successfully', {
      variant: NOTISTACK_VARIANTS?.SUCCESS,
    });
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
