import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { setSelectedFolder } from '@/redux/slices/airServices/knowledge-base/slice';
import { PAGINATION } from '@/config';
import { useTheme } from '@mui/material';
import { useLazyGetArticlesFoldersForFilterQuery } from '@/services/airServices/knowledge-base/articles';
import useAuth from '@/hooks/useAuth';
import { ARRAY_INDEX } from '@/constants/strings';
import { ALL_FOLDER } from './Folder.data';

export const useFolder = () => {
  const theme = useTheme();
  const auth: any = useAuth();
  const { _id: companyId } =
    auth?.product?.accounts?.[ARRAY_INDEX?.ZERO]?.company;
  const { _id: userId } = auth?.user;
  const { _id: organizationId } = auth?.user?.organization;
  const selectedFolder = useAppSelector(
    (state) => state?.servicesKnowledgeBase?.selectedFolder,
  );
  const canDisableFolderSelection = useAppSelector(
    (state) => state?.servicesKnowledgeBase?.canDisableFolderSelection,
  );

  const [
    lazyGetArticlesFoldersForFilterTrigger,
    lazyGetArticlesFoldersForFilterStatus,
  ] = useLazyGetArticlesFoldersForFilterQuery();

  const getArticlesFolderListForFilterData = async () => {
    const apiDataParameter = {
      queryParams: {
        userId,
        companyId,
        organizationId,
      },
    };
    try {
      await lazyGetArticlesFoldersForFilterTrigger(apiDataParameter)?.unwrap();
    } catch (error: any) {}
  };
  const dispatch = useAppDispatch();

  useEffect(() => {
    getArticlesFolderListForFilterData?.();
  }, []);

  const showLoader =
    lazyGetArticlesFoldersForFilterStatus?.isLoading ||
    lazyGetArticlesFoldersForFilterStatus?.isFetching;
  const showError = lazyGetArticlesFoldersForFilterStatus?.isError;
  const folderData = lazyGetArticlesFoldersForFilterStatus?.data?.data ?? [];

  const foldersList = [{ name: ALL_FOLDER, _id: ALL_FOLDER }, ...folderData];

  const setFolder = (folder: any) => {
    if (canDisableFolderSelection) return;
    if (folder?._id === selectedFolder?._id) return;
    dispatch(
      setSelectedFolder<any>({
        selectedFolder: folder,
        page: PAGINATION?.CURRENT_PAGE,
      }),
    );
  };

  return {
    showLoader,
    showError,
    foldersList,
    getArticlesFolderListForFilterData,
    setFolder,
    selectedFolder,
    theme,
  };
};
