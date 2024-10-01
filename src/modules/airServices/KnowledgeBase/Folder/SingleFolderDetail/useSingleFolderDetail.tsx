import { useAppDispatch, useAppSelector } from '@/redux/store';
import { setIsPortalOpen } from '@/redux/slices/airServices/knowledge-base/slice';
import { ALL_FOLDER } from '../Folder.data';
import { useGetServicesKnowledgeBaseSingleFolderByIdQuery } from '@/services/airServices/knowledge-base/articles';
import { KNOWLEDGE_BASE_ACTIONS_CONSTANT } from '@/constants/portal-actions';

const { EDIT_FOLDER, DELETE_FOLDER } = KNOWLEDGE_BASE_ACTIONS_CONSTANT ?? {};

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
  }: { [key: string]: any } = useGetServicesKnowledgeBaseSingleFolderByIdQuery(
    apiDataParameter,
    {
      refetchOnMountOrArgChange: true,
      skip: skipApiCall,
    },
  );

  const setPortalAction = (actionType: any) => {
    dispatch(
      setIsPortalOpen<any>({
        isOpen: true,
        action: actionType,
      }),
    );
  };

  const openUpsertFolderPortal = () => setPortalAction(EDIT_FOLDER);
  const openDeleteFolderPortal = () => setPortalAction(DELETE_FOLDER);

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
