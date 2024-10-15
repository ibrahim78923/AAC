import React, { useEffect } from 'react';
import Filter from './TabToolbar';
import { useTask } from '../useTask';
import { TasksData } from '../Task.data';
import Search from '@/components/Search';
import { Box } from '@mui/material';
import TanstackTable from '@/components/Table/TanstackTable';
import GridView from '../GridView';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_SALES_TASK_MANAGE_TASK_PERMISSIONS } from '@/constants/permission-keys';
import {
  setFiltersData,
  setSelectedTaskIds,
} from '@/redux/slices/taskManagement/taskManagementSlice';

const Tabs = ({ tabValue, assignTo }: any) => {
  const {
    setPage,
    setTabsValue,
    setPageLimit,
    setAssignTo,
    status,
    setSearchTask,
  } = useTask();

  const taskDataArray = useAppSelector(
    (state: any) => state?.task?.taskDataArray,
  );
  const dispatch: any = useAppDispatch();
  const getTaskData = TasksData({ data: taskDataArray?.data?.taskmanagements });

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

  useEffect(() => {
    dispatch(setSelectedTaskIds([]));
    dispatch(setFiltersData('clear'));
  }, [tabValue, assignTo]);

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '12px',
        }}
      >
        <PermissionsGuard
          permissions={[AIR_SALES_TASK_MANAGE_TASK_PERMISSIONS?.SEARCH_FILTER]}
        >
          <Search
            label={'Search here'}
            placeholder="Search by name"
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
            tabValue={tabValue}
            assignTo={assignTo}
          />
        ) : (
          <TanstackTable
            columns={getTaskData}
            data={taskDataArray?.data?.taskmanagements}
            isLoading={status === 'pending'}
            isPagination={
              taskDataArray?.data?.taskmanagements?.length ? true : false
            }
            count={taskDataArray?.data?.meta?.pages}
            totalRecords={taskDataArray?.data?.meta?.total}
            onPageChange={handlePageChange}
            setPage={setPage}
            setPageLimit={setPageLimit}
            currentPage={taskDataArray?.data?.meta?.page}
          />
        )}
      </Box>
    </>
  );
};

export default Tabs;
