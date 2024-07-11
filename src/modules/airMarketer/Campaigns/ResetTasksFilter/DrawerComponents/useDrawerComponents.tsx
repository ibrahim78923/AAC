import { useState } from 'react';
import { useTheme } from '@mui/material';
import Task from './Task';
import Comments from './Comments';
import Calander from './Calendar';
import { PAGINATION } from '@/config';
import { useGetCampaignsTasksQuery } from '@/services/airMarketer/campaigns';
import { CAMPAIGNS_CONSTANTS } from '@/constants/strings';

const useDrawerComponents = ({ setCurrentTabVal, setIsOpen, methods }: any) => {
  const theme = useTheme();
  const [selectedButton, setSelectedButton] = useState(
    CAMPAIGNS_CONSTANTS?.TASKS,
  );
  const [isFilters, setIsFilters] = useState(false);
  const [pageLimit, setPageLimit] = useState(PAGINATION?.PAGE_LIMIT);
  const [page, setPage] = useState(PAGINATION?.CURRENT_PAGE);

  const taskParams = {
    page: page,
    limit: pageLimit,
  };

  const { data: getCampaignsTasks, isLoading } =
    useGetCampaignsTasksQuery(taskParams);

  const compaignsTasksData = getCampaignsTasks?.data?.campaigntasks;

  const handleActiveButton = (active: string) => {
    switch (active) {
      case CAMPAIGNS_CONSTANTS?.COMMENTS:
        return <Comments />;
      case CAMPAIGNS_CONSTANTS?.CALENDAR:
        return (
          <Calander setCurrentTabVal={setCurrentTabVal} setIsOpen={setIsOpen} />
        );
      default:
        return (
          <Task
            setIsFilters={setIsFilters}
            data={compaignsTasksData}
            isFilters={isFilters}
            setIsOpen={setIsOpen}
            loading={isLoading}
            methods={methods}
            setCurrentTabVal={setCurrentTabVal}
          />
        );
    }
  };

  return {
    handleActiveButton,
    setSelectedButton,
    selectedButton,
    setPageLimit,
    setIsFilters,
    isFilters,
    setPage,
    theme,
  };
};
export default useDrawerComponents;
