import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { enqueueSnackbar } from 'notistack';
import {
  upsertValidationSchema,
  upsertDefaultValues,
} from './UpsertFolder.data';
import { usePostFolderMutation } from '@/services/airServices/assets/knowledge-base/articles';
import { NOTISTACK_VARIANTS } from '@/constants/strings';

export const useUpsertFolder = (props: any) => {
  const { setOpenDialog } = props;
  const methods: any = useForm({
    resolver: yupResolver(upsertValidationSchema),
    defaultValues: upsertDefaultValues,
  });

  const { handleSubmit, reset } = methods;
  const [createFolder] = usePostFolderMutation();

  const onSubmit = async () => {
    const payload = methods?.getValues();
    try {
      await createFolder(payload).unwrap();
      enqueueSnackbar('Create Folder Successfully!', {
        variant: NOTISTACK_VARIANTS?.SUCCESS,
        autoHideDuration: 3000,
      });
      setOpenDialog(false);
      reset(upsertDefaultValues);
    } catch (error: any) {
      enqueueSnackbar(error?.data?.message ?? 'Something went wrong!', {
        variant: NOTISTACK_VARIANTS?.ERROR,
        autoHideDuration: 3000,
      });
    }
  };
  return {
    methods,
    handleSubmit,
    onSubmit,
  };
};
