import { useState } from 'react';
import { useGetLeadsReportStatsQuery } from '@/services/airMarketer/reports/leads-reports';
import { DATE_FORMAT } from '@/constants';
import dayjs from 'dayjs';
import { FilterParamsI } from './LeadsReports.interface';

const useLeadsReports = () => {
  const [searchBy, setSearchBy] = useState<any>('');
  const [dateValue, setDateValue] = useState<[Date, Date] | null>(null);
  const [filterParams, setFilterParams] = useState<FilterParamsI>({
    dateFilterType: 'YEARLY',
  });

  const handleApplyDate = () => {
    if (dateValue) {
      const [startDate, endDate] = dateValue;
      setFilterParams({
        dateFilterType: 'CUSTOM',
        startDate: dayjs(startDate).format(DATE_FORMAT.API),
        endDate: dayjs(endDate).format(DATE_FORMAT.API),
      });
    } else {
      setFilterParams({ dateFilterType: 'YEARLY' });
    }
  };

  const handleRefresh = () => {
    setFilterParams({ dateFilterType: 'YEARLY' });
    setDateValue(null);
  };

  const {
    data: dataGetLeadsStats,
    isLoading: loagingGetStats,
    isFetching: fetchingGetStats,
  } = useGetLeadsReportStatsQuery({
    params: filterParams,
  });

  return {
    dateValue,
    setDateValue,
    handleApplyDate,
    handleRefresh,
    searchBy,
    setSearchBy,
    dataGetLeadsStats,
    loagingGetStats,
    fetchingGetStats,
  };
};

export default useLeadsReports;
