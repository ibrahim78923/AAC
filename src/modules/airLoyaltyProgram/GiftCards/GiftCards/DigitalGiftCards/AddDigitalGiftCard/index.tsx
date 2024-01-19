import CommonDrawer from '@/components/CommonDrawer';

import { Box, Grid } from '@mui/material';
import { FormProvider } from '@/components/ReactHookForm';
import { useAddDigitalGiftCard } from './useAddDigitalGiftCard';
import { addDigitalGiftCardFormFields } from './AddDigitalGiftCard.data';
export const AddDigitalGiftCard = (props: any) => {
  const { addDigitalCard } = props;
  const { handleSubmit, onSubmit, methods, handleCloseDrawer } =
    useAddDigitalGiftCard(props);
  return (
    <Box>
      <CommonDrawer
        isDrawerOpen={addDigitalCard}
        onClose={handleCloseDrawer}
        title={'Add Digital Card'}
        okText={'Create'}
        isOk
        cancelText={'Cancel'}
        footer
        submitHandler={handleSubmit(onSubmit)}
      >
        <Box>
          <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
              {addDigitalGiftCardFormFields?.map((item: any) => (
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
