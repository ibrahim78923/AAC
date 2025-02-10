import {
  updateContractFormValidationSchema,
  updateContractFormFieldsFunction,
  updateContractFormDefaultValuesFunction,
} from './UpdateContract.data';
import { useRouter } from 'next/router';
import { useTheme } from '@mui/material';
import {
  useGetSingleContractByIdQuery,
  usePatchContractRenewExtendMutation,
} from '@/services/airServices/assets/contracts';
import { useEffect } from 'react';
import { MODULE_TYPE } from '@/constants/strings';
import { usePostAttachmentsMutation } from '@/services/airServices/tickets/attachments';
import { AIR_SERVICES } from '@/constants/routes';
import { errorSnackbar, successSnackbar } from '@/lib/snackbar';
import { useFormLib } from '@/hooks/useFormLib';

export const useUpdateContract = () => {
  const theme = useTheme();
  const router = useRouter();
  const [patchAddToContractTrigger, patchAddToContractStatus] =
    usePatchContractRenewExtendMutation();
  const [postAttachmentsTrigger, postAttachmentsStatus] =
    usePostAttachmentsMutation();
  const { contractId } = router?.query;
  const getSingleContractParameter = {
    pathParam: {
      contractId,
    },
  };

  const actionRenewExtend = router?.query?.action as string;

  const { data, isLoading, isFetching, isError, refetch }: any =
    useGetSingleContractByIdQuery(getSingleContractParameter, {
      refetchOnMountOrArgChange: true,
      skip: !!!contractId,
    });

  const formLibProps = {
    validationSchema: updateContractFormValidationSchema,
    defaultValues: updateContractFormDefaultValuesFunction(data),
  };

  const { handleSubmit, reset, methods } = useFormLib(formLibProps);

  const handleCancelBtn = () => {
    router?.push({ pathname: AIR_SERVICES?.ASSETS_CONTRACTS });
  };

  const submitUpdateContractForm = async (data: any) => {
    if (data?.attachment) {
      const contractAttachment = new FormData();
      contractAttachment?.append('fileUrl', data?.attachment);
      contractAttachment?.append('recordId', contractId as string);
      contractAttachment?.append('module', MODULE_TYPE?.CONTRACTS);
      const postContractAttachmentParameter = {
        body: contractAttachment,
      };
      try {
        await postAttachmentsTrigger(postContractAttachmentParameter)?.unwrap();
      } catch (error: any) {
        errorSnackbar?.(error?.data?.message);
      }
    }

    const ContractDetailsData = new FormData();
    ContractDetailsData?.append('id', contractId as string);
    ContractDetailsData?.append(
      'statusRenewExtend',
      actionRenewExtend?.toUpperCase() as string,
    );
    ContractDetailsData?.append('startDate', data?.startDate?.toISOString());
    ContractDetailsData?.append('endDate', data?.endDate?.toISOString());
    ContractDetailsData?.append('cost', data?.cost);
    data?.approver !== null &&
      ContractDetailsData?.append('approver', data?.approver?._id);

    const body = ContractDetailsData;

    const postContractParameter = {
      pathParam: { contractId },
      body,
    };

    try {
      await patchAddToContractTrigger(postContractParameter)?.unwrap();
      router?.push(AIR_SERVICES?.ASSETS_CONTRACTS);
      successSnackbar?.(`Contract ${actionRenewExtend} successfully`);
      reset?.();
    } catch (error: any) {
      errorSnackbar?.(error?.data?.message);
    }
  };
  useEffect(() => {
    reset(() => updateContractFormDefaultValuesFunction(data));
  }, [data, reset]);

  const updateContractFormFields =
    updateContractFormFieldsFunction(actionRenewExtend);

  const showLoader = isLoading || isFetching;

  const apiCallInProgress =
    patchAddToContractStatus?.isLoading || postAttachmentsStatus?.isLoading;

  return {
    methods,
    handleSubmit,
    submitUpdateContractForm,
    router,
    theme,
    handleCancelBtn,
    updateContractFormFields,
    contractId,
    postAttachmentsStatus,
    patchAddToContractStatus,
    showLoader,
    apiCallInProgress,
    isError,
    refetch,
    actionRenewExtend,
  };
};
