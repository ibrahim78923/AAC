import CommonDrawer from '@/components/CommonDrawer';

import { Box, Grid } from '@mui/material';
import { FormProvider } from '@/components/ReactHookForm';
import { addPhysicalGiftCardFormFields } from './AddPhysicalGiftCard.data';
import { useAddPhysicalGiftCard } from './useAddPhysicalGiftCard';
export const AddPhysicalGiftCard = (props: any) => {
  const { addPhysicalCard } = props;
  const { handleSubmit, onSubmit, methods, handleCloseDrawer } =
    useAddPhysicalGiftCard(props);
  return (
    <Box>
      <CommonDrawer
        isDrawerOpen={addPhysicalCard}
        onClose={handleCloseDrawer}
        title={'Add Physical Card'}
        okText={'Create'}
        isOk
        cancelText={'Cancel'}
        footer
        submitHandler={handleSubmit(onSubmit)}
      >
        <Box>
          <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
              {addPhysicalGiftCardFormFields?.map((item: any) => (
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
