import { useForm, useWatch } from 'react-hook-form';
import {
  billingCycleOptions,
  CONTRACT_TYPES_CHECK,
  licenseTypeOptions,
  softwareLicense,
  todayDate,
  upsertContractFormDefaultValuesFunction,
  upsertContractFormFieldsDataFunction,
  upsertContractFormSchemaFunction,
} from './UpsertContract.data';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTheme } from '@mui/material';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { AIR_SERVICES } from '@/constants';
import {
  usePostContractMutation,
  useGetSingleContractByIdQuery,
  usePutContractMutation,
  useLazyGetUsersDropdownListForContractApprovalsQuery,
  useLazyGetVendorDropdownListForContractApprovalsQuery,
  useLazyGetAssetsDropdownListForContractApprovalsQuery,
  useLazyGetSoftwareDropdownListForContractApprovalsQuery,
  useLazyGetContractTypeListQuery,
} from '@/services/airServices/assets/contracts';
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

export const useUpsertContract = () => {
  const theme = useTheme();
  const router = useRouter();

  const [form, setForm] = useState<any>([]);

  const { contractId } = router?.query;

  const auth: any = useAuth();
  const { _id: productId } = auth?.product;

  const [postContractTrigger, postContractStatus] = usePostContractMutation();
  const [putContractTrigger, putContractStatus] = usePutContractMutation();

  const getSingleContractParameter = {
    pathParam: {
      contractId,
    },
  };

  const { data, isLoading, isFetching, isError }: any =
    useGetSingleContractByIdQuery(getSingleContractParameter, {
      refetchOnMountOrArgChange: true,
      skip: !!!contractId,
    });

  const upsertContractFormMethods = useForm<any>({
    resolver: yupResolver<any>(upsertContractFormSchemaFunction?.(form)),
    defaultValues: upsertContractFormDefaultValuesFunction?.(data, form),
  });

  const { handleSubmit, control, setValue, getValues, clearErrors, reset } =
    upsertContractFormMethods;

  const watchForNotifyExpiry = useWatch({
    control,
    name: 'notifyExpiry',
    defaultValue: false,
  });

  const watchForContractType = useWatch({
    control,
    name: 'type',
    defaultValue: null,
  });

  const [getDynamicFieldsTrigger, getDynamicFieldsStatus] =
    useLazyGetDynamicFieldsQuery();
  const [postAttachmentTrigger, postAttachmentStatus] =
    usePostDynamicFormAttachmentsMutation();

  const getDynamicFormData = async () => {
    const params = {
      productType: DYNAMIC_FIELDS?.PT_SERVICES,
      moduleType: DYNAMIC_FIELDS?.MT_CONTRACT_TYPE,
      section: watchForContractType?._id,
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
    ...data?.data,
    contractName: filledFormValues?.name ?? '',
    contractNumber: filledFormValues?.contractNumber ?? '',
    type: filledFormValues?.contractTypeData ?? null,
    associateAssets: filledFormValues?.associatedAsset ?? null,
    cost: filledFormValues?.cost ?? 0,
    vendor: filledFormValues?.vendor ?? null,
    approver: filledFormValues?.approver ?? null,
    startDate: new Date(filledFormValues?.startDate ?? todayDate),
    endDate: new Date(filledFormValues?.endDate ?? todayDate),
    autoRenew: filledFormValues?.autoRenew ?? false,
    notifyExpiry: filledFormValues?.notifyRenewal ?? false,
    notifyBefore: filledFormValues?.notifyBefore ?? '',
    notifyTo: filledFormValues?.notifyTo ?? null,
    itemDetail: !!filledFormValues?.itemsDetail?.length
      ? filledFormValues?.itemsDetail
      : softwareLicense?.itemDetail,
    billingCycle: filledFormValues?.billingCycle
      ? billingCycleOptions?.find(
          (billingCycleOption: any) =>
            billingCycleOption?._id === filledFormValues?.billingCycle,
        )
      : null,
    licenseType: filledFormValues?.licenseType
      ? licenseTypeOptions?.find(
          (licenseTypeOption: any) =>
            licenseTypeOption?._id === filledFormValues?.licenseType,
        )
      : null,
    licenseKey: filledFormValues?.licenseKey ?? softwareLicense?.licenseKey,
    software: filledFormValues?.software ?? softwareLicense?.software,
    attachFile: null,
  };

  const prevContractTypeWatch = useRef(watchForContractType);

  useEffect(() => {
    if (
      !!watchForContractType &&
      watchForContractType?._id !== prevContractTypeWatch?.current?._id
    ) {
      if (
        Object?.values(CONTRACT_TYPES_CHECK)?.includes(
          watchForContractType?.name,
        )
      ) {
        setForm([]);
      } else if (
        !Object?.values(CONTRACT_TYPES_CHECK)?.includes(
          watchForContractType?.name,
        )
      ) {
        getDynamicFormData();
      }
      prevContractTypeWatch.current = watchForContractType;
    }
  }, [watchForContractType]);

  const handleCancelBtn = () => {
    router?.push({ pathname: AIR_SERVICES?.ASSETS_CONTRACTS });
  };

  useEffect(() => {
    if (getValues?.('type')?._id !== ' ') {
      clearErrors?.('type');
    }
    if (getValues?.('type') === null) {
      clearErrors?.('associateAssets');
      return;
    }
    if (getValues?.('type')?.name === CONTRACT_TYPES_CHECK?.SOFTWARE_LICENSE) {
      setValue?.('associateAssets', null);
      clearErrors?.('associateAssets');
      return;
    }
  }, [watchForContractType]);

  useEffect(() => {
    if (contractId) {
      if (Object?.keys(data?.data ?? {})?.length) {
        reset(() => upsertContractFormDefaultValuesFunction(data?.data, form));
      }
    } else {
      const currentValues = getValues();
      reset(() => ({
        ...upsertContractFormDefaultValuesFunction(updatedFilledValues, form),
        ...currentValues,
      }));
    }
  }, [data, reset, form, contractId]);

  const submitUpsertContractForm = async (data: any) => {
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

      const postContractForm = new FormData();
      postContractForm?.append('name', data?.contractName);
      postContractForm?.append('contractType', data?.type?._id);
      postContractForm?.append('cost', data?.cost);
      data?.vendor !== null &&
        postContractForm?.append('vendor', data?.vendor?._id);
      postContractForm?.append('startDate', data?.startDate?.toISOString());
      postContractForm?.append('endDate', data?.endDate?.toISOString());
      postContractForm?.append('autoRenew', data?.autoRenew);
      postContractForm?.append('notifyRenewal', data?.notifyExpiry);
      !!data?.notifyExpiry &&
        postContractForm?.append('notifyBefore', data?.notifyBefore);
      !!data?.notifyExpiry &&
        postContractForm?.append('notifyTo', data?.notifyTo?._id);
      postContractForm?.append('software', data?.software?._id);
      postContractForm?.append('itemsDetail', JSON.stringify(data?.itemDetail));
      postContractForm?.append('billingCycle', data?.billingCycle?._id);
      postContractForm?.append('licenseType', data?.licenseType?._id);
      postContractForm?.append('licenseKey', data?.licenseKey);

      data?.approver !== null &&
        postContractForm?.append('approver', data?.approver?._id);
      data?.associateAssets !== null &&
        postContractForm.append('associatedAsset', data?.associateAssets?._id);
      data?.attachFile !== null &&
        typeof data?.attachFile !== 'string' &&
        postContractForm?.append('attachments', data?.attachFile);

      if (body?.customFields) {
        postContractForm?.append(
          'customFields',
          JSON?.stringify(body?.customFields),
        );
      }

      if (!!contractId) {
        submitUpdateContract?.(postContractForm);
        return;
      }
      const postContractParameter = {
        body: postContractForm,
      };

      await postContractTrigger(postContractParameter)?.unwrap();
      successSnackbar('Contract created successfully');
      handleCancelBtn?.();
    } catch (e: any) {
      errorSnackbar(e?.data?.message);
    }
  };

  const submitUpdateContract = async (formData: any) => {
    const putContractParameter = {
      body: formData,
      pathParam: {
        contractId,
      },
    };
    try {
      await putContractTrigger(putContractParameter)?.unwrap();
      successSnackbar('Contract updated successfully');
      handleCancelBtn?.();
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
    }
  };

  const apiQueryVendor =
    useLazyGetVendorDropdownListForContractApprovalsQuery();
  const apiQueryAsset = useLazyGetAssetsDropdownListForContractApprovalsQuery();
  const apiQueryApprover =
    useLazyGetUsersDropdownListForContractApprovalsQuery();
  const apiQuerySoftware =
    useLazyGetSoftwareDropdownListForContractApprovalsQuery();
  const apiContractType = useLazyGetContractTypeListQuery();

  const upsertContractFormFieldsData = upsertContractFormFieldsDataFunction(
    watchForNotifyExpiry,
    watchForContractType,
    apiQueryVendor,
    apiQueryAsset,
    apiQueryApprover,
    apiQuerySoftware,
    contractId,
    productId,
    apiContractType,
  );

  return {
    upsertContractFormMethods,
    handleSubmit,
    submitUpsertContractForm,
    upsertContractFormFieldsData,
    theme,
    handleCancelBtn,
    postContractStatus,
    putContractStatus,
    isLoading,
    isFetching,
    isError,
    contractId,
    form,
    getDynamicFieldsStatus,
    postAttachmentStatus,
    watchForContractType,
  };
};
