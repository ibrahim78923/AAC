import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  moveFolderValidationSchema,
  moveFolderDefaultValues,
  moveFolderFormFieldsDynamic,
} from './MoveFolder.data';
import {
  useLazyGetFoldersDropdownQuery,
  usePatchArticleMutation,
} from '@/services/airServices/knowledge-base/articles';
import { errorSnackbar, successSnackbar } from '@/utils/api';
import { ArticlesPortalComponentPropsI } from '../Articles.interface';
import { ARRAY_INDEX } from '@/constants/strings';
import { MoveFolderFormFieldsI } from './MoveFolder.interface';

export const useMoveFolder = (props: ArticlesPortalComponentPropsI) => {
  const { selectedArticlesData, setSelectedArticlesData, setIsPortalOpen } =
    props;

  const [patchArticleTrigger, patchArticleStatus] = usePatchArticleMutation();

  const methods = useForm<any>({
    resolver: yupResolver(moveFolderValidationSchema),
    defaultValues: moveFolderDefaultValues?.(selectedArticlesData),
  });

  const { reset, handleSubmit } = methods;

  const submitMoveFolder = async (data: MoveFolderFormFieldsI) => {
    const upsertArticle = new FormData();
    upsertArticle?.append('folder', data?.moveTo?._id);
    upsertArticle?.append('id', selectedArticlesData?.[ARRAY_INDEX?.ZERO]?._id);
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
    setIsPortalOpen?.({});
    setSelectedArticlesData?.([]);
  };

  const apiQueryFolder = useLazyGetFoldersDropdownQuery();
  const moveFolderFormFields = moveFolderFormFieldsDynamic(apiQueryFolder);

  return {
    methods,
    submitMoveFolder,
    patchArticleStatus,
    handleSubmit,
    closeMoveFolderModal,
    moveFolderFormFields,
  };
};
