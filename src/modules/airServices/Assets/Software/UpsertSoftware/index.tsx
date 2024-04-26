import CommonDrawer from '@/components/CommonDrawer';
import { upsertSoftwareFormFields } from './UpsertSoftware.data';
import { FormProvider } from '@/components/ReactHookForm';
import { Box, Grid } from '@mui/material';
import { useUpsertSoftware } from './useUpsertSoftware';
import SkeletonForm from '@/components/Skeletons/SkeletonForm';

export const UpsertSoftware = (props: any) => {
  const { isAddDrawerOpen } = props;
  const {
    onClose,
    methods,
    handleSubmit,
    postSoftwareStatus,
    userQuery,
    softwareId,
    isLoading,
    isFetching,
    editSoftwareStatus,
    submitUpsertSoftware,
  } = useUpsertSoftware(props);

  if (isLoading || isFetching) return <SkeletonForm />;

  return (
    <CommonDrawer
      isDrawerOpen={isAddDrawerOpen}
      onClose={onClose}
      isOk
      okText={!!softwareId ? 'Update' : 'Save'}
      footer
      title={!!softwareId ? 'Edit Software' : 'New Software'}
      submitHandler={() => handleSubmit(submitUpsertSoftware)()}
      isLoading={postSoftwareStatus?.isLoading || editSoftwareStatus?.isLoading}
    >
      <Box mt={1}>
        <FormProvider methods={methods}>
          <Grid container spacing={1}>
            {upsertSoftwareFormFields(userQuery)?.map((item: any) => (
              <Grid item xs={12} md={item?.md} key={item?.id}>
                <item.component {...item?.componentProps} size={'small'} />
              </Grid>
            ))}
          </Grid>
        </FormProvider>
      </Box>
    </CommonDrawer>
  );
};
