import { useForm, useWatch } from 'react-hook-form';
import {
  upsertContractFormDefaultValuesFunction,
  upsertContractFormFieldsDataFunction,
  upsertContractFormSchemaFunction,
} from './UpsertContract.data';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTheme } from '@mui/material';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { enqueueSnackbar } from 'notistack';
import { AIR_SERVICES } from '@/constants';

export const useUpsertContract = () => {
  const theme = useTheme();
  const router = useRouter();
  const [contractType, setContractType] = useState(
    (router?.query?.contractType ?? '') as string,
  );

  const upsertContractFormMethods = useForm<any>({
    resolver: yupResolver<any>(upsertContractFormSchemaFunction),
    defaultValues: upsertContractFormDefaultValuesFunction(contractType),
    reValidateMode: 'onBlur',
  });
  const {
    handleSubmit,
    control,
    setValue,
    getValues,
    setError,
    clearErrors,
    reset,
  } = upsertContractFormMethods;

  const watchForNotifyExpiry = useWatch({
    control,
    name: 'notifyExpiry',
    defaultValue: false,
  });
  const handleCancelBtn = () => {
    router.push({ pathname: AIR_SERVICES?.ASSETS_CONTRACTS });
  };
  // TODO: we will use it after BE integration
  // useEffect(() => {
  //   reset(() =>
  //     upsertContractFormDefaultValuesFunction(contractType),
  //   );
  // }, [contractType,  reset]);

  const submitUpsertContractForm = () => {
    enqueueSnackbar('Contract Created Successfully', {
      variant: 'success',
    });
    reset(upsertContractFormDefaultValuesFunction(contractType));
  };

  const upsertContractFormFieldsData = upsertContractFormFieldsDataFunction(
    watchForNotifyExpiry,
    setValue,
    getValues,
    clearErrors,
    setError,
    contractType,
    setContractType,
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
