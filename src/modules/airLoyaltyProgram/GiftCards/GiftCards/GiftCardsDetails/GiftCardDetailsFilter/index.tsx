import CommonDrawer from '@/components/CommonDrawer';
import { Box, Grid } from '@mui/material';
import { giftCardDetailsFilterFromFields } from './GiftCardDetailsFilter.data';
import { FormProvider } from '@/components/ReactHookForm';
import { useGiftCardDetailsFilter } from './useGiftCardDetailsFilter';

export const GiftCardDetailsFilter = (props: any) => {
  const { openFilter } = props;
  const { onSubmit, handleCloseDrawer, methods, handleSubmit } =
    useGiftCardDetailsFilter(props);
  return (
    <Box>
      <CommonDrawer
        isDrawerOpen={openFilter}
        onClose={handleCloseDrawer}
        title={'Add Filters'}
        okText={'Apply'}
        isOk
        cancelText={'Cancel'}
        footer
        submitHandler={handleSubmit(onSubmit)}
      >
        <Box>
          <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
              {giftCardDetailsFilterFromFields?.map((item: any) => (
                <Grid item xs={12} key={item?.id}>
                  <item.component {...item?.componentProps} size={'small'} />
                </Grid>
              ))}
            </Grid>
          </FormProvider>
        </Box>
      </CommonDrawer>
    </Box>
  );
};
