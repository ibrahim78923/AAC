import { useLazyGetAirServicesSettingsCannedResponsesListQuery } from '@/services/airServices/settings/agent-performance-management/canned-responses';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { responsesListColumnsDynamic } from './ResponseListView.data';
import { PAGINATION } from '@/config';

export const useResponsesListView = (props: any) => {
  const { setSelectedData, selectedData, search, page } = props;
  const router = useRouter();

  const cannedResponseId = router?.query?.id as string;

  const [pageLimit, setPageLimit] = useState(PAGINATION?.PAGE_LIMIT);

  const [lazyGetResponsesListTrigger, lazyGetResponsesListStatus] =
    useLazyGetAirServicesSettingsCannedResponsesListQuery();
  const responsesList = lazyGetResponsesListStatus?.data?.data?.responses;
  const responsesListMetaData = lazyGetResponsesListStatus?.data?.data?.meta;

  const getResponsesListData = async (currentPage = page) => {
    const getResponsesListParam = new URLSearchParams();

    getResponsesListParam?.append('page', currentPage + '');
    getResponsesListParam?.append('limit', pageLimit + '');
    getResponsesListParam?.append('search', search + '');
    getResponsesListParam?.append('folderId', cannedResponseId);
    const getResponsesListParameter = {
      queryParams: getResponsesListParam,
    };
    try {
      await lazyGetResponsesListTrigger(getResponsesListParameter)?.unwrap();
    } catch (error) {}
  };

  useEffect(() => {
    if (cannedResponseId) {
      getResponsesListData?.(page);
    }
  }, [search, page, pageLimit, cannedResponseId]);

  const responsesListColumns = responsesListColumnsDynamic(
    selectedData,
    setSelectedData,
    responsesList,
  );

  return {
    lazyGetResponsesListStatus,
    responsesListColumns,
    responsesList,
    responsesListMetaData,
    getResponsesListData,
    setPageLimit,
    pageLimit,
  };
};
