import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { setSelectedFolder } from '@/redux/slices/airServices/knowledge-base/slice';
import { PAGINATION } from '@/config';
import { useTheme } from '@mui/material';
import { ALL_FOLDER } from './Folder.data';
import { useGetFoldersApi } from '../KnowledgeBaseHooks/useGetFoldersApi';

export const useFolder = () => {
  const theme = useTheme();

  const {
    getArticlesFolderListForFilterData,
    lazyGetArticlesFoldersForFilterStatus,
  } = useGetFoldersApi?.();

  const selectedFolder = useAppSelector(
    (state) => state?.servicesKnowledgeBase?.selectedFolder,
  );

  const canDisableFolderSelection = useAppSelector(
    (state) => state?.servicesKnowledgeBase?.canDisableFolderSelection,
  );

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
