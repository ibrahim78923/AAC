import { PAGINATION } from '@/config';
import { indexNumbers } from '@/constants';
import {
  useGetDealPipeLineForecastQuery,
  useGetForecastCategoryTeamQuery,
  useGetForecastCategoryUserQuery,
  useGetForecastDealStageStatsQuery,
} from '@/services/airSales/forecast';
import { isNullOrEmpty } from '@/utils';
import { useTheme } from '@mui/material';
import { useState } from 'react';

const useForecastCategory = () => {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isDisabled, setIsDisabled] = useState(true);
  const [tableRowValues, setTableRowValues] = useState();
  const [isFilterDrawer, setIsFilterDrawer] = useState(false);
  const [filterValues, setFilterValues] = useState({});
  const [alignment, setAlignment] = useState('UserCategory');
  const [page, setPage] = useState(PAGINATION?.CURRENT_PAGE);
  const [pageLimit, setPageLimit] = useState(PAGINATION?.PAGE_LIMIT);
  const [search, setSearch] = useState<any>('');

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

  const { data: dealPipelineData, isLoading: pipelineIsLoading } =
    useGetDealPipeLineForecastQuery({ meta: false });

  const statsParams = {
    pipelines: dealPipelineData?.data[indexNumbers?.ZERO]?._id,
    // [
    //   dealPipelineData?.data[indexNumbers?.ZERO]?._id,
    //   dealPipelineData?.data?.length > 1
    //   ? dealPipelineData?.data[indexNumbers?.ONE]?._id
    //   : undefined,
    // ]?.filter(Boolean),
    isTeam: alignment === 'UserCategory' ? false : true,
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
    pipelines: dealPipelineData?.data[indexNumbers?.ZERO]?._id,
  };

  const {
    data: getCategoryUserData,
    isLoading: CategoryUserDataIsLoading,
    isFetching: CategoryUserDataIsFetching,
    isError: CategoryUserDataIsError,
    isSuccess: CategoryUserDataIsSuccess,
  } = useGetForecastCategoryUserQuery(
    { params: { ...Params, ...filterValues } },
    {
      skip:
        alignment != 'UserCategory' ||
        isNullOrEmpty(dealPipelineData?.data[indexNumbers?.ZERO]?._id),
    },
  );

  const {
    data: getCategoryTeamData,
    isLoading: CategoryTeamDataIsLoading,
    isFetching: CategoryTeamDataIsFetching,
    isError: CategoryTeamDataIsError,
    isSuccess: CategoryTeamDataIsSuccess,
  } = useGetForecastCategoryTeamQuery(
    { params: { ...Params, ...filterValues } },
    {
      skip:
        alignment === 'UserCategory' ||
        isNullOrEmpty(dealPipelineData?.data[indexNumbers?.ZERO]?._id),
    },
  );

  const pipelineId = !isNullOrEmpty(filterValues?.pipelines)
    ? filterValues?.pipelines
    : Params?.pipelines;

  const dealPipelineName = dealPipelineData?.data?.find(
    (pipeline: any) => pipeline._id === pipelineId,
  )?.name;

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
    alignment,
    handleChange,
    setIsFilterDrawer,
    isFilterDrawer,
    setFilterValues,
    filterValues,
    getDealStageStats,
    DealStatsIsLoading,
    DealStatsIsFetching,
    setPageLimit,
    setPage,
    pipelineIsLoading,
    getCategoryUserData,
    CategoryUserDataIsLoading,
    CategoryUserDataIsFetching,
    CategoryUserDataIsError,
    CategoryUserDataIsSuccess,
    getCategoryTeamData,
    CategoryTeamDataIsLoading,
    CategoryTeamDataIsFetching,
    CategoryTeamDataIsError,
    CategoryTeamDataIsSuccess,
    setSearch,
    dealPipelineName,
  };
};

export default useForecastCategory;
