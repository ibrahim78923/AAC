import { Box, Grid } from '@mui/material';

import CommonDrawer from '@/components/CommonDrawer';

import useTaskEditor from './useTaskEditor';

import {
  dealsTasksDataArray,
  drawerButtonTitle,
  drawerTitle,
} from './TaskEditor.data';

import { FormProvider } from '@/components/ReactHookForm';
import { useLazyGetDealsAssignedUsersQuery } from '@/services/airSales/deals/view-details/tasks';

const TaskEditorDrawer = (props: any) => {
  const {
    openDrawer,
    setOpenDrawer,
    selectedCheckboxes,
    setSelectedCheckboxes,
    selectedRecId,
    taskData,
  } = props;
  const {
    handleSubmit,
    onSubmit,
    methodsdealsTasks,
    onCloseDrawer,
    updateIsLoading,
    postIsLoading,
  } = useTaskEditor({
    selectedCheckboxes,
    openDrawer,
    setOpenDrawer,
    setSelectedCheckboxes,
    selectedRecId,
    taskData,
  });

  const usersData = useLazyGetDealsAssignedUsersQuery();
  const getDealsTasksDataArray = dealsTasksDataArray({ openDrawer, usersData });

  return (
    <div>
      <CommonDrawer
        isDrawerOpen={!!openDrawer}
        onClose={onCloseDrawer}
        title={drawerTitle[openDrawer]}
        okText={drawerButtonTitle[openDrawer]}
        isOk={true}
        submitHandler={handleSubmit(onSubmit)}
        footer={openDrawer === 'View' ? false : true}
        isLoading={openDrawer === 'Edit' ? updateIsLoading : postIsLoading}
      >
        <Box sx={{ pt: 2 }}>
          <FormProvider
            methods={methodsdealsTasks}
            onSubmit={handleSubmit(onSubmit)}
          >
            <Grid container spacing={4}>
              {/* eslint-disable */}
              {getDealsTasksDataArray?.map((item: any, index: any) => (
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
            </Grid>
          </FormProvider>
        </Box>
      </CommonDrawer>
    </div>
  );
};

export default TaskEditorDrawer;
