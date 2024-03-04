import { Box, Grid } from '@mui/material';
import CommonDrawer from '@/components/CommonDrawer';
import { FormProvider } from '@/components/ReactHookForm';
import { contactTaskDataArray } from './TaskEditor.data';

const TaskEditorDrawer = (props: any) => {
  const { title, openDrawer, onClose, methods, handleSubmit } = props;

  return (
    <div>
      <CommonDrawer
        isDrawerOpen={openDrawer}
        onClose={onClose}
        title={`${title} Task`}
        okText={'Update'}
        isOk={true}
        footer={openDrawer === 'View' ? false : true}
        submitHandler={handleSubmit}
      >
        <Box sx={{ pt: 2 }}>
          <FormProvider methods={methods}>
            <Grid container spacing="22px">
              {contactTaskDataArray?.map((item: any) => (
                <Grid item xs={12} md={item?.md} key={item?.id}>
                  <item.component {...item?.componentProps} size={'small'}>
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
