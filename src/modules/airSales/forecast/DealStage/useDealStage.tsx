import { PAGINATION } from '@/config';
import { indexNumbers } from '@/constants';
import { useGetDealPipeLineQuery } from '@/services/airSales/deals';
import {
  useGetForecastDealStageStatsQuery,
  useGetForecastDealStagesTeamQuery,
  useGetForecastDealStagesUserQuery,
} from '@/services/airSales/forecast';
import { isNullOrEmpty } from '@/utils';
import { useTheme } from '@mui/material';
import { useState } from 'react';

const useDealStage = () => {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isDisabled, setIsDisabled] = useState(true);
  const [tableRowValues, setTableRowValues] = useState();
  const [isFilterDrawer, setIsFilterDrawer] = useState(false);
  const [filterValues, setFilterValues] = useState({});
  const [search, setSearch] = useState<any>('');
  const [page, setPage] = useState(PAGINATION?.CURRENT_PAGE);
  const [pageLimit, setPageLimit] = useState(PAGINATION?.PAGE_LIMIT);
  const [alignment, setAlignment] = useState('UserDealStage');

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string,
  ) => {
    setAlignment(newAlignment);
  };

  const open = Boolean(anchorEl);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event?.currentTarget);
  };

  const { data: dealPipelineData } = useGetDealPipeLineQuery({ meta: false });

  const statsParams = {
    pipeline: dealPipelineData?.data[indexNumbers?.ZERO]?._id,
    isTeam: alignment === 'UserDealStage' ? false : true,
  };

  const {
    data: getDealStageStats,
    isLoading: DealStatsIsLoading,
    isFetching: DealStatsIsFetching,
  } = useGetForecastDealStageStatsQuery(
    { params: { ...statsParams, ...filterValues } },
    { skip: isNullOrEmpty(dealPipelineData?.data[indexNumbers?.ZERO]?._id) },
  );

  const Params = {
    page: page,
    limit: pageLimit,
    search: search,
    pipeline: dealPipelineData?.data[indexNumbers?.ZERO]?._id,
  };

  const {
    data: getDealStageUserData,
    isLoading: DealUserDataIsLoading,
    isFetching: DealUserDataIsFetching,
    isError: DealUserDataIsError,
    isSuccess: DealUserDataIsSuccess,
  } = useGetForecastDealStagesUserQuery(
    { params: { ...Params, ...filterValues } },
    {
      skip:
        alignment != 'UserDealStage' ||
        isNullOrEmpty(dealPipelineData?.data[indexNumbers?.ZERO]?._id),
    },
  );

  const {
    data: getDealStageTeamData,
    isLoading: DealTeamDataIsLoading,
    isFetching: DealTeamDataIsFetching,
    isError: DealTeamDataIsError,
    isSuccess: DealTeamDataIsSuccess,
  } = useGetForecastDealStagesTeamQuery(
    { params: { ...Params, ...filterValues } },
    {
      skip:
        alignment === 'UserDealStage' ||
        isNullOrEmpty(dealPipelineData?.data[indexNumbers?.ZERO]?._id),
    },
  );

  return {
    theme,
    anchorEl,
    isDisabled,
    setIsDisabled,
    tableRowValues,
    setTableRowValues,
    open,
    handleClose,
    handleClick,
    setAnchorEl,
    setIsFilterDrawer,
    setFilterValues,
    isFilterDrawer,
    filterValues,
    alignment,
    handleChange,
    getDealStageStats,
    DealStatsIsLoading,
    DealStatsIsFetching,
    getDealStageUserData,
    DealUserDataIsLoading,
    DealUserDataIsFetching,
    DealUserDataIsError,
    DealUserDataIsSuccess,
    setPageLimit,
    setPage,
    search,
    setSearch,
    getDealStageTeamData,
    DealTeamDataIsLoading,
    DealTeamDataIsFetching,
    DealTeamDataIsError,
    DealTeamDataIsSuccess,
  };
};

export default useDealStage;
