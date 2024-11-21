import { useState } from 'react';
import { PAGINATION } from '@/config';
import { useGetCampaignsTasksQuery } from '@/services/airMarketer/campaigns';
import { indexNumbers } from '@/constants';

const useViewCampaignDetails = (CurrCampaignId: any) => {
  const [pageLimit, setPageLimit] = useState(PAGINATION?.PAGE_LIMIT);
  const [page, setPage] = useState(PAGINATION?.CURRENT_PAGE);

  const taskParams = {
    page: page,
    limit: pageLimit,
    campaignId: CurrCampaignId,
  };

  const { data: getCampaignsTasks, isFetching } =
    useGetCampaignsTasksQuery(taskParams);

  const campaignsTasksData = getCampaignsTasks?.data?.campaigntasks;
  const campaignDetails =
    getCampaignsTasks?.data?.campaigntasks &&
    campaignsTasksData[indexNumbers?.ZERO]?.campaignDetails[indexNumbers?.ZERO];

  return {
    campaignsTasksData,
    campaignDetails,
    setPageLimit,
    isFetching,
    setPage,
  };
};

export default useViewCampaignDetails;
