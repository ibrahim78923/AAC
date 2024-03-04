import React, { useEffect, useState } from 'react';
import Filter from './TabToolbar';
import { useTask } from '../useTask';
import { TasksData } from '../Task.data';
import Search from '@/components/Search';
import { Box } from '@mui/material';
import TanstackTable from '@/components/Table/TanstackTable';
import GridView from '../GridView';
import { useAppSelector } from '@/redux/store';

const Tabs = ({ tabValue, assignTo }: any) => {
  const { taskData, setPage, setTabsValue, setPageLimit, setAssignTo, status } =
    useTask();

  const [searchTask, setSearchTask] = useState('');

  const getTaskData = TasksData();

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  useEffect(() => {
    if (assignTo) {
      setAssignTo(assignTo);
    } else {
      setAssignTo('');
      setTabsValue(tabValue);
    }
  }, [tabValue]);
  const toggleTableView = useAppSelector(
    (state: any) => state?.task?.toggleTableView,
  );

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Search
          label={'Search here'}
          searchBy={searchTask}
          setSearchBy={setSearchTask}
          width="260px"
          size="small"
        />
        <Filter
        // disableActionBtn={false}
        // handleToggler={(val: any) => handleToggler(val)}
        // handleRefreshList={() => {
        //   'refresh';
        // }}
        />
      </Box>

      <Box sx={{ mt: 3 }}>
        {toggleTableView === 'gridView' ? (
          <GridView title={'Complete'} data={taskData?.data?.taskmanagements} />
        ) : (
          <TanstackTable
            columns={getTaskData}
            data={taskData?.data?.taskmanagements}
            isLoading={status === 'pending'}
            isPagination
            count={taskData?.data?.meta?.pages}
            totalRecords={taskData?.data?.meta?.total}
            onPageChange={handlePageChange}
            setPage={setPage}
            setPageLimit={setPageLimit}
          />
        )}
      </Box>
    </>
  );
};

export default Tabs;
