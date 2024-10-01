import { useForm, UseFormReturn } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { errorSnackbar, successSnackbar } from '@/utils/api';
import {
  upsertFolderFormDefaultValues,
  upsertFolderValidationSchema,
} from './UpsertFolder.data';
import { UpsertFolderFormFieldsI } from './UpsertFolder.interface';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { setIsPortalClose } from '@/redux/slices/airServices/knowledge-base/slice';
import { useGetFoldersApi } from '../../KnowledgeBaseHooks/useGetFoldersApi';
import {
  useAddServicesKnowledgeBaseSingleFolderMutation,
  useUpdateServicesKnowledgeBaseSingleFolderMutation,
} from '@/services/airServices/knowledge-base/articles';
import { KNOWLEDGE_BASE_ACTIONS_CONSTANT } from '@/constants/portal-actions';

const { EDIT_FOLDER } = KNOWLEDGE_BASE_ACTIONS_CONSTANT ?? {};

export const useUpsertFolder = () => {
  const { getArticlesFolderListForFilterData } = useGetFoldersApi?.();

  const selectedFolder = useAppSelector(
    (state) => state?.servicesKnowledgeBase?.selectedFolder,
  );
  const dispatch = useAppDispatch();
  const isPortalOpen = useAppSelector(
    (state) => state?.servicesKnowledgeBase?.isPortalOpen,
  );

  const setEditDefaultValues =
    isPortalOpen?.action === EDIT_FOLDER ? selectedFolder : undefined;

  const methods: UseFormReturn<UpsertFolderFormFieldsI> =
    useForm<UpsertFolderFormFieldsI>({
      resolver: yupResolver(upsertFolderValidationSchema),
      defaultValues: upsertFolderFormDefaultValues?.(setEditDefaultValues),
    });

  const { handleSubmit, reset } = methods;

  const [postFolderTrigger, postFolderStatus] =
    useAddServicesKnowledgeBaseSingleFolderMutation();
  const [updateFolderForArticlesTrigger, updateFolderForArticlesStatus] =
    useUpdateServicesKnowledgeBaseSingleFolderMutation();

  const onSubmit = async (data: UpsertFolderFormFieldsI) => {
    const body = {
      ...data,
      visibility: data?.visibility?._id,
    };
    const apiDataParameter = { body };

    if (isPortalOpen?.action === EDIT_FOLDER) {
      submitUpdateFolder(body);
      return;
    }

    try {
      await postFolderTrigger(apiDataParameter)?.unwrap();
      successSnackbar('Folder created successfully!');
      closePortal?.();
      await getArticlesFolderListForFilterData?.();
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
      await getArticlesFolderListForFilterData?.();
    } catch (error: any) {
      errorSnackbar?.(error?.data?.message);
    }
  };

  const closePortal = () => {
    reset();
    dispatch(setIsPortalClose());
  };

  const showLoader =
    postFolderStatus?.isLoading || updateFolderForArticlesStatus?.isLoading;

  return {
    methods,
    handleSubmit,
    onSubmit,
    postFolderStatus,
    closePortal,
    updateFolderForArticlesStatus,
    isPortalOpen,
    selectedFolder,
    showLoader,
  };
};
