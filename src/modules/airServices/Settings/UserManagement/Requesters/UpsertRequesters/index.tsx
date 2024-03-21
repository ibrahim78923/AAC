import { Box, Grid } from '@mui/material';
import { FormProvider } from '@/components/ReactHookForm';
import { upsertRequestersArray } from './UpsertRequesters.data';
import CommonDrawer from '@/components/CommonDrawer';
import { useUpsertRequester } from './useUpsertRequester';

const UpsertRequesters = (props: any) => {
  const { isDrawerOpen } = props;
  const {
    handleClose,
    methods,
    handleSubmit,
    submitUpsertRequester,
    addRequesterStatus,
    patchRequesterStatus,
    _id,
  }: any = useUpsertRequester(props);
  return (
    <>
      <CommonDrawer
        isDrawerOpen={isDrawerOpen}
        onClose={handleClose}
        title={!!_id ? 'Edit Requestor' : 'Add Requestor'}
        submitHandler={() => handleSubmit(submitUpsertRequester)()}
        footer
        isOk
        okText={!!_id ? 'Update' : 'Submit'}
        isLoading={
          addRequesterStatus?.isLoading || patchRequesterStatus?.isLoading
        }
        isDisabled={
          addRequesterStatus?.isLoading || patchRequesterStatus?.isLoading
        }
      >
        <Box mt={1}>
          <FormProvider methods={methods}>
            <Grid container spacing={2}>
              {upsertRequestersArray?.map((item: any) => (
                <Grid item xs={12} md={item?.md} key={item?._id}>
                  <item.component {...item.componentProps} size={'small'} />
                </Grid>
              ))}
            </Grid>
          </FormProvider>
        </Box>
      </CommonDrawer>
    </>
  );
};

export default UpsertRequesters;
