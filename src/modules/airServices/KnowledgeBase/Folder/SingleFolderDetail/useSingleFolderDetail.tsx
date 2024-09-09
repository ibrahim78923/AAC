import { useGetSingleFolderByIdQuery } from '@/services/airServices/knowledge-base/articles';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { KNOWLEDGE_BASE_ACTIONS_CONSTANT } from '../../Header/Header.data';
import { setIsPortalOpen } from '@/redux/slices/airServices/knowledge-base/slice';
import { ALL_FOLDER } from '../Folder.data';

export const useSingleFolderDetail = () => {
  const dispatch = useAppDispatch();
  const selectedFolder = useAppSelector(
    (state) => state?.servicesKnowledgeBase?.selectedFolder,
  );
  const apiDataParameter = {
    queryParams: {
      id: selectedFolder?._id,
    },
  };
  const skipApiCall =
    !!!selectedFolder?._id || selectedFolder?._id === ALL_FOLDER;

  const {
    data,
    isLoading,
    isFetching,
    isError,
    refetch,
  }: { [key: string]: any } = useGetSingleFolderByIdQuery(apiDataParameter, {
    refetchOnMountOrArgChange: true,
    skip: skipApiCall,
  });

  const setPortalAction = (actionType: any) => {
    dispatch(
      setIsPortalOpen<any>({
        isOpen: true,
        action: actionType,
      }),
    );
  };

  const openUpsertFolderPortal = () =>
    setPortalAction(KNOWLEDGE_BASE_ACTIONS_CONSTANT?.EDIT_FOLDER);
  const openDeleteFolderPortal = () =>
    setPortalAction(KNOWLEDGE_BASE_ACTIONS_CONSTANT?.DELETE_FOLDER);

  return {
    data,
    isLoading,
    isFetching,
    isError,
    refetch,
    openUpsertFolderPortal,
    openDeleteFolderPortal,
    selectedFolder,
  };
};
