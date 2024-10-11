import { useAppDispatch, useAppSelector } from '@/redux/store';
import { articlesActionDropdownDynamic } from './Header.data';
import {
  setIsPortalOpen,
  setSearch,
} from '@/redux/slices/airServices/knowledge-base/slice';
import { PAGINATION } from '@/config';
import { useRouter } from 'next/router';
import { KNOWLEDGE_BASE_ACTIONS_CONSTANT } from '@/constants/portal-actions';

const { FILTER_ARTICLES } = KNOWLEDGE_BASE_ACTIONS_CONSTANT ?? {};

export const useHeader = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const selectedArticlesList = useAppSelector(
    (state) => state?.servicesKnowledgeBase?.selectedArticlesList,
  );
  const setPortalAction = (actionType: any) => {
    dispatch(
      setIsPortalOpen<any>({
        isOpen: true,
        action: actionType,
      }),
    );
  };

  const setArticleSearch = (searchValue: any) => {
    dispatch(
      setSearch<any>({
        searchTerm: searchValue,
        page: PAGINATION?.CURRENT_PAGE,
      }),
    );
  };

  const openArticleFilterPortal = () => setPortalAction(FILTER_ARTICLES);

  const articlesActionDropdown = articlesActionDropdownDynamic?.(
    setPortalAction,
    router,
    selectedArticlesList,
  );

  return {
    articlesActionDropdown,
    setArticleSearch,
    openArticleFilterPortal,
    selectedArticlesList,
  };
};
