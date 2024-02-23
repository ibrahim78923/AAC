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
import { AIR_SERVICES } from '@/constants';
import { errorSnackbar, makeDateTime, successSnackbar } from '@/utils/api';

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
  const methods = useForm({
    resolver: yupResolver(UpsertInventoryValidationSchema),
    defaultValues: upsertInventoryFieldsDefaultValuesFunction(data),
  });
  const { handleSubmit, reset } = methods;

  const submitUpsertInventory = async (data: any) => {
    const inventoryDetailsData = new FormData();
    inventoryDetailsData.append('displayName', data?.displayName);
    inventoryDetailsData.append('assetType', data?.assetType?._id);
    inventoryDetailsData.append('impact', data?.impact);
    inventoryDetailsData.append('description', data?.description);
    inventoryDetailsData.append(
      'assetLifeExpiry',
      data?.assetLifeExpiry?.toISOString(),
    );
    inventoryDetailsData.append('locationId', data?.location?._id);
    inventoryDetailsData.append('departmentId', data?.department?._id);
    inventoryDetailsData.append('usedBy', data?.usedBy?._id);
    inventoryDetailsData.append(
      'assignedOn',
      makeDateTime(data?.assignedOnDate, data?.assignedOnTime)?.toISOString(),
    );
    inventoryDetailsData.append('attachFile', data?.attachFile);
    const body = inventoryDetailsData;
    if (!!inventoryId) {
      submitUpdateInventory(data);
      return;
    }
    const postInventoryParameter = {
      body,
    };

    try {
      await postAddToInventoryTrigger(postInventoryParameter)?.unwrap();
      successSnackbar?.('Inventory Added Successfully');
      moveBack?.();
      reset();
    } catch (error: any) {
      errorSnackbar?.();
    }
  };
  useEffect(() => {
    reset(() => upsertInventoryFieldsDefaultValuesFunction(data));
  }, [data, reset]);

  const submitUpdateInventory = async (data: any) => {
    const inventoryEditData = new FormData();
    inventoryEditData.append('id', inventoryId as string);
    inventoryEditData.append('displayName', data?.displayName);
    inventoryEditData.append('assetType', data?.assetType?._id);
    inventoryEditData.append('impact', data?.impact);
    inventoryEditData.append('description', data?.description);
    inventoryEditData.append(
      'assetLifeExpiry',
      data?.assetLifeExpiry?.toISOString(),
    );
    inventoryEditData.append('locationId', data?.location?._id);
    inventoryEditData.append('departmentId', data?.department?._id);
    inventoryEditData.append('usedBy', data?.usedBy?._id);
    inventoryEditData.append(
      'assignedOn',
      makeDateTime(data?.assignedOnDate, data?.assignedOnTime)?.toISOString(),
    );
    // inventoryEditData.append('attachFile', data?.fileUrl);
    const body = inventoryEditData;
    const patchProductCatalogParameter = {
      body,
    };

    try {
      await patchAddToInventoryTrigger(patchProductCatalogParameter)?.unwrap();
      successSnackbar?.('Inventory Created Successfully!');
      moveBack?.();
      reset();
    } catch (error: any) {
      errorSnackbar?.();
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

  const moveBack = () => {
    if (!!inventoryId) {
      router?.push({
        pathname: AIR_SERVICES?.ASSETS_INVENTORY,
        query: {
          ...router?.query,
        },
      });
      return;
    }
    router?.push({
      pathname: AIR_SERVICES?.ASSETS_INVENTORY,
    });
  };

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
  };
};
