import CommonDrawer from '@/components/CommonDrawer';
import { useSaveReportDrawer } from './useSaveReportDrawer';
import { FormProvider } from '@/components/ReactHookForm';
import { Grid } from '@mui/material';
import { REPORT_TYPE, SELECTED_ARRAY_LENGTH } from '@/constants/strings';

export const SaveReportDrawer = (props: any) => {
  const { open, reportId } = props;
  const {
    saveReportsMethods,
    watch,
    handleSubmit,
    onSubmit,
    handleCancel,
    selectAddToNewDashboard,
    reportsArray,
    postGenericReportStatus,
    patchGenericReportStatus,
  } = useSaveReportDrawer(props);

  return (
    <CommonDrawer
      isDrawerOpen={open}
      onClose={handleCancel}
      submitHandler={() => handleSubmit(onSubmit)()}
      cancelBtnHandler={handleCancel}
      title="Save Reports"
      okText="Apply"
      isOk={true}
      footer={true}
      isLoading={
        reportId
          ? patchGenericReportStatus?.isLoading
          : postGenericReportStatus?.isLoading
      }
      disabledCancelBtn={
        reportId
          ? patchGenericReportStatus?.isLoading
          : postGenericReportStatus?.isLoading
      }
    >
      <FormProvider methods={saveReportsMethods}>
        <Grid container spacing={1}>
          {reportsArray?.map((item: any) => {
            return (
              <>
                <Grid item key={item?.id} xs={12}>
                  <item.component {...item?.componentProps} />
                </Grid>
                {watch(item?.componentProps?.name) ===
                  item?.componentProps?.options?.[SELECTED_ARRAY_LENGTH?.ONE]
                    ?.value && (
                  <Grid item xs={12} mx={2}>
                    {item?.conditionalComponentOne}
                  </Grid>
                )}
                {watch(item?.componentProps?.name) ===
                  item?.componentProps?.options?.[SELECTED_ARRAY_LENGTH?.TWO]
                    ?.value && (
                  <Grid item xs={12} mx={2}>
                    {item?.conditionalComponentTwo}
                  </Grid>
                )}
                {watch(item?.componentProps?.name) ===
                  item?.componentProps?.options?.[SELECTED_ARRAY_LENGTH?.TWO]
                    ?.value && (
                  <Grid item xs={12} mx={2}>
                    {item?.conditionalComponentTree}
                  </Grid>
                )}
                {watch(item?.componentProps?.name) ===
                  item?.componentProps?.options?.[SELECTED_ARRAY_LENGTH?.ONE]
                    ?.value && (
                  <Grid item xs={12} mx={2}>
                    {item?.conditionalComponentFour}
                  </Grid>
                )}
                {selectAddToNewDashboard === REPORT_TYPE?.EVERYONE && (
                  <Grid item xs={12} mx={4}>
                    {item?.conditionalComponentFive}
                  </Grid>
                )}
                {selectAddToNewDashboard === REPORT_TYPE?.SPECIFIC_USERS && (
                  <Grid item xs={12} mx={4}>
                    {item?.conditionalComponentSix}
                  </Grid>
                )}
              </>
            );
          })}
        </Grid>
      </FormProvider>
    </CommonDrawer>
  );
};
