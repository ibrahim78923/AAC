import { useEffect, useRef, useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import {
  UpsertInventoryValidationSchema,
  upsertInventoryFieldsDefaultValuesFunction,
  upsertInventoryFormFieldsFirst,
  upsertInventoryFormFieldsSecond,
} from './UpsertInventory.data';
import { useRouter } from 'next/router';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTheme } from '@mui/material';
import {
  useGetAddToInventoryByIdQuery,
  useLazyGetAssetTypeInventoryDropdownQuery,
  useLazyGetAssetsInventoryDepartmentDropdownQuery,
  useLazyGetLocationsDropdownQuery,
  useLazyGetUsersDropdownQuery,
  usePatchAddToInventoryMutation,
  usePostInventoryMutation,
} from '@/services/airServices/assets/inventory';
import { AIR_SERVICES, DATE_TIME_FORMAT } from '@/constants';
import {
  errorSnackbar,
  filteredEmptyValues,
  successSnackbar,
} from '@/utils/api';
import useAuth from '@/hooks/useAuth';
import {
  useLazyGetDynamicFieldsQuery,
  usePostDynamicFormAttachmentsMutation,
} from '@/services/dynamic-fields';
import {
  DYNAMIC_FIELDS,
  DYNAMIC_FORM_FIELDS_TYPES,
  dynamicAttachmentsPost,
} from '@/utils/dynamic-forms';
import { ARRAY_INDEX, ASSET_IMPACT } from '@/constants/strings';
import dayjs from 'dayjs';
import { isoDateString } from '@/utils/dateTime';

export const useUpsertInventory = () => {
  const theme = useTheme();
  const router = useRouter();

  const [form, setForm] = useState<any>([]);
  const [initialLoad, setInitialLoad] = useState(true);

  const { query }: any = useRouter();
  const { inventoryId } = router?.query;

  const [patchAddToInventoryTrigger, patchAddToInventoryStatus] =
    usePatchAddToInventoryMutation();
  const [postAddToInventoryTrigger, postAddToInventoryStatus] =
    usePostInventoryMutation();

  const getSingleInventoryDetailsParameter = {
    pathParam: {
      inventoryId,
    },
  };

  const { data, isLoading, isFetching, isError }: any =
    useGetAddToInventoryByIdQuery(getSingleInventoryDetailsParameter, {
      refetchOnMountOrArgChange: true,
      skip: !!!inventoryId,
    });

  const methods = useForm({
    resolver: yupResolver(UpsertInventoryValidationSchema?.(form)),
    defaultValues: upsertInventoryFieldsDefaultValuesFunction?.(data, form),
  });
  const { handleSubmit, reset, control, getValues } = methods;

  const assetTypeWatch = useWatch({
    control,
    name: 'assetType',
    defaultValue: null,
  });

  const [getDynamicFieldsTrigger, getDynamicFieldsStatus] =
    useLazyGetDynamicFieldsQuery();
  const [postAttachmentTrigger, postAttachmentStatus] =
    usePostDynamicFormAttachmentsMutation();

  const getDynamicFormData = async () => {
    const params = {
      productType: DYNAMIC_FIELDS?.PT_SERVICES,
      moduleType: DYNAMIC_FIELDS?.MT_ASSET_TYPE,
      section: assetTypeWatch?._id,
    };
    const getDynamicFieldsParameters = { params };

    try {
      const res: any = await getDynamicFieldsTrigger(
        getDynamicFieldsParameters,
      )?.unwrap();
      setForm(res);
    } catch (error: any) {
      setForm([]);
    }
  };

  const filledFormValues = getValues();

  const updatedFilledValues = {
    ...data?.data?.[ARRAY_INDEX?.ZERO],
    displayName: filledFormValues?.displayName ?? '',
    assetTypeDetails: filledFormValues?.assetType ?? null,
    impact: filledFormValues?.impact ?? ASSET_IMPACT?.LOW,
    assetLifeExpiry: dayjs(filledFormValues?.assetLifeExpiry)?.format(
      DATE_TIME_FORMAT?.YYMMDD,
    ),
    description: filledFormValues?.description ?? '',
    locationDetails: filledFormValues?.location ?? null,
    departmentDetails: filledFormValues?.department ?? null,
    assignedOn: dayjs(filledFormValues?.assignedOn)?.format(
      DATE_TIME_FORMAT?.YYMMDD,
    ),
    usedByDetails: filledFormValues?.usedBy ?? null,
    fileUrl: null,
  };

  const prevAssetTypeWatch = useRef(assetTypeWatch);

  useEffect(() => {
    if (
      !!assetTypeWatch &&
      assetTypeWatch?._id !== prevAssetTypeWatch?.current?._id
    ) {
      getDynamicFormData();
      prevAssetTypeWatch.current = assetTypeWatch;
    }
    if (!assetTypeWatch) {
      setForm([]);
    }
  }, [assetTypeWatch]);

  useEffect(() => {
    if (initialLoad && inventoryId) {
      if (Object?.keys(data?.data?.[ARRAY_INDEX?.ZERO] ?? {})?.length) {
        reset(() =>
          upsertInventoryFieldsDefaultValuesFunction(
            data?.data?.[ARRAY_INDEX?.ZERO],
            form,
          ),
        );
        setInitialLoad(false);
      }
    } else {
      reset(() =>
        upsertInventoryFieldsDefaultValuesFunction(updatedFilledValues, form),
      );
    }
  }, [data, reset, form, initialLoad, inventoryId]);

  const submitUpsertInventory = async (data: any) => {
    const filteredEmptyData = filteredEmptyValues(data);

    const customFields: any = {};
    const body: any = {};
    const attachmentPromises: Promise<any>[] = [];

    try {
      dynamicAttachmentsPost({
        form,
        data,
        attachmentPromises,
        customFields,
        postAttachmentTrigger,
      });

      await Promise?.all(attachmentPromises);

      const customFieldKeys = new Set(
        form?.map((field: any) => field?.componentProps?.label),
      );

      Object?.entries(filteredEmptyData)?.forEach(([key, value]) => {
        if (customFieldKeys?.has(key)) {
          if (value instanceof Date) {
            value = isoDateString(value);
          }
          if (
            typeof value === DYNAMIC_FORM_FIELDS_TYPES?.OBJECT &&
            !Array?.isArray(value) &&
            value !== null
          ) {
            customFields[key] = { ...customFields[key], ...value };
          } else {
            customFields[key] = value;
          }
        } else {
          body[key] = value;
        }
      });

      if (Object?.keys(customFields)?.length > 0) {
        body.customFields = customFields;
      }

      const inventoryDetailsData = new FormData();
      inventoryDetailsData.append('displayName', data?.displayName);
      inventoryDetailsData.append('assetType', data?.assetType?._id);
      inventoryDetailsData.append('impact', data?.impact);
      inventoryDetailsData.append('description', data?.description);
      inventoryDetailsData.append(
        'assetLifeExpiry',
        isoDateString(data?.assetLifeExpiry),
      );
      !!data?.location?._id &&
        inventoryDetailsData.append('locationId', data?.location?._id);
      !!data?.department?._id &&
        inventoryDetailsData.append('departmentId', data?.department?._id);
      !!data?.usedBy?._id &&
        inventoryDetailsData.append('usedBy', data?.usedBy?._id);
      !!data?.assignedOn &&
        inventoryDetailsData.append(
          'assignedOn',
          isoDateString(data?.assignedOn),
        );
      data?.fileUrl !== null &&
        inventoryDetailsData?.append('attachment', data?.fileUrl);

      if (body?.customFields) {
        inventoryDetailsData?.append(
          'customFields',
          JSON?.stringify(body?.customFields),
        );
      }

      if (!!inventoryId) {
        submitUpdateInventory(inventoryDetailsData);
        return;
      }

      const postInventoryParameter = {
        body: inventoryDetailsData,
      };
      await postAddToInventoryTrigger(postInventoryParameter)?.unwrap();
      successSnackbar?.('Inventory Added Successfully');
      moveBack?.();
      reset();
    } catch (e: any) {
      errorSnackbar(e?.data?.message);
    }
  };

  const submitUpdateInventory = async (inventoryDetailsData: any) => {
    inventoryDetailsData.append('id', inventoryId as string);

    const patchProductCatalogParameter = {
      body: inventoryDetailsData,
    };

    try {
      await patchAddToInventoryTrigger(patchProductCatalogParameter)?.unwrap();
      successSnackbar?.('Inventory Updated Successfully!');
      moveBack?.();
      reset();
    } catch (error: any) {
      errorSnackbar?.(error?.data?.message);
    }
  };

  const auth: any = useAuth();

  const { _id: productId } = auth?.product;

  const apiQueryAssetType = useLazyGetAssetTypeInventoryDropdownQuery();
  const apiQueryDepartmentType =
    useLazyGetAssetsInventoryDepartmentDropdownQuery();
  const apiQueryLocationType = useLazyGetLocationsDropdownQuery();
  const apiQueryUsedByType = useLazyGetUsersDropdownQuery();

  const upsertInventoryFormFieldsOne =
    upsertInventoryFormFieldsFirst(apiQueryAssetType);

  const upsertInventoryFormFieldsTwo = upsertInventoryFormFieldsSecond(
    apiQueryDepartmentType,
    apiQueryLocationType,
    apiQueryUsedByType,
    productId,
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
    theme,
    submitUpsertInventory,
    handleSubmit,
    patchAddToInventoryStatus,
    isLoading,
    isFetching,
    isError,
    postAddToInventoryStatus,
    inventoryId,
    router,
    moveBack,
    upsertInventoryFormFieldsOne,
    upsertInventoryFormFieldsTwo,
    form,
    getDynamicFieldsStatus,
    postAttachmentStatus,
    assetTypeWatch,
  };
};
