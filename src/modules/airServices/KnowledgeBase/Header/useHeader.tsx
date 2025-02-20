import { useAppDispatch, useAppSelector } from '@/redux/store';
import { createNewKnowledgeBaseDropdownOptionsDynamic } from './Header.data';
import { setIsPortalOpen } from '@/redux/slices/airServices/knowledge-base/slice';
import { useRouter } from 'next/router';
import { AIR_SERVICES } from '@/constants/routes';
import { KNOWLEDGE_BASE_ACTIONS_CONSTANT } from '@/constants/portal-actions';

export const useHeader = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const isPortalOpen = useAppSelector(
    (state) => state?.servicesKnowledgeBase?.isPortalOpen,
  );

  const setPortalAction = (actionType: any) => {
    dispatch(
      setIsPortalOpen<any>({
        isOpen: true,
        action: actionType,
      }),
    );
  };

  const openUpsertFolderPortal = () =>
    setPortalAction(KNOWLEDGE_BASE_ACTIONS_CONSTANT?.ADD_FOLDER);

  const moveToUpsertArticle = () => router?.push(AIR_SERVICES?.UPSERT_ARTICLE);

  const createNewKnowledgeBaseDropdownOptions =
    createNewKnowledgeBaseDropdownOptionsDynamic?.(
      openUpsertFolderPortal,
      moveToUpsertArticle,
    );

  return {
    createNewKnowledgeBaseDropdownOptions,
    isPortalOpen,
  };
};
