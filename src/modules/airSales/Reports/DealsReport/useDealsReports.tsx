import { useState } from 'react';
import { PAGINATION } from '@/config';
import { useGetDealPipeLineQuery } from '@/services/airSales/deals';
import { useGetDealsReortsQuery } from '@/services/airSales/reports';
import { DATE_FORMAT, DATE_RANGE, indexNumbers } from '@/constants';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import { useGetAllUsersDropdownQuery } from '@/services/common-APIs';
import { getActiveProductSession } from '@/utils';

const useDealsReports = () => {
  const router = useRouter();
  const ActiveProduct = getActiveProductSession();
  const [page, setPage] = useState(PAGINATION?.CURRENT_PAGE);
  const [limit, setLimit] = useState(PAGINATION?.PAGE_LIMIT);
  const [searchBy, setSearchBy] = useState('');
  const [datePickerVal, setDatePickerVal] = useState(false);
  const [filter, setFilter] = useState<any>({
    owners: [],
    pipelines: [],
    date: null,
  });
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [anchorElNew, setAnchorElnew] = useState<HTMLButtonElement | null>(
    null,
  );
  const open = Boolean(anchorEl);
  const openPipeline = Boolean(anchorElNew);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event?.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleClickPipeline = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorElnew(event?.currentTarget);
  };
  const handleClosePipleine = () => {
    setAnchorElnew(null);
  };

  const dealsReortsParams = {
    page: page,
    limit: limit,
    search: searchBy ? searchBy : undefined,
    ownerIds:
      filter.owners?.length > indexNumbers?.ZERO ? filter.owners : undefined,
    dealPipelineIds:
      filter.pipelines?.length > indexNumbers?.ZERO
        ? filter.pipelines
        : undefined,
    dateStart: filter?.date
      ? dayjs(filter?.date[DATE_RANGE?.START_DATE]).format(DATE_FORMAT?.API)
      : undefined,
    dateEnd: filter?.date
      ? dayjs(filter?.date[DATE_RANGE?.END_DATE]).format(DATE_FORMAT?.API)
      : undefined,
  };

  const {
    data: dealsReportData,
    isLoading,
    isSuccess,
    isError,
    isFetching,
  } = useGetDealsReortsQuery(dealsReortsParams);
  const dealsReportsTable = dealsReportData?.data?.deals;
  const dealsReportsCardsData = dealsReportData?.data?.res;
  const dealsReportsGraphData = dealsReportData?.data?.resByMonth;

  const { data: dealsOwner } = useGetAllUsersDropdownQuery({
    params: { productId: ActiveProduct?._id },
  });
  const { data: pipelineData } = useGetDealPipeLineQuery({ meta: false });

  const resetFilters = () => {
    setFilter({
      owner: [],
      pipelines: [],
      date: null,
    });
  };

  const customizeData = (owners: any) => {
    return owners?.map((item: any) => ({
      label: `${item?.firstName} ${item?.lastName}`,
      value: item?._id,
    }));
  };

  const pipelineDropdown = (pipelines: any) => {
    return pipelines?.data?.map((item: any) => ({
      label: item?.name,
      value: item?._id,
    }));
  };

  return {
    router,
    dealsReportsTable,
    dealsReportsCardsData,
    dealsReportsGraphData,
    isLoading,
    setSearchBy,
    dealsOwner,
    filter,
    setFilter,
    resetFilters,
    pipelineData,
    setPage,
    setLimit,
    isFetching,
    isSuccess,
    isError,
    datePickerVal,
    setDatePickerVal,
    open,
    openPipeline,
    anchorEl,
    anchorElNew,
    handleClick,
    handleClose,
    handleClickPipeline,
    handleClosePipleine,
    customizeData,
    pipelineDropdown,
  };
};

export default useDealsReports;
