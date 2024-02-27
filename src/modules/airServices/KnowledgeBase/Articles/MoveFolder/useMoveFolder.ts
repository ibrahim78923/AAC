import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  moveFolderValidationSchema,
  moveFolderDefaultValues,
} from './MoveFolder.data';
import { enqueueSnackbar } from 'notistack';
import {
  useGetArticleByIdQuery,
  usePatchArticleMutation,
} from '@/services/airServices/knowledge-base/articles';
import { useEffect } from 'react';
import { errorSnackbar, successSnackbar } from '@/utils/api';

export const useMoveFolder = (props: any) => {
  const { selectedArticlesData, setSelectedArticlesData, setMoveFolderModal } =
    props;
  const getSingleArticleParameter = {
    pathParam: {
      articleId: selectedArticlesData,
    },
  };
  const [patchArticleTrigger, patchArticleStatus] = usePatchArticleMutation();
  const { data, isLoading, isFetching } = useGetArticleByIdQuery(
    getSingleArticleParameter,
    {
      refetchOnMountOrArgChange: true,
      skip: !!!selectedArticlesData,
    },
  );

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
    !!data?.details && upsertArticle?.append('details', data?.details);
    !!data?.folder?._id && upsertArticle?.append('folder', data?.folder?._id);

    !!data?.tags?.length && upsertArticle?.append('tags', data?.tags);

    !!data?.keywords?.length &&
      upsertArticle?.append('keywords', data?.keywords);
    upsertArticle?.append('isApproval', data?.needsApproval);
    !!data?.approver?._id &&
      upsertArticle?.append('approver', data?.approver?._id);

    upsertArticle?.append('reviewDate', data?.reviewDate);
    upsertArticle?.append('id', selectedArticlesData);
    const patchArticleParameter = {
      body: data,
    };
    try {
      await patchArticleTrigger(patchArticleParameter)?.unwrap();
      successSnackbar('Article Updated successfully');
    } catch (error) {
      errorSnackbar();
    }

    enqueueSnackbar('Article moved to a new folder successfully', {
      variant: 'success',
    });
    setMoveFolderModal(false);
  };

  const closeMoveFolderModal = () => {
    setMoveFolderModal?.(false);
    setSelectedArticlesData?.([]);
  };
  return {
    methodMoveFolderForm,
    submitMoveFolder,
    isLoading,
    isFetching,
    patchArticleStatus,
    handleSubmit,
    closeMoveFolderModal,
  };
};
