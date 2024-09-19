import { useLazyGetArticlesQuery } from '@/services/airServices/knowledge-base/articles';
import { buildQueryParams } from '@/utils/api';
import useAuth from '@/hooks/useAuth';
import { ARRAY_INDEX } from '@/constants/strings';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import {
  canDisableFolderSelections,
  emptySelectedArticlesList,
  setArticlesListsTotalRecords,
} from '@/redux/slices/airServices/knowledge-base/slice';
import { ALL_FOLDER } from '../Folder/Folder.data';

export const useGetArticlesApi = () => {
  const dispatch = useAppDispatch();
  const auth: any = useAuth();
  const { _id: companyId } =
    auth?.product?.accounts?.[ARRAY_INDEX?.ZERO]?.company;

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
    useLazyGetArticlesQuery();

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
