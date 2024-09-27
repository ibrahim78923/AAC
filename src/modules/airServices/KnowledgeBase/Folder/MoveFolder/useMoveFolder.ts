import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  moveFolderValidationSchema,
  moveFolderDefaultValues,
  moveFolderFormFieldsDynamic,
} from './MoveFolder.data';
import { useUpdateServicesKnowledgeBaseSingleArticleMutation } from '@/services/airServices/knowledge-base/articles';
import { errorSnackbar, successSnackbar } from '@/utils/api';
import { ARRAY_INDEX } from '@/constants/strings';
import { MoveFolderFormFieldsI } from './MoveFolder.interface';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import {
  emptySelectedArticlesList,
  setIsPortalClose,
} from '@/redux/slices/airServices/knowledge-base/slice';

export const useMoveFolder = () => {
  const dispatch = useAppDispatch();
  const isPortalOpen = useAppSelector(
    (state) => state?.servicesKnowledgeBase?.isPortalOpen,
  );

  const selectedArticlesList = useAppSelector(
    (state) => state?.servicesKnowledgeBase?.selectedArticlesList,
  );

  const [patchArticleTrigger, patchArticleStatus] =
    useUpdateServicesKnowledgeBaseSingleArticleMutation();

  const methods = useForm<any>({
    resolver: yupResolver(moveFolderValidationSchema),
    defaultValues: moveFolderDefaultValues?.(selectedArticlesList),
  });

  const { reset, handleSubmit } = methods;

  const submitMoveFolder = async (data: MoveFolderFormFieldsI) => {
    const isFolderSame =
      data?.folder?._id ===
      selectedArticlesList?.[ARRAY_INDEX?.ZERO]?.folder?._id;
    if (isFolderSame) {
      errorSnackbar('Article is already in the selected folder');
      return;
    }
    const upsertArticle = new FormData();
    upsertArticle?.append('folder', data?.folder?._id);
    upsertArticle?.append('id', selectedArticlesList?.[ARRAY_INDEX?.ZERO]?._id);
    const patchArticleParameter = {
      body: upsertArticle,
    };
    try {
      await patchArticleTrigger(patchArticleParameter)?.unwrap();
      successSnackbar('Article moved to a new folder successfully');
      closeMoveFolderModal?.();
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
    }
  };

  const closeMoveFolderModal = () => {
    reset?.();
    dispatch(setIsPortalClose());
    dispatch(emptySelectedArticlesList());
  };

  const moveFolderFormFields = moveFolderFormFieldsDynamic();

  return {
    methods,
    submitMoveFolder,
    patchArticleStatus,
    handleSubmit,
    closeMoveFolderModal,
    moveFolderFormFields,
    isPortalOpen,
  };
};
