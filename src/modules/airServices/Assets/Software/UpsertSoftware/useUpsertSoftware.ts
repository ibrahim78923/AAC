import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { enqueueSnackbar } from 'notistack';
import {
  upsertSoftwareFormDefaultValues,
  upsertSoftwareFormValidationSchema,
} from './UpsertSoftware.data';

export const useUpsertSoftware = (props: any) => {
  const { onClose } = props;
  const methods = useForm({
    resolver: yupResolver(upsertSoftwareFormValidationSchema),
    defaultValues: upsertSoftwareFormDefaultValues,
  });
  const { handleSubmit } = methods;

  const submitUpsertSoftwareForm = async () => {
    onClose(false);
    enqueueSnackbar('Information Created Successfully', {
      variant: 'success',
      autoHideDuration: 1000,
    });
  };
  return {
    methods,
    handleSubmit,
    submitUpsertSoftwareForm,
  };
};
