import {
  defaultValuesAddNewContract,
  validationSchemaAddNewContract,
} from './AddNewContractDetailForm';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/router';
import { enqueueSnackbar } from 'notistack';
import { useForm } from 'react-hook-form';

export function useAddNewContractDetailForm() {
  const router = useRouter();
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
    router.push('/air-services/assets/contracts');
  };

  const handleContractClick = () => {
    router.push('/air-services/assets/contracts');
  };
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
