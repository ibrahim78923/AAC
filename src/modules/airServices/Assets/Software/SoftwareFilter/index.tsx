import { Grid, Box } from '@mui/material';
import CommonDrawer from '@/components/CommonDrawer';
import { FormProvider } from '@/components/ReactHookForm';
import { softwareFilterDataArray } from './SoftwareFilter.data';
import { useSoftwareFilter } from './useSoftwareFilter';
import { SoftwareFilterI } from './SoftwareFilter.interface';

export default function SoftwareFilter(props: SoftwareFilterI) {
  const { isOpenDrawer } = props;
  const { methods, handleSubmit, onSubmit, clearFilter, onClose } =
    useSoftwareFilter(props);
  return (
    <>
      <CommonDrawer
        isDrawerOpen={isOpenDrawer}
        onClose={() => onClose?.()}
        title={'Filters'}
        okText={'Apply'}
        isOk
        cancelText={'Reset'}
        submitHandler={handleSubmit(onSubmit)}
        cancelBtnHandler={() => clearFilter?.()}
        footer
      >
        <Box mt={1}>
          <FormProvider methods={methods}>
            <Grid container spacing={1}>
              {softwareFilterDataArray?.map((item) => (
                <Grid item xs={12} key={item?.id}>
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
