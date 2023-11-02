import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { enqueueSnackbar } from 'notistack';
import {
  upsertValidationSchema,
  upsertDefaultValues,
} from './UpsertFolder.data';

export const useUpsertFolder = (props: any) => {
  const { setOpenDialog } = props;
  const methods: any = useForm({
    resolver: yupResolver(upsertValidationSchema),
    defaultValues: upsertDefaultValues,
  });

  const { handleSubmit, reset } = methods;

  const onSubmit = async () => {
    enqueueSnackbar('Create Folder Successfully!', {
      variant: 'success',
      autoHideDuration: 3000,
    });
    setOpenDialog(false);
    reset(upsertDefaultValues);
  };
  return {
    methods,
    handleSubmit,
    onSubmit,
  };
};
