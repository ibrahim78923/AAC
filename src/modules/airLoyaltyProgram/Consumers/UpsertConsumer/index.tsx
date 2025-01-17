import { PageTitledHeader } from '@/components/PageTitledHeader';
import { FormProvider } from '@/components/ReactHookForm';
import { Box, Grid, Typography } from '@mui/material';
import { upsertConsumerData } from './UpsertConsumer.data';
import { useUpsertConsumer } from './useUpsertConsumer';
import { ReactHookFormFieldsI } from '@/components/ReactHookForm/ReactHookForm.interface';
import { AIR_LOYALTY_PROGRAM } from '@/constants/routes';
import { ApiRequestFlow } from '@/components/ApiRequestStates/ApiRequestFlow';

export const UpsertConsumer = () => {
  const { methods, router, isLoading, isFetching, isError, refetch } =
    useUpsertConsumer();

  return (
    <>
      <PageTitledHeader
        title={'Consumer'}
        canMovedBack
        moveBack={() => {
          router?.push({
            pathname: AIR_LOYALTY_PROGRAM?.CONSUMERS,
          });
        }}
      />

      <Box border={1} borderColor={'grey.700'} borderRadius={2} p={2}>
        <ApiRequestFlow
          showSkeleton={isLoading || isFetching}
          hasError={isError}
          refreshApi={refetch}
        >
          <FormProvider methods={methods}>
            <Typography variant={'h5'} mb={1}>
              Information
            </Typography>
            <Grid container spacing={2}>
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
          </FormProvider>
        </ApiRequestFlow>
      </Box>
    </>
  );
};
