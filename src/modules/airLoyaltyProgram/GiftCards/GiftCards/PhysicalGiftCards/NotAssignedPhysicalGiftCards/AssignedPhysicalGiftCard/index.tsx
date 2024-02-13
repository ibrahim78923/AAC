import CommonDrawer from '@/components/CommonDrawer';

import { Box, Grid } from '@mui/material';
import { FormProvider } from '@/components/ReactHookForm';
import { useAssignedPhysicalGiftCard } from './useAssignedPhysicalGiftCard';
import { assignedPhysicalGiftCardFormFields } from './AssignedPhysicalGiftCard.data';
export const AssignedPhysicalGiftCard = (props: any) => {
  const { assignedTo } = props;
  const { handleSubmit, onSubmit, methods, handleCloseDrawer } =
    useAssignedPhysicalGiftCard(props);
  return (
    <Box>
      <CommonDrawer
        isDrawerOpen={assignedTo}
        onClose={handleCloseDrawer}
        title={'Assigned To'}
        okText={'Assign'}
        isOk
        cancelText={'Cancel'}
        footer
        submitHandler={handleSubmit(onSubmit)}
      >
        <Box>
          <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
              {assignedPhysicalGiftCardFormFields?.map((item: any) => (
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
