import { useForm, useWatch } from 'react-hook-form';
import {
  upsertContractFormDefaultValuesFunction,
  upsertContractFormFieldsDataFunction,
  upsertContractFormSchemaFunction,
} from './UpsertContract.data';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTheme } from '@mui/material';
import { useRouter } from 'next/router';
import { AIR_SERVICES } from '@/constants';
import {
  useLazyGetVendorDropdownQuery,
  useLazyGetDropdownAssetsQuery,
  usePostContractMutation,
  useLazyGetSoftwareDropdownQuery,
  useLazyGetAgentsDropdownQuery,
} from '@/services/airServices/assets/contracts';
import { errorSnackbar, successSnackbar } from '@/utils/api';

export const useUpsertContract = () => {
  const theme = useTheme();
  const router = useRouter();
  const [postContractTrigger, postContractStatus] = usePostContractMutation();
  const upsertContractFormMethods = useForm<any>({
    resolver: yupResolver<any>(upsertContractFormSchemaFunction),
    defaultValues: upsertContractFormDefaultValuesFunction(),
  });
  const { handleSubmit, control } = upsertContractFormMethods;

  const watchForNotifyExpiry = useWatch({
    control,
    name: 'notifyExpiry',
    defaultValue: false,
  });

  const handleCancelBtn = () => {
    router?.push({ pathname: AIR_SERVICES?.ASSETS_SOFTWARE_DETAIL });
  };

  const submitUpsertContractForm = async (data: any) => {
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
    postContractForm?.append('itemsDetail', data?.itemDetail);
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
    const postContractParameter = {
      body: postContractForm,
    };
    try {
      await postContractTrigger(postContractParameter)?.unwrap();
      successSnackbar('Contract Created Successfully');
      router?.back();
    } catch (error: any) {
      errorSnackbar();
    }
  };
  const apiQueryVendor = useLazyGetVendorDropdownQuery();
  const apiQueryAsset = useLazyGetDropdownAssetsQuery();
  const apiQueryApprover = useLazyGetAgentsDropdownQuery();
  const apiQuerySoftware = useLazyGetSoftwareDropdownQuery();

  const upsertContractFormFieldsData = upsertContractFormFieldsDataFunction(
    watchForNotifyExpiry,
    apiQueryVendor,
    apiQueryAsset,
    apiQueryApprover,
    apiQuerySoftware,
  );
  return {
    upsertContractFormMethods,
    handleSubmit,
    submitUpsertContractForm,
    upsertContractFormFieldsData,
    theme,
    handleCancelBtn,
    postContractStatus,
  };
};
