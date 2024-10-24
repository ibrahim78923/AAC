import { useEffect } from 'react';
import { useGetArticlesApi } from '../../KnowledgeBaseHooks/useGetArticlesApi';
import { articlesListColumnsDynamic } from './ArticlesList.data';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import {
  setPage,
  setPageDecrement,
  setPageIncrement,
  setPageLimit,
  setSelectedArticlesList,
} from '@/redux/slices/airServices/knowledge-base/slice';
import { useRouter } from 'next/router';
import { AIR_SERVICES } from '@/constants/routes';

export const useArticlesLists = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const {
    getArticlesListData,
    lazyGetArticlesStatus,
    search,
    page,
    pageLimit,
    filterArticlesList,
    selectedFolder,
  } = useGetArticlesApi?.();

  const selectedArticlesList = useAppSelector(
    (state) => state?.servicesKnowledgeBase?.selectedArticlesList,
  );

  useEffect(() => {
    getArticlesListData();
  }, [search, page, pageLimit, filterArticlesList, selectedFolder]);

  const handleSetPage = (page: number) => {
    dispatch(setPage<any>(page));
  };

  const handleSetPageLimit = (pageLimit: number) => {
    dispatch(setPageLimit<any>(pageLimit));
  };

  const handlePageChange = (currentPage: number) => {
    handleSetPage?.(currentPage);
  };

  const increment = () => dispatch(setPageIncrement?.());
  const decrement = () => dispatch(setPageDecrement?.());

  const setSelectedArticles = (ticket: any) => {
    dispatch(setSelectedArticlesList<any>(ticket));
  };

  const handleSingleArticleNavigation = (id: string) => {
    router?.push({
      pathname: AIR_SERVICES?.KNOWLEDGE_BASE_VIEW_ARTICLE,
      query: { articleId: id },
    });
  };

  const articlesListColumns = articlesListColumnsDynamic?.(
    lazyGetArticlesStatus?.data?.data?.articles,
    selectedArticlesList,
    setSelectedArticles,
    handleSingleArticleNavigation,
  );

  return {
    search,
    page,
    pageLimit,
    filterArticlesList,
    selectedFolder,
    getArticlesListData,
    lazyGetArticlesStatus,
    articlesListColumns,
    handleSetPage,
    handleSetPageLimit,
    handlePageChange,
    increment,
    decrement,
  };
};
