import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  moveFolderValidationSchema,
  moveFolderDefaultValues,
  moveFolderFormFieldsDynamic,
} from './MoveFolder.data';
import {
  useGetArticleByIdQuery,
  useLazyGetFoldersDropdownQuery,
  usePatchArticleMutation,
} from '@/services/airServices/knowledge-base/articles';
import { useEffect } from 'react';
import { errorSnackbar, successSnackbar } from '@/utils/api';

export const useMoveFolder = (props: any) => {
  const { selectedArticlesData, setSelectedArticlesData, setIsPortalOpen } =
    props;

  const [patchArticleTrigger, patchArticleStatus] = usePatchArticleMutation();
  const getSingleArticleParameter = {
    pathParam: {
      articleId: selectedArticlesData,
    },
  };
  const { data, isLoading, isFetching }: { [key: string]: any } =
    useGetArticleByIdQuery(getSingleArticleParameter, {
      refetchOnMountOrArgChange: true,
      skip: !!!selectedArticlesData,
    });

  const methodMoveFolderForm = useForm<any>({
    resolver: yupResolver(moveFolderValidationSchema),
    defaultValues: moveFolderDefaultValues?.(),
  });

  const { reset, handleSubmit } = methodMoveFolderForm;

  useEffect(() => {
    reset(() => moveFolderDefaultValues(data?.data));
  }, [selectedArticlesData, data, reset]);

  const submitMoveFolder = async (data: any) => {
    const upsertArticle = new FormData();
    upsertArticle?.append('folder', data?.moveTo?._id);
    upsertArticle?.append('id', selectedArticlesData);
    const patchArticleParameter = {
      body: upsertArticle,
    };
    try {
      await patchArticleTrigger(patchArticleParameter)?.unwrap();
      successSnackbar('Article moved to a new folder successfully');
      setSelectedArticlesData?.([]);
      closeMoveFolderModal?.();
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
    }
  };

  const closeMoveFolderModal = () => {
    setIsPortalOpen?.({});
    setSelectedArticlesData?.([]);
  };

  const apiQueryFolder = useLazyGetFoldersDropdownQuery();
  const moveFolderFormFields = moveFolderFormFieldsDynamic(apiQueryFolder);

  return {
    methodMoveFolderForm,
    submitMoveFolder,
    isLoading,
    isFetching,
    patchArticleStatus,
    handleSubmit,
    closeMoveFolderModal,
    moveFolderFormFields,
  };
};
