import React, { useEffect, useRef } from 'react';
import {
  Box,
  Button,
  CircularProgress,
  Tooltip,
  Typography,
} from '@mui/material';
import { throttle } from 'lodash'; // Import Lodash throttle
import Search from '@/components/Search';
import { v4 as uuidv4 } from 'uuid';
import UserLists from './UserLists';
import SwitchableDatepicker from '@/components/SwitchableDatepicker';
import useActivityLog from './useActivityLog';
import { FilterIcon, RefreshTasksIcon } from '@/assets/icons';
import FilterActivityLogs from './FilterActivityLogs';

const ActivityLogs = () => {
  const {
    search,
    setSearch,
    dateValue,
    setDateValue,
    handleDateSubmit,
    ActivityLogsData,
    handleRefresh,
    isLoading,
    setIsFilterOpen,
    isFilterOpen,
    filterValues,
    setFilterValues,
    methods,
    handleSubmit,
    loadMore,
    hasMore,
    isFetching,
    setPage,
  } = useActivityLog();

  const containerRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    const container = containerRef.current;
    if (!container) return;

    const { scrollTop, scrollHeight, clientHeight } = container;

    if (
      scrollTop + clientHeight >= scrollHeight - 10 &&
      hasMore &&
      !isFetching
    ) {
      loadMore();
    }
  };

  // Use Lodash throttle to limit the frequency of scroll handling
  const throttledScroll = throttle(handleScroll, 200);

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', throttledScroll);
    }

    return () => {
      if (container) {
        container.removeEventListener('scroll', throttledScroll);
      }
      throttledScroll.cancel(); // Cancel any pending throttled calls
    };
  }, [hasMore, isFetching, loadMore, throttledScroll]);

  return (
    <>
      <div
        ref={containerRef}
        style={{
          overflowY: 'auto',
          maxHeight: '70vh',
        }}
      >
        <Typography variant="h3" mb={'24px'}>
          Activity Logs
        </Typography>

        <Box display={'flex'} alignItems={'center'} gap={'12px'}>
          <Search
            label="What are you looking for?"
            searchBy={search}
            setSearchBy={setSearch}
            size="small"
            width={'100%'}
          />

          <Button
            variant="outlined"
            className="small"
            color="inherit"
            startIcon={<FilterIcon />}
            onClick={() => setIsFilterOpen(true)}
          >
            Filter
          </Button>

          <FilterActivityLogs
            filterValues={filterValues}
            setFilterValues={setFilterValues}
            setIsFilter={setIsFilterOpen}
            isFilter={isFilterOpen}
            handleSubmit={handleSubmit}
            methods={methods}
            setPage={setPage}
          />

          <Tooltip title={'Refresh Filter'}>
            <Button
              variant="outlined"
              color="inherit"
              className="small"
              onClick={handleRefresh}
            >
              <RefreshTasksIcon />
            </Button>
          </Tooltip>

          <SwitchableDatepicker
            dateValue={dateValue}
            setDateValue={setDateValue}
            handleDateSubmit={handleDateSubmit}
            renderInput="button"
            placement="right"
          />
        </Box>
        {isLoading && (
          <Box sx={{ textAlign: 'center', marginTop: '100px' }}>
            <CircularProgress />
          </Box>
        )}

        {ActivityLogsData.map((data: any) => (
          <Box key={uuidv4()} sx={{ overflowY: 'scroll', maxHeight: '65vh' }}>
            <Typography
              variant="body2"
              fontWeight={600}
              my={'24px'}
              textTransform={'capitalize'}
            >
              {data?.date}
            </Typography>
            {data?.userLists?.map((user: any) => (
              <UserLists key={uuidv4()} {...user} />
            ))}
          </Box>
        ))}

        {isFetching && !isLoading && (
          <Box sx={{ textAlign: 'center', marginTop: '50px' }}>
            <CircularProgress />
          </Box>
        )}
      </div>
    </>
  );
};

export default ActivityLogs;
