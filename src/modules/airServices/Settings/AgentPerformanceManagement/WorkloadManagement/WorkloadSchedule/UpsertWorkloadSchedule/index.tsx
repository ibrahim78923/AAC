import { Box, Grid } from '@mui/material';
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
  } = useUpsertWorkloadSchedule();

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
              sx={{ pt: `${item?.p} !important` }}
            >
              <item.component {...item?.componentProps} size={'small'}>
                {item?.heading && item?.heading}
              </item.component>
            </Grid>
          ))}
        </Grid>

        <Box
          display={'flex'}
          alignItems={'center'}
          justifyContent={'flex-end'}
          flexWrap={'wrap'}
          gap={2}
          mt={4}
        >
          <LoadingButton
            type="button"
            variant="outlined"
            color="secondary"
            className={'small'}
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
            className={'small'}
            loading={
              patchWorkloadScheduleStatus?.isLoading ||
              postWorkloadScheduleStatus?.isLoading
            }
          >
            {!!workloadScheduleId ? 'Update' : 'Save'}
          </LoadingButton>
        </Box>
      </FormProvider>
    </>
  );
};
