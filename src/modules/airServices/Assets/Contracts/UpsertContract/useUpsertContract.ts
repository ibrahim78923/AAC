import { useForm, useWatch } from 'react-hook-form';
import {
  upsertContractFormDefaultValuesFunction,
  upsertContractFormFieldsDataFunction,
  upsertContractFormSchemaFunction,
} from './UpsertContract.data';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTheme } from '@mui/material';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { enqueueSnackbar } from 'notistack';
import { AIR_SERVICES } from '@/constants';
import { CONTRACT_TYPES } from '@/constants/strings';
import {
  useLazyGetVendorDropdownQuery,
  useLazyGetDropdownAssetsQuery,
} from '@/services/airServices/assets/contracts';

export const useUpsertContract = () => {
  const theme = useTheme();
  const router = useRouter();

  const upsertContractFormMethods = useForm<any>({
    resolver: yupResolver<any>(upsertContractFormSchemaFunction),
    defaultValues: upsertContractFormDefaultValuesFunction(),
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

  const handleCancelBtn = () => {
    router?.push({ pathname: AIR_SERVICES?.ASSETS_CONTRACTS });
  };

  useEffect(() => {
    if (getValues?.('type')?.label !== ' ') {
      clearErrors?.('type');
    }
    if (getValues?.('type') === null) {
      clearErrors?.('associateAssets');
      return;
    }
    if (getValues?.('type')?.label === CONTRACT_TYPES?.SOFTWARE_LICENSE) {
      setValue?.('associateAssets', null);
      clearErrors?.('associateAssets');
      return;
    }
    // setValue?.('associateAssets', getValues?.('associateAssets')?.displayName);
    // getValues?.('associateAssets') !== null
    //   ? clearErrors?.('associateAssets')
    //   : setError?.('associateAssets', {
    //       message: 'Required',
    //     });
  }, [watchForContractType]);
  // useEffect(() => {
  //   reset(upsertContractFormDefaultValuesFunction(contractType, getValues()));
  // }, [contractType, reset]);

  const submitUpsertContractForm = (data: any) => {
    const postContractForm = new FormData();
    postContractForm?.append('name', data?.contractName);
    postContractForm?.append('contractNumber', data?.contractNumber);
    postContractForm?.append('contractType', data?.type);
    postContractForm?.append('cost', data?.cost);
    postContractForm?.append('vendor', data?.vendor?._id);
    postContractForm?.append('startDate', data?.startDate);
    postContractForm?.append('endDate', data?.endDate);
    postContractForm?.append('autoRenew', data?.autoRenew);
    postContractForm?.append('notifyExpiry', data?.notifyExpiry);
    postContractForm?.append('approver', data?.approver?._id);
    postContractForm?.append('status', data?.status);
    postContractForm.append('assetId', data?.associateAssets?._id);
    data?.attachFile !== null &&
      typeof data?.attachFile !== 'string' &&
      postContractForm?.append('fileUrl', data?.attachFile);
    try {
      enqueueSnackbar('Contract Created Successfully', {
        variant: 'success',
      });
      reset(upsertContractFormDefaultValuesFunction());
    } catch (error: any) {
      enqueueSnackbar('Contract Created Successfully', {
        variant: 'success',
      });
      reset(upsertContractFormDefaultValuesFunction());
    }
  };
  const apiQueryVendor = useLazyGetVendorDropdownQuery();
  const apiQueryAsset = useLazyGetDropdownAssetsQuery();

  const upsertContractFormFieldsData = upsertContractFormFieldsDataFunction(
    watchForNotifyExpiry,
    watchForContractType,
    apiQueryVendor,
    apiQueryAsset,
  );
  return {
    upsertContractFormMethods,
    handleSubmit,
    submitUpsertContractForm,
    upsertContractFormFieldsData,
    theme,
    handleCancelBtn,
  };
};
