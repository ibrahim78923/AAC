import CommonDrawer from '@/components/CommonDrawer';
import { useSaveReportDrawer } from './useSaveReportDrawer';
import { FormProvider } from 'react-hook-form';
import { Grid } from '@mui/material';
import { reportsDataArray } from './SaveReportDrawer.data';

export const SaveReportDrawer = (props: any) => {
  const { open } = props;
  const { saveReportsMethods, watch, handleSubmit, onSubmit, handleCancel } =
    useSaveReportDrawer(props);
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
    >
      <FormProvider {...saveReportsMethods}>
        <Grid container spacing={1}>
          {reportsDataArray?.map((item: any) => {
            return (
              <>
                <Grid item key={item?.componentProps?.name} xs={12}>
                  <item.component {...item?.componentProps} />
                </Grid>
                {watch(item?.componentProps?.name) ===
                  item?.componentProps?.options?.[1]?.value && (
                  <Grid item xs={12} ml={2}>
                    {item?.conditionalComponentOne}
                  </Grid>
                )}
                {watch(item?.componentProps?.name) ===
                  item?.componentProps?.options?.[2]?.value && (
                  <Grid item xs={12}>
                    {item?.conditionalComponentTwo}
                  </Grid>
                )}
                {watch(item?.componentProps?.name) ===
                  item?.componentProps?.options?.[2]?.value && (
                  <Grid item xs={12}>
                    {item?.conditionalComponentTree}
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
