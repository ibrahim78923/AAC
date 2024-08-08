import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { usePostFolderMutation } from '@/services/airServices/knowledge-base/articles';
import { errorSnackbar, successSnackbar } from '@/utils/api';
import {
  upsertFolderFormDefaultValues,
  upsertFolderValidationSchema,
} from './UpsertFolder.data';

export const useUpsertFolder = (props: any) => {
  const { setIsPortalOpen, isPortalOpen } = props;

  const methods: any = useForm<any>({
    resolver: yupResolver(upsertFolderValidationSchema),
    defaultValues: upsertFolderFormDefaultValues?.(isPortalOpen?.data),
  });

  const { handleSubmit, reset } = methods;

  const [postFolderTrigger, postFolderStatus] = usePostFolderMutation();

  const onSubmit = async (data: any) => {
    const body = {
      ...data,
      visibility: data?.visibility?._id,
    };

    try {
      await postFolderTrigger(body)?.unwrap();
      successSnackbar('Create Folder Successfully!');
      closePortal?.();
    } catch (error: any) {
      errorSnackbar?.(error?.data?.message);
    }
  };

  const closePortal = () => {
    setIsPortalOpen({});
    reset();
  };

  return {
    methods,
    handleSubmit,
    onSubmit,
    postFolderStatus,
    closePortal,
  };
};
