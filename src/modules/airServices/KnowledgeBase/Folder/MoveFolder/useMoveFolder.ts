import {
  moveFolderValidationSchema,
  moveFolderDefaultValues,
  moveFolderFormFieldsDynamic,
} from './MoveFolder.data';
import { useUpdateServicesKnowledgeBaseSingleArticleMutation } from '@/services/airServices/knowledge-base/articles';
import { ARRAY_INDEX } from '@/constants/strings';
import { MoveFolderFormFieldsI } from './MoveFolder.interface';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import {
  emptySelectedArticlesList,
  setIsPortalClose,
} from '@/redux/slices/airServices/knowledge-base/slice';
import { errorSnackbar, successSnackbar } from '@/lib/snackbar';
import { useFormLib } from '@/hooks/useFormLib';

const { ZERO } = ARRAY_INDEX ?? {};

export const useMoveFolder = () => {
  const dispatch = useAppDispatch();
  const isPortalOpen = useAppSelector(
    (state) => state?.servicesKnowledgeBase?.isPortalOpen,
  );

  const selectedArticlesList = useAppSelector(
    (state) => state?.servicesKnowledgeBase?.selectedArticlesList,
  );

  const selectedFolderName = selectedArticlesList?.[ZERO]?.folder?.name;

  const [patchArticleTrigger, patchArticleStatus] =
    useUpdateServicesKnowledgeBaseSingleArticleMutation();

  const formLibProps = {
    validationSchema: moveFolderValidationSchema,
    defaultValues: moveFolderDefaultValues?.(selectedFolderName),
  };

  const { reset, handleSubmit, methods } = useFormLib(formLibProps);

  const submitMoveFolder = async (data: MoveFolderFormFieldsI) => {
    const selectedFolderId = selectedArticlesList?.[ZERO]?.folder?._id;
    const isFolderSame = data?.folder?._id === selectedFolderId;
    if (isFolderSame) {
      errorSnackbar('Article is already in the selected folder');
      return;
    }
    const upsertArticle = new FormData();
    upsertArticle?.append('folder', data?.folder?._id);
    upsertArticle?.append('id', selectedArticlesList?.[ZERO]?._id);
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
  const apiCallInProgress = patchArticleStatus?.isLoading;

  return {
    methods,
    submitMoveFolder,
    patchArticleStatus,
    handleSubmit,
    closeMoveFolderModal,
    moveFolderFormFields,
    isPortalOpen,
    apiCallInProgress,
  };
};
