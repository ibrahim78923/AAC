import { PageTitledHeader } from '@/components/PageTitledHeader';
import { FormProvider } from '@/components/ReactHookForm';
import { AIR_LOYALTY_PROGRAM } from '@/constants';
import { Box, Grid, Typography } from '@mui/material';
import { upsertConsumerData } from './UpsertConsumer.data';
import { useUpsertConsumer } from './useUpsertConsumer';
import { ReactHookFormFieldsI } from '@/components/ReactHookForm/ReactHookForm.interface';

export const UpsertConsumer = () => {
  const { methods, router } = useUpsertConsumer();
  return (
    <Box>
      <PageTitledHeader
        title={'Consumer'}
        canMovedBack
        moveBack={() => {
          router?.push({
            pathname: AIR_LOYALTY_PROGRAM?.CONSUMERS,
          });
        }}
      />

      <FormProvider methods={methods}>
        <Box border={`1px solid `} borderColor={'grey.700'} p={1}>
          <Typography variant={'h5'}>Information</Typography>
          <Grid container spacing={2} mt={1}>
            {upsertConsumerData?.map((item: ReactHookFormFieldsI) => (
              <Grid item xs={12} md={6} key={item?.id}>
                <item.component
                  {...item?.componentProps}
                  size={'small'}
                  disabled
                />
              </Grid>
            ))}
          </Grid>
        </Box>
      </FormProvider>
    </Box>
  );
};
