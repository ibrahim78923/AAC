import { useState } from 'react';
import { useTheme } from '@mui/material';
import { PAGINATION } from '@/config';
import { useGetCampaignsTasksQuery } from '@/services/airMarketer/campaigns';
import { DATE_FORMAT } from '@/constants';
import dayjs from 'dayjs';

const useCalander = ({ taskFilters }: any) => {
  const theme = useTheme();
  const [pageLimit, setPageLimit] = useState(PAGINATION?.PAGE_LIMIT);
  const [page, setPage] = useState(PAGINATION?.CURRENT_PAGE);
  const [datePickerVal, setDatePickerVal] = useState<any>(new Date());

  const taskParams = {
    page: page,
    limit: pageLimit,
    startDate: taskFilters?.startDate
      ? dayjs(taskFilters?.startDate)?.format(DATE_FORMAT?.API)
      : undefined,
    endDate: taskFilters?.endDate
      ? dayjs(taskFilters?.endDate)?.format(DATE_FORMAT?.API)
      : undefined,
  };

  const { data: getCampaignsTasks, isLoading } =
    useGetCampaignsTasksQuery(taskParams);

  const campaignsTasksData = getCampaignsTasks?.data?.campaigntasks;

  return {
    campaignsTasksData,
    setDatePickerVal,
    datePickerVal,
    setPageLimit,
    isLoading,
    setPage,
    theme,
  };
};
export default useCalander;
