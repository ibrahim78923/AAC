import { PAGINATION } from '@/config';
import { useGetDealPipeLineForecastQuery } from '@/services/airSales/forecast';
import { useGetPipelineForecastReportQuery } from '@/services/airSales/reports';
import { useTheme } from '@mui/material';
import { useRouter } from 'next/router';
import { useState } from 'react';

const usePipelineForcastReports = () => {
  const [activeCard, setActiveCard] = useState('total');
  const [filterValues, setFilterValues] = useState({});
  const [page, setPage] = useState(PAGINATION?.CURRENT_PAGE);
  const [pageLimit, setPageLimit] = useState(PAGINATION?.PAGE_LIMIT);

  const theme = useTheme();
  const router = useRouter();

  const [alignment, setAlignment] = useState('User');

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string,
  ) => {
    setAlignment(newAlignment);
  };

  const activeCardObj = {
    TOTAL: 'total',
    OVERTIME: 'overtime',
    COMPARISON: 'comparison',
  };

  const Params = {
    page: page,
    limit: pageLimit,
    isTeam: alignment === 'User' ? false : true,
    reportType: activeCard,
  };

  const {
    data: getPipelineForecastReportData,
    isLoading: PipelineForecastReportDataIsLoading,
    isFetching: PipelineForecastReportDataIsFetching,
    isError: PipelineForecastReportDataIsError,
    isSuccess: PipelineForecastReportDataIsSuccess,
  } = useGetPipelineForecastReportQuery({
    params: { ...Params, ...filterValues },
  });

  const { data: dealPipelineData } = useGetDealPipeLineForecastQuery({
    meta: false,
  });

  return {
    activeCard,
    setActiveCard,
    theme,
    router,
    activeCardObj,
    alignment,
    handleChange,
    dealPipelineData,
    filterValues,
    setFilterValues,
    getPipelineForecastReportData,
    PipelineForecastReportDataIsLoading,
    PipelineForecastReportDataIsFetching,
    PipelineForecastReportDataIsError,
    PipelineForecastReportDataIsSuccess,
    setPageLimit,
    setPage,
  };
};

export default usePipelineForcastReports;
