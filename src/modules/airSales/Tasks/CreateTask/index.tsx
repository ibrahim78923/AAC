import { Grid } from '@mui/material';

import { FormProvider } from '@/components/ReactHookForm';
import useCreateTask from './useCreateTask';

import CommonDrawer from '@/components/CommonDrawer';
import { TASK_TYPE } from '@/constants';
import { useAppDispatch } from '@/redux/store';
import {
  setCompaniesSelectedIds,
  setContactsSelectedIds,
  setDealsSelectedIds,
} from '@/redux/slices/taskManagement/taskManagementSlice';

const CreateTask = ({
  isCreateTaskDrawerOpen,
  setIsCreateTaskDrawerOpen,
  creationMode, // taskData,
  postTaskLoading,
  patchTaskLoading,
}: any) => {
  const {
    handleFiltersSubmit,
    getCreateTaskData,
    methodsFilter,
    onSubmitHandler,
    reset,
  } = useCreateTask({ creationMode, setIsCreateTaskDrawerOpen });

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
      isLoading={
        creationMode === TASK_TYPE?.CREATE_TASK
          ? postTaskLoading
          : patchTaskLoading
      }
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
              <item.component
                {...item.componentProps}
                size={'small'}
                // options={item?.options}
              >
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
        </Grid>
      </FormProvider>
    </CommonDrawer>
  );
};

export default CreateTask;
