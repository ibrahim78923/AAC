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
import { TaskEditorDrawerProps } from '../Tasks-interface';
import { DRAWER_ACTIONS_TITLES } from '@/constants/strings';
import SkeletonTable from '@/components/Skeletons/SkeletonTable';

const TaskEditorDrawer = (props: TaskEditorDrawerProps) => {
  const { openDrawer, setOpenDrawer, selectedRecId } = props;
  const {
    handleSubmit,
    onSubmit,
    methodsdealsTasks,
    onCloseDrawer,
    updateIsLoading,
    postIsLoading,
    getTaskDataLoading,
  } = useTaskEditor({
    openDrawer,
    setOpenDrawer,
    selectedRecId,
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
        footer={openDrawer === DRAWER_ACTIONS_TITLES?.VIEW ? false : true}
        isLoading={
          openDrawer === DRAWER_ACTIONS_TITLES?.EDIT
            ? updateIsLoading
            : postIsLoading
        }
      >
        {getTaskDataLoading ? (
          <SkeletonTable />
        ) : (
          <Box sx={{ pt: 2 }}>
            <FormProvider
              methods={methodsdealsTasks}
              onSubmit={handleSubmit(onSubmit)}
            >
              <Grid container spacing={2}>
                {getDealsTasksDataArray?.map((item: any) => (
                  <Grid
                    item
                    xs={12}
                    md={item?.md}
                    key={item.componentProps?.name}
                  >
                    <item.component
                      {...item.componentProps}
                      size={'small'}
                      disabled={
                        openDrawer === DRAWER_ACTIONS_TITLES?.VIEW
                          ? true
                          : false
                      }
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
              </Grid>
            </FormProvider>
          </Box>
        )}
      </CommonDrawer>
    </div>
  );
};

export default TaskEditorDrawer;
