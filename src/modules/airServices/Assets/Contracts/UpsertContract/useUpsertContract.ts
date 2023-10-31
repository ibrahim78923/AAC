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

export const useUpsertContract = () => {
  const theme = useTheme();
  const router = useRouter();
  const [contractType, setContractType] = useState(
    (router.query.contractType ?? '') as string,
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

  // TODO: we will use it after BR integration
  // useEffect(() => {
  //   reset(() =>
  //     upsertContractFormDefaultValuesFunction(contractType),
  //   );
  // }, [contractType,  reset]);

  const submitUpsertContractForm = () => {
    // console.log(data);
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
  };
};
