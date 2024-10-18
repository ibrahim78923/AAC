import { PAGINATION } from '@/config';
import { useGetDealPipeLineForecastQuery } from '@/services/airSales/forecast';
import { useGetCategoryForecastReportQuery } from '@/services/airSales/reports';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTheme } from '@mui/material';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

const useCateogoryForcastReports = () => {
  const [activeCard, setActiveCard] = useState('total');
  const [filterValues, setFilterValues] = useState({});
  const [page, setPage] = useState(PAGINATION?.CURRENT_PAGE);
  const [pageLimit, setPageLimit] = useState(PAGINATION?.PAGE_LIMIT);

  const theme = useTheme();
  const router = useRouter();
  const activeCardObj = {
    TOTAL: 'total',
    OVERTIME: 'overtime',
    COMPARISON: 'comparison',
  };

  const [alignment, setAlignment] = useState('User');

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string,
  ) => {
    setAlignment(newAlignment);
    setFilterValues({});
  };

  const Params = {
    page: page,
    limit: pageLimit,
    isTeam: alignment === 'User' ? false : true,
    reportType: activeCard,
  };

  const {
    data: getCategoryForecastReportData,
    isLoading: CategoryForecastReportDataIsLoading,
    isFetching: CategoryForecastReportDataIsFetching,
    isError: CategoryForecastReportDataIsError,
    isSuccess: CategoryForecastReportDataIsSuccess,
  } = useGetCategoryForecastReportQuery({
    params: { ...Params, ...filterValues },
  });

  const { data: dealPipelineData } = useGetDealPipeLineForecastQuery({
    meta: false,
  });

  const methods: any = useForm({
    resolver: yupResolver({}),
    defaultValues: {},
  });

  const handleSubmit = () => {};

  const { watch } = methods;
  const userTeam = watch('userTeam');
  const pipeline = watch('pipeline');

  useEffect(() => {
    setFilterValues({
      ...filterValues,
      pipelines: pipeline,
      collaboratorIds: userTeam?._id,
    });
  }, [userTeam, pipeline]);

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
    getCategoryForecastReportData,
    CategoryForecastReportDataIsLoading,
    CategoryForecastReportDataIsFetching,
    CategoryForecastReportDataIsError,
    CategoryForecastReportDataIsSuccess,
    setPageLimit,
    setPage,
    handleSubmit,
    methods,
  };
};

export default useCateogoryForcastReports;
