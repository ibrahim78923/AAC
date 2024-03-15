import { DialogActions, Grid } from '@mui/material';
import { FormProvider } from '@/components/ReactHookForm';
import { useUpsertWorkloadSchedule } from './useUpsertWorkloadSchedule';
import { PageTitledHeader } from '@/components/PageTitledHeader';
import { LoadingButton } from '@mui/lab';
import SkeletonForm from '@/components/Skeletons/SkeletonForm';

export const UpsertWorkloadSchedule = () => {
  const {
    handleSubmit,
    method,
    submitWorkloadSchedule,
    workloadScheduleId,
    upsertWorkloadScheduleFormFields,
    isLoading,
    isFetching,
    patchWorkloadScheduleStatus,
    postWorkloadScheduleStatus,
    moveBack,
  }: any = useUpsertWorkloadSchedule();

  if (isLoading || isFetching) return <SkeletonForm />;
  return (
    <>
      <PageTitledHeader
        title={
          !!workloadScheduleId ? 'Edit Scheduled Form' : 'Add Scheduled Form'
        }
        canMovedBack
        moveBack={() => moveBack?.()}
      />
      <br />
      <FormProvider
        methods={method}
        onSubmit={handleSubmit(submitWorkloadSchedule)}
      >
        <Grid container spacing={2}>
          {upsertWorkloadScheduleFormFields?.map((item: any) => (
            <Grid
              item
              key={item?._id}
              md={item?.md}
              xs={12}
              sx={{
                display: item?.iconProps && 'flex',
                alignItems: item?.iconProps && 'center',
                gap: item?.iconProps && 1,
                mt: item?.iconProps && 1,
              }}
            >
              {item?.componentProps && (
                <item.component {...item?.componentProps} size={'small'}>
                  {item?.heading ? item?.heading : null}
                </item.component>
              )}
              {/* {item?.iconProps && (
                <Box mt={1} gap={1} display={'flex'}>
                  {item?.iconProps && (
                    <RemoveRedEyeOutlined {...item?.iconProps} />
                  )}
                  {item?.textProps && (
                    <Typography {...item?.textProps}>{item?.title}</Typography>
                  )}
                </Box>
              )} */}
            </Grid>
          ))}
        </Grid>
        <DialogActions>
          <LoadingButton
            type="button"
            variant="outlined"
            color="secondary"
            disabled={
              patchWorkloadScheduleStatus?.isLoading ||
              postWorkloadScheduleStatus?.isLoading
            }
            onClick={() => moveBack?.()}
          >
            Cancel
          </LoadingButton>
          <LoadingButton
            type="submit"
            variant="contained"
            loading={
              patchWorkloadScheduleStatus?.isLoading ||
              postWorkloadScheduleStatus?.isLoading
            }
          >
            {!!workloadScheduleId ? 'Update' : 'Save'}
          </LoadingButton>
        </DialogActions>
      </FormProvider>
    </>
  );
};
