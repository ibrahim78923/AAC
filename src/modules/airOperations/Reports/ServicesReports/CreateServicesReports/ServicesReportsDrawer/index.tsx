import CommonDrawer from '@/components/CommonDrawer';
import { useServicesReportsDrawer } from './useServicesReportsDrawer';
import { FormProvider } from 'react-hook-form';
import { Grid } from '@mui/material';
import { reportsDataArray } from './ServicesReportsDrawer.data';

export const ServicesReportsDrawer = (props: any) => {
  const { setOpen, open } = props;
  const { saveReportsMethods, watch } = useServicesReportsDrawer();
  return (
    <CommonDrawer
      isDrawerOpen={open}
      onClose={() => setOpen(false)}
      title="Save Reports"
      okText="Apply"
      isOk={true}
      footer={true}
    >
      <FormProvider {...saveReportsMethods}>
        <Grid container spacing={1}>
          {reportsDataArray()?.map((item: any) => {
            return (
              <>
                <Grid item key={item?.componentProps?.name} xs={12}>
                  <item.component {...item.componentProps} size={'small'} />
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
