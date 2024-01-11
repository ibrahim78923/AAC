import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  UpsertInventoryValidationSchema,
  upsertInventoryFieldsDefaultValuesFunction,
  upsertInventoryFormFieldsDynamic,
} from './UpsertInventory.data';
import { useRouter } from 'next/router';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTheme } from '@mui/material';
import {
  useGetAddToInventoryByIdQuery,
  useLazyGetAssetTypeQuery,
  useLazyGetDepartmentDropdownQuery,
  useLazyGetLocationsDropdownQuery,
  useLazyGetUsersDropdownQuery,
  usePatchAddToInventoryMutation,
  usePostInventoryMutation,
} from '@/services/airServices/assets/inventory';
import { enqueueSnackbar } from 'notistack';
import { NOTISTACK_VARIANTS } from '@/constants/strings';

export const useUpsertInventory = () => {
  const { query }: any = useRouter();
  const router = useRouter();
  const { inventoryId } = router?.query;
  const theme = useTheme();
  const [formType, setFormType] = useState<string>('');
  const [patchAddToInventoryTrigger, patchAddToInventoryStatus] =
    usePatchAddToInventoryMutation();
  const [postAddToInventoryTrigger, postAddToInventoryStatus] =
    usePostInventoryMutation();
  const methods = useForm({
    resolver: yupResolver(UpsertInventoryValidationSchema),
    defaultValues: upsertInventoryFieldsDefaultValuesFunction(),
  });
  const { handleSubmit, reset } = methods;
  const getSingleInventoryDetailsParameter = {
    pathParam: {
      inventoryId,
    },
  };

  const { data, isLoading, isFetching } = useGetAddToInventoryByIdQuery(
    getSingleInventoryDetailsParameter,
    {
      refetchOnMountOrArgChange: true,
      skip: !!!inventoryId,
    },
  );

  const submitUpsertInventory = async (data: any) => {
    const inventoryDetailsData = new FormData();
    inventoryDetailsData.append('displayName', data?.displayName);
    inventoryDetailsData.append('assetType', data?.assetType);
    inventoryDetailsData.append('impact', data?.impact);
    inventoryDetailsData.append('description', data?.description);
    inventoryDetailsData.append('assetLifeExpiry', data?.assetLifeExpiry);
    inventoryDetailsData.append('locationId', data?.locationId);
    inventoryDetailsData.append('departmentId', data?.departmentId);
    inventoryDetailsData.append('usedBy', data?.usedBy);
    inventoryDetailsData.append('assignedOn', data?.assignedOn);
    inventoryDetailsData.append('attachment', data?.attachment);
    const body = inventoryDetailsData;
    if (!!inventoryId) {
      submitUpdateInventory(body);
      return;
    }
    const postInventoryParameter = {
      body,
    };

    try {
      const response = await postAddToInventoryTrigger(
        postInventoryParameter,
      )?.unwrap();
      enqueueSnackbar(response?.message ?? 'Inventory Added Successfully', {
        variant: NOTISTACK_VARIANTS?.SUCCESS,
      });
      // moveBack?.();
      reset();
    } catch (error: any) {
      enqueueSnackbar(error?.data?.message?.[0] ?? 'Something went wrong', {
        variant: NOTISTACK_VARIANTS?.ERROR,
      });
    }
  };
  useEffect(() => {
    reset(() => upsertInventoryFieldsDefaultValuesFunction(data));
  }, [data, reset]);
  const submitUpdateInventory = async (data: any) => {
    const patchProductCatalogParameter = {
      body: {
        id: inventoryId,
        ...data,
      },
    };
    try {
      const response = await patchAddToInventoryTrigger(
        patchProductCatalogParameter,
      )?.unwrap();
      enqueueSnackbar(response?.message ?? 'Inventory Created Successfully!', {
        variant: NOTISTACK_VARIANTS?.SUCCESS,
      });
      // moveBack?.();
      reset();
    } catch (error: any) {
      enqueueSnackbar(error?.data?.message?.[0] ?? 'Something went wrong', {
        variant: NOTISTACK_VARIANTS?.ERROR,
      });
    }
  };

  const apiQueryAssetType = useLazyGetAssetTypeQuery();
  const apiQueryDepartmentType = useLazyGetDepartmentDropdownQuery();
  const apiQueryLocationType = useLazyGetLocationsDropdownQuery();
  const apiQueryUsedByType = useLazyGetUsersDropdownQuery();
  const upsertInventoryFormFields = upsertInventoryFormFieldsDynamic(
    apiQueryAssetType,
    apiQueryDepartmentType,
    apiQueryLocationType,
    apiQueryUsedByType,
  );

  // const moveBack = () => {
  //   if (!!inventoryId) {
  //     router?.push({
  //       pathname: AIR_SERVICES?.ASSETS_INVENTORY,
  //       query: {
  //         ...router?.query,
  //       },
  //     });
  //     return;
  //   }
  //   router?.push({
  //     pathname: AIR_SERVICES?.ASSETS_INVENTORY,
  //   });
  // };
  const submit = () => {};
  return {
    methods,
    query,
    formType,
    setFormType,
    theme,
    submitUpsertInventory,
    handleSubmit,
    patchAddToInventoryStatus,
    upsertInventoryFormFields,
    isLoading,
    isFetching,
    postAddToInventoryStatus,
    submit,
  };
};
