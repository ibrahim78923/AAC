import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useTheme } from '@mui/material';
import { AIR_SERVICES } from '@/constants';
import {
  ALL_FOLDER,
  actionBtnData,
  articlesColumnsFunction,
} from './Articles.data';
import {
  useGetArticlesFoldersForFilterQuery,
  useLazyGetArticlesQuery,
} from '@/services/airServices/knowledge-base/articles';
import { PAGINATION } from '@/config';
import { buildQueryParams } from '@/utils/api';
import FilterArticles from './FilterArticles';
import { DeleteArticles } from './DeleteArticles';
import { MoveFolder } from './MoveFolder';
import { UpsertFolder } from '../Folder/UpsertFolder';
import { DeleteFolder } from '../Folder/DeleteFolder';

export const useArticles: any = (props: any) => {
  const { isPortalOpen, setIsPortalOpen } = props;
  const theme = useTheme();
  const router = useRouter();
  const { push } = router;

  const [selectedArticlesData, setSelectedArticlesData] = useState([]);
  const [selectedArticlesTab, setSelectedArticlesTab] = useState<any>({
    _id: ALL_FOLDER,
  });

  const [page, setPage] = useState(PAGINATION?.CURRENT_PAGE);
  const [pageLimit, setPageLimit] = useState(PAGINATION?.PAGE_LIMIT);
  const [search, setSearch] = useState('');

  const [filterValues, setFilterValues] = useState<any>({});

  const [lazyGetArticlesTrigger, lazyGetArticlesStatus]: any =
    useLazyGetArticlesQuery();

  const getValueArticlesListData = async (currentPage = page) => {
    const additionalParams = [
      ['page', currentPage + ''],
      ['limit', pageLimit + ''],
      ['search', search],
      [
        'folderId',
        selectedArticlesTab?._id === ALL_FOLDER ? '' : selectedArticlesTab?._id,
      ],
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

  const {
    data: folderData,
    isLoading,
    isFetching,
    isError,
  }: any = useGetArticlesFoldersForFilterQuery(
    {},
    {
      refetchOnMountOrArgChange: true,
    },
  );

  const foldersList = [
    { name: ALL_FOLDER, _id: ALL_FOLDER },
    ...(folderData?.data ?? []),
  ];

  const handleSingleArticleNavigation = (id: string) => {
    push({
      pathname: AIR_SERVICES?.KNOWLEDGE_BASE_VIEW_ARTICLE,
      query: { articleId: id },
    });
  };

  const setFolder = (folder: any) => {
    setSelectedArticlesTab(folder);
    setPage(PAGINATION?.CURRENT_PAGE);
  };

  const articlesColumns = articlesColumnsFunction(
    lazyGetArticlesStatus?.data?.data?.articles,
    selectedArticlesData,
    setSelectedArticlesData,
    handleSingleArticleNavigation,
  );

  const dropdownOptions = actionBtnData(
    setIsPortalOpen,
    router,
    selectedArticlesData,
  );

  const portalComponentProps = {
    isPortalOpen: isPortalOpen,
    setIsPortalOpen: setIsPortalOpen,
    selectedArticlesData: selectedArticlesData,
    setSelectedArticlesData: setSelectedArticlesData,
    setPage: setPage,
    page: page,
    getValueArticlesListData: getValueArticlesListData,
    totalRecords: lazyGetArticlesStatus?.data?.data?.articles?.length,
    filterValues: filterValues,
    setFilterValues: setFilterValues,
    selectedArticlesTab,
  };

  const renderPortalComponent = () => {
    if (isPortalOpen?.isFilter) {
      return <FilterArticles {...portalComponentProps} />;
    }
    if (isPortalOpen?.isDelete) {
      return <DeleteArticles {...portalComponentProps} />;
    }
    if (isPortalOpen?.isMoveFolder) {
      return <MoveFolder {...portalComponentProps} />;
    }
    if (isPortalOpen?.isUpsertFolder) {
      return <UpsertFolder {...portalComponentProps} />;
    }
    if (isPortalOpen?.isDeleteFolder) {
      return <DeleteFolder {...portalComponentProps} />;
    }
    return <></>;
  };

  return {
    articlesColumns,
    selectedArticlesTab,
    dropdownOptions,
    theme,
    lazyGetArticlesStatus,
    setPage,
    setPageLimit,
    setSearch,
    foldersList,
    selectedArticlesData,
    setFolder,
    isLoading,
    isFetching,
    isError,
    isPortalOpen,
    setIsPortalOpen,
    renderPortalComponent,
    portalComponentProps,
  };
};
