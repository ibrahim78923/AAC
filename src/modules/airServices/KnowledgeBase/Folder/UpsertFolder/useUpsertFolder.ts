import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { enqueueSnackbar } from 'notistack';
import {
  upsertValidationSchema,
  upsertDefaultValues,
} from './UpsertFolder.data';
import { usePostFolderMutation } from '@/services/airServices/assets/knowledge-base/articles';
import { NOTISTACK_VARIANTS } from '@/constants/strings';
import { errorSnackbar } from '@/utils/api';

export const useUpsertFolder = (props: any) => {
  const { setOpenDialog } = props;
  const methods: any = useForm<any>({
    resolver: yupResolver(upsertValidationSchema),
    defaultValues: upsertDefaultValues,
  });

  const { handleSubmit, reset } = methods;
  const [postFolderTrigger, postFolderStatus] = usePostFolderMutation();

  const onSubmit = async (data: any) => {
    try {
      await postFolderTrigger(data)?.unwrap();
      enqueueSnackbar('Create Folder Successfully!', {
        variant: NOTISTACK_VARIANTS?.SUCCESS,
      });
      closeUpsetFolderModal?.();
    } catch (error: any) {
      errorSnackbar?.();
    }
  };

  const closeUpsetFolderModal = () => {
    setOpenDialog(false);
    reset();
  };
  return {
    methods,
    handleSubmit,
    onSubmit,
    postFolderStatus,
    closeUpsetFolderModal,
  };
};
