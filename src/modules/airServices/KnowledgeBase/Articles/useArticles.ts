import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useTheme } from '@mui/material';
import { AIR_SERVICES } from '@/constants';
import { actionBtnData, articlesColumnsFunction } from './Articles.data';
import {
  useGetFoldersQuery,
  useLazyGetArticlesQuery,
} from '@/services/airServices/knowledge-base/articles';
import { PAGINATION } from '@/config';
import { buildQueryParams } from '@/utils/api';

export const useArticles: any = () => {
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

  const getValueArticlesListData = async (pages = page) => {
    const additionalParams = [
      ['page', pages + ''],
      ['limit', pageLimit + ''],
      ['search', search],
      ['folderId', selectedArticlesTab === 'all' ? '' : selectedArticlesTab],
    ];
    const articlesParam: any = buildQueryParams(additionalParams, filterValues);
    const getArticlesParameter = {
      queryParams: articlesParam,
    };
    try {
      await lazyGetArticlesTrigger(getArticlesParameter)?.unwrap();
      setSelectedArticlesData([]);
    } catch (error: any) {
      setSelectedArticlesData([]);
    }
  };

  useEffect(() => {
    getValueArticlesListData();
  }, [search, page, pageLimit, filterValues, selectedArticlesTab]);

  const { data: folderData } = useGetFoldersQuery({});

  const foldersList = [
    { name: 'all', _id: 'all' },
    ...(folderData?.data ?? []),
  ];

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
  const setFolder = (id: any) => {
    setSelectedArticlesTab(id);
    setPage(1);
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
    setSelectedArticlesTab,
    setFolder,
    lazyGetArticlesTrigger,
    search,
    getValueArticlesListData,
  };
};
