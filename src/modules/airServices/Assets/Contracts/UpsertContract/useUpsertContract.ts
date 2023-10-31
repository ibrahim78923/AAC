import { useForm, useWatch } from 'react-hook-form';
import {
  upsertContractFormDefaultValuesFunction,
  upsertContractFormFieldsDataFunction,
  upsertContractFormSchemaFunction,
} from './UpsertContract.data';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTheme } from '@mui/material';
import { useRouter } from 'next/router';

export const useUpsertContract = () => {
  const theme = useTheme();
  const router = useRouter();
  const methods = useForm<any>({
    resolver: yupResolver<any>(upsertContractFormSchemaFunction),
    defaultValues: upsertContractFormDefaultValuesFunction(router),
    // shouldFocusError: false,
    reValidateMode: 'onBlur',
  });
  const { handleSubmit, control, setValue, getValues, setError, clearErrors } =
    methods;
  // console.log(control.register('type'));
  // console.log('hi');
  const watchForNotifyExpiry = useWatch({
    control,
    name: 'notifyExpiry',
    defaultValue: false,
  });

  // const watchForType = useWatch({
  //   control,
  //   name: '',
  //   defaultValue: '',
  // });

  const submitUpsertContractForm = () => {
    // console.log(data);
  };

  const upsertContractFormFieldsData = upsertContractFormFieldsDataFunction(
    // watchForType,
    watchForNotifyExpiry,
    setValue,
    getValues,
    router,
    control,
    clearErrors,
  );
  return {
    methods,
    handleSubmit,
    submitUpsertContractForm,
    upsertContractFormFieldsData,
    theme,
  };
};
