import React, { useEffect } from 'react';
import Filter from './TabToolbar';
import { useTask } from '../useTask';
import { TasksData } from '../Task.data';
import Search from '@/components/Search';
import { Box } from '@mui/material';
import TanstackTable from '@/components/Table/TanstackTable';
import GridView from '../GridView';
import { useAppSelector } from '@/redux/store';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_SALES_TASK_MANAGE_TASK_PERMISSIONS } from '@/constants/permission-keys';

const Tabs = ({ tabValue, assignTo }: any) => {
  const {
    setPage,
    setTabsValue,
    setPageLimit,
    setAssignTo,
    status,
    setSearchTask,
    searchTask,
  } = useTask();

  const taskDataArray = useAppSelector(
    (state: any) => state?.task?.taskDataArray,
  );

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
        <PermissionsGuard
          permissions={[AIR_SALES_TASK_MANAGE_TASK_PERMISSIONS?.SEARCH_FILTER]}
        >
          <Search
            label={'Search here'}
            placeholder="Search by name"
            searchBy={searchTask}
            setSearchBy={setSearchTask}
            width="260px"
            size="small"
          />
        </PermissionsGuard>
        <Filter />
      </Box>

      <Box sx={{ mt: 3 }}>
        {toggleTableView === 'gridView' ? (
          <GridView
            title={'Complete'}
            data={taskDataArray?.data?.taskmanagements}
          />
        ) : (
          <TanstackTable
            columns={getTaskData}
            data={taskDataArray?.data?.taskmanagements}
            isLoading={status === 'pending'}
            isPagination
            count={taskDataArray?.data?.meta?.pages}
            totalRecords={taskDataArray?.data?.meta?.total}
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
