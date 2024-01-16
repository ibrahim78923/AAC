import CommonDrawer from '@/components/CommonDrawer';
import { upsertSoftwareFormFields } from './UpsertSoftware.data';
import { FormProvider } from '@/components/ReactHookForm';
import { Box, Grid } from '@mui/material';

export const UpsertSoftware = (props: any) => {
  const { isDrawerOpen, onClose, methods, submitForm, title } = props;
  return (
    <div>
      <CommonDrawer
        isDrawerOpen={isDrawerOpen}
        onClose={onClose}
        isOk
        okText="Save"
        footer
        title={title}
        submitHandler={submitForm}
      >
        <Box mt={1}>
          <FormProvider methods={methods} onSubmit={submitForm}>
            <Grid container spacing={1}>
              {upsertSoftwareFormFields()?.map((item: any) => (
                <Grid item xs={12} key={item?.id}>
                  <item.component {...item?.componentProps} size={'small'} />
                </Grid>
              ))}
            </Grid>
          </FormProvider>
        </Box>
      </CommonDrawer>
    </div>
  );
};
