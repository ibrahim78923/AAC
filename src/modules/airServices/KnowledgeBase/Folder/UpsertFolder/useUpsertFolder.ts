import { useForm, UseFormReturn } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import {
  usePostFolderMutation,
  useUpdateFolderForArticlesMutation,
} from '@/services/airServices/knowledge-base/articles';
import { errorSnackbar, successSnackbar } from '@/utils/api';
import {
  upsertFolderFormDefaultValues,
  upsertFolderValidationSchema,
} from './UpsertFolder.data';
import { ArticlesPortalComponentPropsI } from '../../Articles/Articles.interface';
import { UpsertFolderFormFieldsI } from './UpsertFolder.interface';

export const useUpsertFolder = (props: ArticlesPortalComponentPropsI) => {
  const { setIsPortalOpen, isPortalOpen, getFolderListData } = props;

  const methods: UseFormReturn<UpsertFolderFormFieldsI> =
    useForm<UpsertFolderFormFieldsI>({
      resolver: yupResolver(upsertFolderValidationSchema),
      defaultValues: upsertFolderFormDefaultValues?.(isPortalOpen?.data),
    });

  const { handleSubmit, reset } = methods;

  const [postFolderTrigger, postFolderStatus] = usePostFolderMutation();
  const [updateFolderForArticlesTrigger, updateFolderForArticlesStatus] =
    useUpdateFolderForArticlesMutation();

  const onSubmit = async (data: UpsertFolderFormFieldsI) => {
    const body = {
      ...data,
      visibility: data?.visibility?._id,
    };
    const apiDataParameter = { body };

    if (!!isPortalOpen?.data?._id) {
      submitUpdateFolder(body);
      return;
    }

    try {
      await postFolderTrigger(apiDataParameter)?.unwrap();
      successSnackbar('Folder created successfully!');
      closePortal?.();
      await getFolderListData?.();
    } catch (error: any) {
      errorSnackbar?.(error?.data?.message);
    }
  };

  const submitUpdateFolder = async (body: UpsertFolderFormFieldsI) => {
    const queryParams = {
      id: isPortalOpen?.data?._id,
    };

    const apiDataParameter = { body, queryParams };

    try {
      await updateFolderForArticlesTrigger(apiDataParameter)?.unwrap();
      successSnackbar('Folder updated successfully!');
      closePortal?.();
      await getFolderListData?.();
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
    updateFolderForArticlesStatus,
  };
};
