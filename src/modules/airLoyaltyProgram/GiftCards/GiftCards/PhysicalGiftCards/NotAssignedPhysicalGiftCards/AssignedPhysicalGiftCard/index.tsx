import CommonDrawer from '@/components/CommonDrawer';

import { Box, Grid } from '@mui/material';
import { FormProvider } from '@/components/ReactHookForm';
import { useAssignedPhysicalGiftCard } from './useAssignedPhysicalGiftCard';

export const AssignedPhysicalGiftCard = (props: any) => {
  const { isPortalOpen } = props;
  const {
    handleSubmit,
    assignedPhysicalGiftCard,
    methods,
    closeAssignedForm,
    assignedPhysicalGiftCardFormFields,
  } = useAssignedPhysicalGiftCard(props);
  return (
    <Box>
      <CommonDrawer
        isDrawerOpen={isPortalOpen?.isAssigned}
        onClose={closeAssignedForm}
        title={'Assigned To'}
        okText={'Assign'}
        isOk
        cancelText={'Cancel'}
        footer
        submitHandler={handleSubmit(assignedPhysicalGiftCard)}
      >
        <Box>
          <FormProvider methods={methods}>
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
