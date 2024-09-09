import { useForm, UseFormReturn } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  usePostFolderMutation,
  useUpdateFolderForArticlesMutation,
} from '@/services/airServices/knowledge-base/articles';
import { errorSnackbar, successSnackbar } from '@/utils/api';
import {
  FOLDER_ACTIONS_CONSTANT,
  upsertFolderFormDefaultValues,
  upsertFolderValidationSchema,
} from './UpsertFolder.data';
import { UpsertFolderFormFieldsI } from './UpsertFolder.interface';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { setIsPortalClose } from '@/redux/slices/airServices/knowledge-base/slice';

export const useUpsertFolder = () => {
  const selectedFolder = useAppSelector(
    (state) => state?.servicesKnowledgeBase?.selectedFolder,
  );
  const dispatch = useAppDispatch();
  const isPortalOpen = useAppSelector(
    (state) => state?.servicesKnowledgeBase?.isPortalOpen,
  );

  const setEditDefaultValues =
    isPortalOpen?.action === FOLDER_ACTIONS_CONSTANT?.EDIT_FOLDER
      ? selectedFolder
      : undefined;

  const methods: UseFormReturn<UpsertFolderFormFieldsI> =
    useForm<UpsertFolderFormFieldsI>({
      resolver: yupResolver(upsertFolderValidationSchema),
      defaultValues: upsertFolderFormDefaultValues?.(setEditDefaultValues),
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

    if (isPortalOpen?.action === FOLDER_ACTIONS_CONSTANT?.EDIT_FOLDER) {
      submitUpdateFolder(body);
      return;
    }

    try {
      await postFolderTrigger(apiDataParameter)?.unwrap();
      successSnackbar('Folder created successfully!');
      closePortal?.();
    } catch (error: any) {
      errorSnackbar?.(error?.data?.message);
    }
  };

  const submitUpdateFolder = async (body: UpsertFolderFormFieldsI) => {
    const queryParams = {
      id: selectedFolder?._id,
    };

    const apiDataParameter = { body, queryParams };

    try {
      await updateFolderForArticlesTrigger(apiDataParameter)?.unwrap();
      successSnackbar('Folder updated successfully!');
      closePortal?.();
    } catch (error: any) {
      errorSnackbar?.(error?.data?.message);
    }
  };

  const closePortal = () => {
    reset();
    dispatch(setIsPortalClose());
  };

  return {
    methods,
    handleSubmit,
    onSubmit,
    postFolderStatus,
    closePortal,
    updateFolderForArticlesStatus,
    isPortalOpen,
    selectedFolder,
  };
};
