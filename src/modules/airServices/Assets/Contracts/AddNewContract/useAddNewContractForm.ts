import {
  defaultValuesAddNewContract,
  validationSchemaAddNewContract,
} from './AddNewContractDetailForm';
import { yupResolver } from '@hookform/resolvers/yup';
import { enqueueSnackbar } from 'notistack';
import { useForm } from 'react-hook-form';

export function useAddNewContractForm(): any {
  const methodsAddNewContract = useForm({
    resolver: yupResolver(validationSchemaAddNewContract),
    defaultValuesAddNewContract,
  });

  const handleContractSubmit = async () => {
    enqueueSnackbar('New Contract form submitted successfully', {
      variant: 'success',
      autoHideDuration: 3000,
    });
    methodsAddNewContract.reset();
  };

  const handleContractClick = () => {};
  const handleSubmitForm =
    methodsAddNewContract.handleSubmit(handleContractSubmit);

  const onSubmit = () => {};
  return {
    methodsAddNewContract,
    validationSchemaAddNewContract,
    defaultValuesAddNewContract,
    handleSubmitForm,
    handleContractClick,
    onSubmit,
  };
}
