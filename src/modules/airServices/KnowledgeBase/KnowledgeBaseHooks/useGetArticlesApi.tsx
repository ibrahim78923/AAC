import { buildQueryParams } from '@/utils/api';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import {
  canDisableFolderSelections,
  emptySelectedArticlesList,
  setArticlesListsTotalRecords,
} from '@/redux/slices/airServices/knowledge-base/slice';
import { ALL_FOLDER } from '../Folder/Folder.data';
import { useMemo } from 'react';
import { getActiveAccountSession } from '@/utils';

import { useLazyGetServicesKnowledgeBaseArticlesListQuery } from '@/services/airServices/knowledge-base/articles';
export const useGetArticlesApi = () => {
  const dispatch = useAppDispatch();
  const product = useMemo(() => getActiveAccountSession(), []);
  const companyId = product?.company?._id ?? {};

  const page = useAppSelector((state) => state?.servicesKnowledgeBase?.page);
  const pageLimit = useAppSelector(
    (state) => state?.servicesKnowledgeBase?.pageLimit,
  );

  const search = useAppSelector(
    (state) => state?.servicesKnowledgeBase?.search,
  );

  const selectedFolder = useAppSelector(
    (state) => state?.servicesKnowledgeBase?.selectedFolder,
  );

  const filterArticlesList = useAppSelector(
    (state) => state?.servicesKnowledgeBase?.filterArticlesList,
  );

  const [lazyGetArticlesTrigger, lazyGetArticlesStatus]: any =
    useLazyGetServicesKnowledgeBaseArticlesListQuery();

  const getArticlesListData = async (currentPage: number = page) => {
    const additionalParams = [
      ['page', currentPage + ''],
      ['limit', pageLimit + ''],
      ['search', search],
      ['companyId', companyId],
      ...(selectedFolder?._id === ALL_FOLDER
        ? []
        : [['folderId', selectedFolder?._id]]),
    ];

    const articlesParam = buildQueryParams(
      additionalParams,
      filterArticlesList,
    );
    const getArticlesParameter = {
      queryParams: articlesParam,
    };
    dispatch(canDisableFolderSelections(true));
    try {
      const response =
        await lazyGetArticlesTrigger(getArticlesParameter)?.unwrap();
      dispatch(setArticlesListsTotalRecords(response?.data?.articles?.length));
      dispatch(emptySelectedArticlesList());
    } catch (error: any) {}
    dispatch(canDisableFolderSelections(false));
  };

  return {
    getArticlesListData,
    lazyGetArticlesStatus,
    filterArticlesList,
    search,
    page,
    pageLimit,
    selectedFolder,
  };
};
