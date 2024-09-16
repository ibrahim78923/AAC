import { Grid, Skeleton } from '@mui/material';

import { FormProvider } from '@/components/ReactHookForm';
import useCreateTask from './useCreateTask';

import CommonDrawer from '@/components/CommonDrawer';
import { API_STATUS, TASK_TYPE } from '@/constants';
import { useAppDispatch } from '@/redux/store';
import {
  setCompaniesSelectedIds,
  setContactsSelectedIds,
  setDealsSelectedIds,
} from '@/redux/slices/taskManagement/taskManagementSlice';
import { componentMap } from '@/utils/dynamic-forms';
import { createElement, useState } from 'react';

const CreateTask = ({
  isCreateTaskDrawerOpen,
  setIsCreateTaskDrawerOpen,
  creationMode, // taskData,
}: any) => {
  const [isLoading, setIsLoading] = useState(false);
  const {
    handleFiltersSubmit,
    getCreateTaskData,
    methodsFilter,
    onSubmitHandler,
    reset,
    form,
    getDynamicFieldsStatus,
  } = useCreateTask({ creationMode, setIsCreateTaskDrawerOpen, setIsLoading });

  const dispatch: any = useAppDispatch();

  const handelClose = () => {
    setIsCreateTaskDrawerOpen(false);
    reset();
    dispatch(setContactsSelectedIds([]));
    dispatch(setCompaniesSelectedIds([]));
    dispatch(setDealsSelectedIds([]));
    dispatch(setDealsSelectedIds([]));
  };

  return (
    <CommonDrawer
      isDrawerOpen={isCreateTaskDrawerOpen}
      onClose={handelClose}
      title={
        creationMode === TASK_TYPE?.CREATE_TASK ? 'Create Task' : 'Edit Task'
      }
      okText={creationMode === TASK_TYPE?.CREATE_TASK ? 'Create' : 'Update'}
      isOk
      cancelText={'Cancel'}
      isLoading={isLoading}
      footer={true}
      submitHandler={() => handleFiltersSubmit(onSubmitHandler)}
    >
      <FormProvider
        methods={methodsFilter}
        handleSubmit={() => handleFiltersSubmit(onSubmitHandler)}
      >
        <Grid container spacing={2}>
          {/* eslint-disable */}
          {getCreateTaskData?.map((item: any, index) => (
            <Grid item xs={12} md={item?.md} key={index}>
              <item.component {...item.componentProps} size={'small'}>
                {item?.componentProps?.select
                  ? item?.options?.map((option: any) => (
                      <option key={option?.value} value={option?.value}>
                        {option?.label}
                      </option>
                    ))
                  : null}
              </item.component>
            </Grid>
          ))}
          {/* eslint-enable */}
          {getDynamicFieldsStatus?.status === API_STATUS?.PENDING ? (
            <>
              <Grid item xs={12}>
                <Skeleton
                  variant="rounded"
                  sx={{ width: '100%', height: '45px' }}
                />
              </Grid>
              <Grid item xs={12}>
                <Skeleton
                  variant="rounded"
                  sx={{ width: '100%', height: '45px' }}
                />
              </Grid>
            </>
          ) : (
            <>
              {form?.map((item: any) => (
                <Grid item xs={12} key={item?.id}>
                  {componentMap[item?.component] &&
                    createElement(componentMap[item?.component], {
                      ...item?.componentProps,
                      name: item?.componentProps?.label,
                      size: 'small',
                    })}
                </Grid>
              ))}
            </>
          )}
        </Grid>
      </FormProvider>
    </CommonDrawer>
  );
};

export default CreateTask;
