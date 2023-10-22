import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import {
  updateContractFormValidationSchema,
  updateContractFormDefaultValues,
} from './UpdateContract.data';
import { useRouter } from 'next/router';
import { enqueueSnackbar } from 'notistack';

export const useUpdateContract = () => {
  const methods: any = useForm({
    resolver: yupResolver(updateContractFormValidationSchema),
    defaultValues: updateContractFormDefaultValues,
  });
  const { handleSubmit } = methods;
  const router = useRouter();

  const submitHandlerUpdateContractForm = () => {
    handleSubmit(submitUpdateContractForm)();
  };

  const handleContractClick = () => {
    router.push('/air-services/assets/contracts');
  };
  const submitUpdateContractForm = async (data: any) => {
    console.log(data);
    enqueueSnackbar('Contract Extended successfully', {
      variant: 'success',
      autoHideDuration: 3000,
    });

    // router.push('/air-services/assets/contracts');
  };

  return {
    methods,
    handleSubmit,
    submitUpdateContractForm,
    handleContractClick,
    submitHandlerUpdateContractForm,
  };
};
