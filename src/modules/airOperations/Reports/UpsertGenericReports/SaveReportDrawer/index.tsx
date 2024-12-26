import CommonDrawer from '@/components/CommonDrawer';
import { useSaveReportDrawer } from './useSaveReportDrawer';
import { FormProvider } from '@/components/ReactHookForm';
import { Grid } from '@mui/material';
import { SELECTED_ARRAY_LENGTH } from '@/constants/strings';
import { SaveReportDrawerI } from './SaveReportDrawer.interface';
import { BACKEND_REPORT_ACCESS } from '@/constants/api';

export const SaveReportDrawer = (props: SaveReportDrawerI) => {
  const { open, reportId, setOpen } = props;
  const {
    methods,
    watch,
    handleSubmit,
    onSubmit,
    selectAddToNewDashboard,
    reportsArray,
    postGenericReportStatus,
    patchGenericReportStatus,
  } = useSaveReportDrawer(props);

  return (
    <CommonDrawer
      isDrawerOpen={open}
      onClose={() => setOpen(false)}
      submitHandler={() => handleSubmit(onSubmit)()}
      cancelBtnHandler={() => setOpen(false)}
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
      <FormProvider methods={methods}>
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
                {selectAddToNewDashboard ===
                  BACKEND_REPORT_ACCESS?.EVERYONE && (
                  <Grid item xs={12} mx={4}>
                    {item?.conditionalComponentFive}
                  </Grid>
                )}
                {selectAddToNewDashboard ===
                  BACKEND_REPORT_ACCESS?.SPECIFIC_USERS && (
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
