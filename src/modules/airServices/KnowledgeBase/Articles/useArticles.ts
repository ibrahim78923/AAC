import { useState } from 'react';
import { useRouter } from 'next/router';
import { enqueueSnackbar } from 'notistack';
import { useTheme } from '@mui/material';
import { AIR_SERVICES } from '@/constants';
import { actionBtnData, articlesColumnsFunction } from './Articles.data';
import {
  useDeleteArticleMutation,
  useGetArticlesQuery,
  useGetFoldersQuery,
} from '@/services/airServices/assets/knowledge-base/articles';
import { PAGINATION } from '@/config';
import { NOTISTACK_VARIANTS } from '@/constants/strings';

export const useArticles = () => {
  const { KNOWLEDGE_BASE_VIEW_ARTICLE, KNOWLEDGE_BASE_EDIT_ARTICLE } =
    AIR_SERVICES;
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

  const [queryParams, setQueryParams] = useState<any>({
    page,
    limit: pageLimit,
    search,
    ...filterValues,
  });

  const handleSearch = (value: string) => {
    setSearch(value);
    setQueryParams((prev: any) => ({ ...prev, search: value }));
  };

  const handleFilterValues = (values: any) => {
    setFilterValues(values);
    setQueryParams((prev: any) => ({ ...prev, ...values }));
  };
  const { data, isLoading, isSuccess, isError, isFetching }: any =
    useGetArticlesQuery(queryParams);
  const articlesData =
    data?.data?.articles?.map((article: any) => ({
      id: article?._id ?? '---',
      article: article?.details ?? '---',
      status: article?.status?.toLowerCase() ?? '---',
      insertedTickets: article?.insertedTickets ?? '---',
      author: article?.authorName ?? '---',
      folder: article?.folder ?? '---',
      // ...article
    })) ?? [];
  const meta = data?.data?.meta;

  // article delete
  const [deleteArticleMethod] = useDeleteArticleMutation();
  const { data: folderData } = useGetFoldersQuery({});

  const foldersList = [
    { folderName: 'all', _id: 'all' },
    ...(folderData?.data ?? []),
  ];

  const handleSelectedArticlesTab = (tab: string) => {
    if (tab !== 'all') {
      setQueryParams((prev: any) => ({ ...prev, folderId: tab }));
    } else {
      setQueryParams((param: any) => {
        const paramData: any = { ...param };
        delete paramData?.folderId;
        return paramData;
      });
    }
    setSelectedArticlesTab(tab);
  };
  const handleSingleArticleNavigation = (id: string) => {
    push(`${KNOWLEDGE_BASE_VIEW_ARTICLE}?id=${id}`);
  };
  const handleEditNavigation = (id: string) => {
    push(`${KNOWLEDGE_BASE_EDIT_ARTICLE}?id=${id}`);
  };
  const articlesColumns = articlesColumnsFunction(
    articlesData,
    selectedArticlesData,
    setSelectedArticlesData,
    handleSingleArticleNavigation,
  );
  const handleDeleteSubmit = async () => {
    try {
      const deleteArticlesParam = new URLSearchParams();
      selectedArticlesData?.forEach(
        ({ id }: any) => deleteArticlesParam?.append('ids', id),
      );
      await deleteArticleMethod(deleteArticlesParam)?.unwrap();
      setOpenDeleteModal(false);
      enqueueSnackbar('Article deleted successfully', {
        variant: NOTISTACK_VARIANTS?.SUCCESS,
      });
    } catch (error: any) {
      enqueueSnackbar(error?.data?.message ?? 'Something went wrong!', {
        variant: NOTISTACK_VARIANTS?.ERROR,
      });
    }
  };

  const dropdownOptions = actionBtnData(
    setOpenDeleteModal,
    setMoveFolderModal,
    handleEditNavigation,
  );

  return {
    articlesColumns,
    selectedArticlesTab,
    handleSelectedArticlesTab,
    selectedArticlesData,
    openDeleteModal,
    setOpenDeleteModal,
    handleDeleteSubmit,
    moveFolderModal,
    setMoveFolderModal,
    dropdownOptions,
    theme,
    openFilter,
    setOpenFilter,
    articlesData,
    isLoading,
    isSuccess,
    isError,
    isFetching,
    page,
    setPage,
    pageLimit,
    setPageLimit,
    search,
    handleSearch,
    meta,
    handleFilterValues,
    foldersList,
  };
};
