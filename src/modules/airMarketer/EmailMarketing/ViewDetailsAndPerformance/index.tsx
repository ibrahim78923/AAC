import { ViewDetailsImage } from '@/assets/images';
import CommonDrawer from '@/components/CommonDrawer';
import { Box, Grid } from '@mui/material';
import Image from 'next/image';

const ViewDetailsAndPerformance = () => {
  return (
    <CommonDrawer
      isDrawerOpen={isOpenDrawer}
      onClose={() => onClose(false)}
      title={'Filters'}
      okText={'Apply'}
      isOk
      cancelText={'Cancel'}
      footer
      submitHandler={handleSubmit(onSubmit)}
    >
      <Box mt={1}>
        <Grid container>
          <Grid item sm={12}>
            <Image src={ViewDetailsImage} alt="ViewDetailsImage" />
          </Grid>
        </Grid>
      </Box>
    </CommonDrawer>
  );
};
export default ViewDetailsAndPerformance;
