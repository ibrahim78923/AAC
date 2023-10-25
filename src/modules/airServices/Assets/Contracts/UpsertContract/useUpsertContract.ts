import { useForm } from 'react-hook-form';
import {
  upsertContractFormDefaultValuesFunction,
  upsertContractFormFieldsDataFunction,
} from './UpsertContract.data';

export const useUpsertContract = () => {
  const methods = useForm({
    defaultValues: upsertContractFormDefaultValuesFunction(),
  });
  const { handleSubmit } = methods;
  const submitUpsertContractForm = () => {};
  const upsertContractFormFieldsData = upsertContractFormFieldsDataFunction();
  return {
    methods,
    handleSubmit,
    submitUpsertContractForm,
    upsertContractFormFieldsData,
  };
};
