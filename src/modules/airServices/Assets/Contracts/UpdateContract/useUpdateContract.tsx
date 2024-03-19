import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import {
  updateContractFormValidationSchema,
  updateContractFormFieldsFunction,
  updateContractFormDefaultValuesFunction,
} from './UpdateContract.data';
import { useRouter } from 'next/router';

import { AIR_SERVICES } from '@/constants';
import { useTheme } from '@mui/material';
import {
  useGetSingleContractByIdQuery,
  useLazyGetAgentsDropdownQuery,
  usePatchContractRenewExtendMutation,
} from '@/services/airServices/assets/contracts';
import { useSearchParams } from 'next/navigation';
import { errorSnackbar, successSnackbar } from '@/utils/api';
import { useEffect } from 'react';
import { CONTRACT_ACTION } from '@/constants/strings';

export const useUpdateContract = () => {
  const theme = useTheme();
  const router = useRouter();
  const [patchAddToContractTrigger] = usePatchContractRenewExtendMutation();
  const { contractId } = router?.query;
  const getSingleContractParameter = {
    pathParam: {
      contractId,
    },
  };

  const actionRenewExtend = useSearchParams().get('action');
  const { data }: any = useGetSingleContractByIdQuery(
    getSingleContractParameter,
    {
      refetchOnMountOrArgChange: true,
      skip: !!!contractId,
    },
  );

  const methods: any = useForm({
    resolver: yupResolver<any>(updateContractFormValidationSchema),
    defaultValues: updateContractFormDefaultValuesFunction(data),
    reValidateMode: 'onBlur',
  });

  const { handleSubmit, reset } = methods;

  const handleCancelBtn = () => {
    router?.push({ pathname: AIR_SERVICES?.ASSETS_CONTRACTS });
  };

  const submitUpdateContractForm = async (data: any) => {
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
      if (actionRenewExtend === CONTRACT_ACTION?.RENEW)
        successSnackbar?.('Contract Renew Successfully');
      else if (actionRenewExtend === CONTRACT_ACTION?.EXTEND)
        successSnackbar?.('Contract Extend Successfully');
      router?.push(AIR_SERVICES?.ASSETS_CONTRACTS);
      reset?.();
    } catch (error: any) {
      errorSnackbar?.();
    }
  };
  useEffect(() => {
    reset(() => updateContractFormDefaultValuesFunction(data));
  }, [data, reset]);
  const apiQueryApprover = useLazyGetAgentsDropdownQuery();
  const updateContractFormFields = updateContractFormFieldsFunction(
    apiQueryApprover,
    actionRenewExtend,
  );

  return {
    methods,
    handleSubmit,
    submitUpdateContractForm,
    router,
    theme,
    handleCancelBtn,
    updateContractFormFields,
  };
};
