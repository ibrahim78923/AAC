import { PAGINATION } from '@/config';
import { DATE_FORMAT } from '@/constants';
import { useGetActivityLogQuery } from '@/services/orgAdmin/activity-log';
import dayjs from 'dayjs';
import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

const useActivityLog = () => {
  const [page, setPage] = useState(PAGINATION.CURRENT_PAGE);
  const [search, setSearch] = useState();
  const [dateValue, setDateValue] = useState<any>([new Date(), new Date()]);
  const [filterValues, setFilterValues] = useState<any>({});
  const [ActivityLogsData, setActivityLogsData] = useState<any[]>([]);
  const [hasMore, setHasMore] = useState(true);

  const startDate = 0,
    endaDate = 1;

  const handleDateSubmit = () => {
    const filterPayloadValues = {
      startDate: dayjs(dateValue[startDate])?.format(DATE_FORMAT?.API),
      endDate: dayjs(dateValue[endaDate])?.format(DATE_FORMAT?.API),
    };

    setFilterValues(filterPayloadValues);
  };

  const handleRefresh = async () => {
    setPage(PAGINATION.CURRENT_PAGE);
    setActivityLogsData([]);
    setHasMore(true);
    setFilterValues('');
  };

  const searchParam = {
    page,
    limit: PAGINATION.PAGE_LIMIT,
    search: search,
  };

  let modifyFilterValues: any = { ...filterValues };
  if (filterValues?.company) {
    modifyFilterValues = {
      ...modifyFilterValues,
      company: modifyFilterValues?.company?._id,
    };
  }
  if (filterValues?.user) {
    modifyFilterValues = {
      ...modifyFilterValues,
      performedBy: modifyFilterValues?.user?._id,
    };
    delete modifyFilterValues.user;
  }
  if (filterValues?.organization) {
    modifyFilterValues = {
      ...modifyFilterValues,
      orgId: modifyFilterValues?.organization?._id,
    };
    delete modifyFilterValues.organization;
  }
  if (filterValues?.company) {
    modifyFilterValues = {
      ...modifyFilterValues,
      compId: modifyFilterValues?.company,
    };
    delete modifyFilterValues.company;
  }

  const { data, isLoading, isFetching } = useGetActivityLogQuery({
    params: { ...modifyFilterValues, ...searchParam },
  });

  const loadMore = useCallback(() => {
    if (isLoading || isFetching || !hasMore) return;
    setPage((prevPage) => prevPage + 1);
  }, [isLoading, hasMore]);
  useEffect(() => {
    if (data?.data?.activitylogs) {
      const newLogs = data.data.activitylogs.map((log: any) => {
        const logDate = new Date(log.createdAt).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        });

        return {
          date: logDate,
          userLists: [
            {
              id: log._id,
              performedByName: log.performedByName,
              module: log.module,
              moduleName: log.moduleName,
              performedBy: log.performedBy,
              moduleId: log.moduleId,
              userImg: 'ExampleKababCaseImg',
              label: log.activityType,
              time: new Date(log.createdAt).toLocaleTimeString('en-US', {
                hour: 'numeric',
                minute: 'numeric',
              }),
            },
          ],
        };
      });

      if (page === 1) {
        setActivityLogsData(newLogs);
      } else {
        setActivityLogsData((prevData) => [...prevData, ...newLogs]);
      }
      setHasMore(newLogs.length > 0);
    }
  }, [data, page]);

  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const methods: any = useForm({});
  const { handleSubmit } = methods;

  // const handleResetFilters = () => {
  //   setFilterValues(defaultFilterValues);
  //   reset();
  //   setValue(0);
  // };
  return {
    search,
    setSearch,
    dateValue,
    setDateValue,
    handleDateSubmit,
    ActivityLogsData,
    loadMore,
    handleRefresh,
    isLoading,
    hasMore,
    setIsFilterOpen,
    isFilterOpen,
    filterValues,
    setFilterValues,
    methods,
    handleSubmit,
    isFetching,
    setPage,
  };
};

export default useActivityLog;
