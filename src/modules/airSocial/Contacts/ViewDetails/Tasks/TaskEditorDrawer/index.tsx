import { Box, Grid } from '@mui/material';
import CommonDrawer from '@/components/CommonDrawer';
import { FormProvider } from '@/components/ReactHookForm';
import { viewTaskData } from './TaskEditor.data';
import useViewTask from './useTaskEditor';

const TaskEditorDrawer = (props: any) => {
  const { openDrawer, onClose, data } = props;
  const { usersData, methods } = useViewTask(data);

  const viewFormFields = viewTaskData(usersData);

  return (
    <div>
      <CommonDrawer
        isDrawerOpen={openDrawer}
        onClose={onClose}
        title={`View Task`}
        isOk={false}
        footer={false}
      >
        <Box sx={{ pt: 2 }}>
          <FormProvider methods={methods}>
            <Grid container spacing="22px">
              {viewFormFields?.map((item: any) => (
                <Grid
                  item
                  xs={12}
                  md={item?.md}
                  key={item?.componentProps?.name}
                >
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
