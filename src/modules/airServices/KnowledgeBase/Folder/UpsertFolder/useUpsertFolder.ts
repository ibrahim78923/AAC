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
  useGetServicesKnowledgeBaseSingleFolderByIdQuery,
  useUpdateServicesKnowledgeBaseSingleFolderMutation,
} from '@/services/airServices/knowledge-base/articles';
import { KNOWLEDGE_BASE_ACTIONS_CONSTANT } from '@/constants/portal-actions';
import { useEffect } from 'react';
import { ALL_FOLDER } from '../Folder.data';

const { EDIT_FOLDER, ADD_FOLDER } = KNOWLEDGE_BASE_ACTIONS_CONSTANT ?? {};

export const useUpsertFolder = () => {
  const { getArticlesFolderListForFilterData } = useGetFoldersApi?.();
  const selectedFolder = useAppSelector(
    (state) => state?.servicesKnowledgeBase?.selectedFolder,
  );

  const isPortalOpen = useAppSelector(
    (state) => state?.servicesKnowledgeBase?.isPortalOpen,
  );

  const apiDataParameter = {
    queryParams: {
      id: selectedFolder?._id,
    },
  };

  const skipApiCall =
    isPortalOpen?.action === ADD_FOLDER ||
    !!!selectedFolder?._id ||
    selectedFolder?._id === ALL_FOLDER;

  const {
    data,
    isLoading,
    isFetching,
    isError,
    refetch,
  }: { [key: string]: any } = useGetServicesKnowledgeBaseSingleFolderByIdQuery(
    apiDataParameter,
    {
      refetchOnMountOrArgChange: true,
      skip: skipApiCall,
    },
  );

  const dispatch = useAppDispatch();

  const methods: UseFormReturn<UpsertFolderFormFieldsI> =
    useForm<UpsertFolderFormFieldsI>({
      resolver: yupResolver(upsertFolderValidationSchema),
      defaultValues: upsertFolderFormDefaultValues?.(),
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

  useEffect(() => {
    reset(() => upsertFolderFormDefaultValues(data?.data));
  }, [data, reset]);

  const apiCallInProgress =
    postFolderStatus?.isLoading || updateFolderForArticlesStatus?.isLoading;

  const showLoader = isLoading || isFetching;

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
    isLoading,
    isFetching,
    isError,
    refetch,
    apiCallInProgress,
  };
};
