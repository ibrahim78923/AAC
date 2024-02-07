import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useTheme } from '@mui/material';
import { AIR_SERVICES } from '@/constants';
import { actionBtnData, articlesColumnsFunction } from './Articles.data';
import {
  useGetFoldersQuery,
  useLazyGetArticlesQuery,
} from '@/services/airServices/assets/knowledge-base/articles';
import { PAGINATION } from '@/config';
import { buildQueryParams } from '@/utils/api';

export const useArticles = () => {
  const theme = useTheme();
  const { push } = useRouter();
  const [selectedArticlesData, setSelectedArticlesData] = useState([]);
  const [selectedArticlesTab, setSelectedArticlesTab] = useState('all');
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [moveFolderModal, setMoveFolderModal] = useState(false);
  const [openFilter, setOpenFilter] = useState(false);

  const [page, setPage] = useState(PAGINATION?.CURRENT_PAGE);
  const [pageLimit, setPageLimit] = useState(PAGINATION?.PAGE_LIMIT);
  const [search, setSearch] = useState('');

  const [filterValues, setFilterValues] = useState<any>({});
  const [lazyGetArticlesTrigger, lazyGetArticlesStatus] =
    useLazyGetArticlesQuery();

  const additionalParams = [
    ['page', page + ''],
    ['limit', pageLimit + ''],
    ['search', search],
  ];
  const articlesParam: any = buildQueryParams(additionalParams, filterValues);
  const getArticlesParameter = {
    queryParams: articlesParam,
  };
  const getValueArticlesListData = async () => {
    try {
      await lazyGetArticlesTrigger(getArticlesParameter)?.unwrap();
      setSelectedArticlesData([]);
    } catch (error: any) {
      setSelectedArticlesData([]);
    }
  };

  useEffect(() => {
    getValueArticlesListData();
  }, [search, page, pageLimit, filterValues]);

  const { data: folderData } = useGetFoldersQuery({});

  const foldersList = [
    { name: 'all', _id: 'all' },
    ...(folderData?.data ?? []),
  ];

  const handleSelectedArticlesTab = (tab: string) => {
    // if (tab !== 'all') {
    //   setQueryParams((prev: any) => ({ ...prev, folderId: tab }));
    // } else {
    //   setQueryParams((param: any) => {
    //     const paramData: any = { ...param };
    //     delete paramData?.folderId;
    //     return paramData;
    //   });
    // }
    setSelectedArticlesTab(tab);
  };

  const handleSingleArticleNavigation = (id: string) => {
    push({
      pathname: AIR_SERVICES?.KNOWLEDGE_BASE_VIEW_ARTICLE,
      query: { articleId: id },
    });
  };

  const handleEditNavigation = (id: string) => {
    push({
      pathname: AIR_SERVICES?.UPSERT_ARTICLE,
      query: { articleId: id },
    });
  };

  const articlesColumns = articlesColumnsFunction(
    lazyGetArticlesStatus?.data?.data?.articles,
    selectedArticlesData,
    setSelectedArticlesData,
    handleSingleArticleNavigation,
  );

  const dropdownOptions = actionBtnData(
    setOpenDeleteModal,
    setMoveFolderModal,
    handleEditNavigation,
    selectedArticlesData,
  );

  return {
    articlesColumns,
    selectedArticlesTab,
    handleSelectedArticlesTab,
    selectedArticlesData,
    openDeleteModal,
    setOpenDeleteModal,
    moveFolderModal,
    setMoveFolderModal,
    dropdownOptions,
    theme,
    openFilter,
    setOpenFilter,
    page,
    setPage,
    pageLimit,
    setPageLimit,
    setSearch,
    foldersList,
    lazyGetArticlesStatus,
    setSelectedArticlesData,
    filterValues,
    setFilterValues,
  };
};
