import CommonDrawer from '@/components/CommonDrawer';
import { upsertFormFields } from './UpsertLocations.data';
import { useUpsertLocations } from './useUpsertLocations';
import { FormProvider } from '@/components/ReactHookForm';
import { Box, Grid } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
const UpsertLocations = (props: any) => {
  const { isDrawerOpen, onClose } = props;
  const { methods, handleSubmit, submitUpsertLocationForm } =
    useUpsertLocations(props);
  return (
    <>
      {' '}
      <CommonDrawer
        isDrawerOpen={isDrawerOpen}
        onClose={() => onClose(false)}
        isOk
        okText="Add"
        footer
        title="Add Location"
        submitHandler={() => {
          methods?.handleSubmit(submitUpsertLocationForm)();
        }}
      >
        <Box mt={1}>
          <FormProvider
            methods={methods}
            onSubmit={handleSubmit(submitUpsertLocationForm)}
          >
            <Grid container spacing={1}>
              {upsertFormFields?.map((item: any) => (
                <Grid item xs={12} md={item?.md} key={uuidv4()}>
                  <item.component {...item?.componentProps} size={'small'}>
                    {item?.componentProps?.select
                      ? item?.options?.map((option: any) => (
                          <option key={uuidv4()} value={option?.value}>
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
    </>
  );
};

export default UpsertLocations;
