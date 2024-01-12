import { Grid, Box } from '@mui/material';
import CommonDrawer from '@/components/CommonDrawer';
import { FormProvider } from '@/components/ReactHookForm';
import { softwareFilterDataArray } from './SoftwareFilter.data';
import { useSoftwareFilter } from './useSoftwareFilter';

export default function SoftwareFilter(props: any) {
  const { isOpenDrawer, setIsOpenFilterDrawer } = props;
  const { methods, handleSubmit, onSubmit } = useSoftwareFilter(props);
  return (
    <>
      <CommonDrawer
        isDrawerOpen={isOpenDrawer}
        onClose={() => setIsOpenFilterDrawer(false)}
        title={'Filters'}
        okText={'Apply'}
        isOk
        cancelText={'Cancel'}
        submitHandler={handleSubmit(onSubmit)}
        footer
      >
        <Box mt={1}>
          <FormProvider methods={methods}>
            <Grid container spacing={4}>
              {softwareFilterDataArray?.map((item: any) => (
                <Grid item xs={12} md={item?.md} key={item?.id}>
                  <item.component {...item?.componentProps} size={'small'} />
                </Grid>
              ))}
            </Grid>
          </FormProvider>
        </Box>
      </CommonDrawer>
    </>
  );
}
