import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  moveFolderValidationSchema,
  moveFolderDefaultValues,
  moveFolderFormFieldsDynamic,
} from './MoveFolder.data';
import {
  useLazyGetFoldersDropdownForMoveArticlesQuery,
  usePatchArticleMutation,
} from '@/services/airServices/knowledge-base/articles';
import { errorSnackbar, successSnackbar } from '@/utils/api';
import { ARRAY_INDEX } from '@/constants/strings';
import { MoveFolderFormFieldsI } from './MoveFolder.interface';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import {
  emptySelectedArticlesList,
  setIsPortalClose,
} from '@/redux/slices/airServices/knowledge-base/slice';
import useAuth from '@/hooks/useAuth';

export const useMoveFolder = () => {
  const auth: any = useAuth();
  const { _id: companyId } =
    auth?.product?.accounts?.[ARRAY_INDEX?.ZERO]?.company;
  const { _id: userId } = auth?.user;
  const { _id: organizationId } = auth?.user?.organization;

  const dispatch = useAppDispatch();
  const isPortalOpen = useAppSelector(
    (state) => state?.servicesKnowledgeBase?.isPortalOpen,
  );
  const selectedArticlesList = useAppSelector(
    (state) => state?.servicesKnowledgeBase?.selectedArticlesList,
  );
  const [patchArticleTrigger, patchArticleStatus] = usePatchArticleMutation();

  const methods = useForm<any>({
    resolver: yupResolver(moveFolderValidationSchema),
    defaultValues: moveFolderDefaultValues?.(selectedArticlesList),
  });

  const { reset, handleSubmit } = methods;

  const submitMoveFolder = async (data: MoveFolderFormFieldsI) => {
    const upsertArticle = new FormData();
    upsertArticle?.append('folder', data?.moveTo?._id);
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
  const apiExternalParamsForMoveFolder = {
    userId,
    companyId,
    organizationId,
  };

  const apiQueryFolder = useLazyGetFoldersDropdownForMoveArticlesQuery();
  const moveFolderFormFields = moveFolderFormFieldsDynamic(
    apiQueryFolder,
    apiExternalParamsForMoveFolder,
  );

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
