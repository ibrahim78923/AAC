import { useWatch } from 'react-hook-form';
import {
  upsertContractFormDefaultValuesFunction,
  upsertContractFormFieldsDataFunction,
  upsertContractFormSchemaFunction,
} from './UpsertContract.data';
import { useTheme } from '@mui/material';
import { useRouter } from 'next/router';
import {
  usePostContractMutation,
  useLazyGetContractTypeListQuery,
} from '@/services/airServices/assets/contracts';
import { useGetSingleSoftwareByIdQuery } from '@/services/airServices/assets/software/single-software-detail/contracts';
import { useEffect } from 'react';
import { AIR_SERVICES } from '@/constants/routes';
import { errorSnackbar, successSnackbar } from '@/lib/snackbar';
import { isoDateString } from '@/lib/date-time';
import { STATIC_CONTRACT_TYPES } from '@/constants/api';
import { useFormLib } from '@/hooks/useFormLib';

export const useUpsertContract = () => {
  const theme = useTheme();
  const router = useRouter();
  const { softwareId }: any = router?.query;
  const [postContractTrigger, postContractStatus] = usePostContractMutation();

  const useFormValues = {
    validationSchema: upsertContractFormSchemaFunction,
    defaultValues: upsertContractFormDefaultValuesFunction(),
  };

  const { handleSubmit, control, reset, watch, methods } =
    useFormLib(useFormValues);

  const getSingleSoftwareParameter = {
    queryParams: {
      id: softwareId,
    },
  };

  const { data, isLoading, isFetching, isError, refetch }: any =
    useGetSingleSoftwareByIdQuery(getSingleSoftwareParameter, {
      refetchOnMountOrArgChange: true,
      skip: !!!softwareId,
    });

  const watchForNotifyExpiry = useWatch({
    control,
    name: 'notifyExpiry',
    defaultValue: false,
  });

  const handleCancelBtn = () => {
    router?.push({
      pathname: AIR_SERVICES?.ASSETS_SOFTWARE_DETAIL,
      query: {
        softwareId,
      },
    });
  };

  const [triggerContractSoftware, contractSoftwareStatus]: any =
    useLazyGetContractTypeListQuery();

  useEffect(() => {
    const params = new URLSearchParams();
    params.append('search', STATIC_CONTRACT_TYPES?.SOFTWARE_LICENSE);
    params.append('meta', 'false');
    triggerContractSoftware({ params });
  }, []);

  const softwareFind = contractSoftwareStatus?.data?.find(
    (item: any) => item?.name === STATIC_CONTRACT_TYPES?.SOFTWARE_LICENSE,
  );

  useEffect(() => {
    reset(upsertContractFormDefaultValuesFunction(data?.data, softwareFind));
  }, [data, reset, softwareFind]);

  const submitUpsertContractForm = async (data: any) => {
    const postContractForm = new FormData();
    postContractForm?.append('name', data?.contractName);
    postContractForm?.append('contractType', data?.type?._id);
    postContractForm?.append('cost', data?.cost);
    data?.vendor !== null &&
      postContractForm?.append('vendor', data?.vendor?._id);
    postContractForm?.append('startDate', isoDateString(data?.startDate));
    postContractForm?.append('endDate', isoDateString(data?.endDate));
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
    data?.attachFile !== null &&
      typeof data?.attachFile !== 'string' &&
      postContractForm?.append('attachments', data?.attachFile);
    const postContractParameter = {
      body: postContractForm,
    };
    try {
      await postContractTrigger(postContractParameter)?.unwrap();
      successSnackbar('Contract created successfully');
      handleCancelBtn?.();
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
    }
  };

  const watchStartDate = watch('startDate');

  const upsertContractFormFieldsData = upsertContractFormFieldsDataFunction(
    watchForNotifyExpiry,
    watchStartDate,
  );
  return {
    methods,
    handleSubmit,
    submitUpsertContractForm,
    upsertContractFormFieldsData,
    theme,
    handleCancelBtn,
    postContractStatus,
    isLoading,
    isFetching,
    isError,
    refetch,
  };
};
