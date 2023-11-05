import CommonDrawer from '@/components/CommonDrawer';
import { upsertSoftwareFormFields } from './UpsertSoftware.data';

import { FormProvider } from '@/components/ReactHookForm';
import { Box, Grid } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import { useUpsertSoftware } from './useUpsertSoftware';

export const UpsertSoftware = (props: any) => {
  const { isDrawerOpen, onClose } = props;
  const { methods, handleSubmit, submitUpsertSoftwareForm } =
    useUpsertSoftware(props);

  return (
    <div>
      <CommonDrawer
        isDrawerOpen={isDrawerOpen}
        onClose={() => onClose(false)}
        isOk
        okText="Save"
        footer
        title="New Software"
        submitHandler={() => {
          methods?.handleSubmit(submitUpsertSoftwareForm)();
        }}
      >
        <Box mt={1}>
          <FormProvider
            methods={methods}
            onSubmit={handleSubmit(submitUpsertSoftwareForm)}
          >
            <Grid container spacing={1}>
              {upsertSoftwareFormFields?.map((item: any) => (
                <Grid item xs={12} md={item?.md} key={uuidv4()}>
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
