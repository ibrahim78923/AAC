import { Grid } from '@mui/material';

import { FormProvider } from '@/components/ReactHookForm';
import useCreateTask from './useCreateTask';

import CommonDrawer from '@/components/CommonDrawer';

const CreateTask = ({
  isCreateTaskDrawerOpen,
  setIsCreateTaskDrawerOpen,
  creationMode,
  id,
}: any) => {
  const {
    handleFiltersSubmit,
    getCreateTaskData,
    methodsFilter,
    onSubmitHandler,
  } = useCreateTask({ creationMode, id });

  return (
    <CommonDrawer
      isDrawerOpen={isCreateTaskDrawerOpen}
      onClose={() => setIsCreateTaskDrawerOpen(false)}
      title={creationMode === 'create' ? 'Create Task' : 'Edit Task'}
      okText={'Create'}
      isOk
      cancelText={'Cancel'}
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
                options={item?.options}
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
