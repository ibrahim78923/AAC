import { Grid, Box } from '@mui/material';
import CommonDrawer from '@/components/CommonDrawer';
import { FormProvider } from '@/components/ReactHookForm';
import { dataArray } from './SoftwareFilter.data';
import { useForm } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';

export default function SoftwareFilter({ isOpenDrawer, onClose }: any) {
  const methods: any = useForm({});

  return (
    <CommonDrawer
      isDrawerOpen={isOpenDrawer}
      onClose={() => onClose(false)}
      title={'Filters'}
      okText={'Apply'}
      isOk
      cancelText={'Cancel'}
    >
      <Box mt={1}>
        <FormProvider methods={methods}>
          <Grid container spacing={4}>
            {dataArray?.map((item: any) => (
              <Grid item xs={12} md={item?.md} key={uuidv4()}>
                <item.component {...item?.componentProps} size={'small'} />
              </Grid>
            ))}
          </Grid>
        </FormProvider>
      </Box>
    </CommonDrawer>
  );
}
