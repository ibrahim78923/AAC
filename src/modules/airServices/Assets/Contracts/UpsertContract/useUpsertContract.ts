import { useForm, useWatch } from 'react-hook-form';
import {
  upsertContractFormDefaultValuesFunction,
  upsertContractFormFieldsDataFunction,
  upsertContractFormSchemaFunction,
} from './UpsertContract.data';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTheme } from '@mui/material';

export const useUpsertContract = () => {
  const theme = useTheme();
  const methods = useForm<any>({
    resolver: yupResolver<any>(upsertContractFormSchemaFunction),
    defaultValues: upsertContractFormDefaultValuesFunction(),
  });
  const { handleSubmit, control } = methods;

  const watchForNotifyExpiry = useWatch({
    control,
    name: 'notifyExpiry',
  });

  const watchForType = useWatch({
    control,
    name: 'type',
  });

  const submitUpsertContractForm = () => {
    // console.log(data);
  };

  const upsertContractFormFieldsData = upsertContractFormFieldsDataFunction(
    watchForType,
    watchForNotifyExpiry,
  );
  return {
    methods,
    handleSubmit,
    submitUpsertContractForm,
    upsertContractFormFieldsData,
    theme,
  };
};
