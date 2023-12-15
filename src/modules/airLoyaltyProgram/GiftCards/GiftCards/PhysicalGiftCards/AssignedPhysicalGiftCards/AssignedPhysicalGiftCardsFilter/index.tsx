import { Grid } from '@mui/material';
import { FormProvider } from '@/components/ReactHookForm';
import CommonDrawer from '@/components/CommonDrawer';

import { useAssignedPhysicalGiftCardsFilter } from './useAssignedPhysicalGiftCardsFilter';
import { assignedPhysicalGiftFilterDataArray } from './AssignedPhysicalGiftCardsFilter.data';

export const AssignedPhysicalGiftCardsFilter = (props: any) => {
  const { isDrawerOpen } = props;
  const { methods, onSubmit, handleClose } =
    useAssignedPhysicalGiftCardsFilter(props);
  return (
    <>
      <CommonDrawer
        isDrawerOpen={isDrawerOpen}
        onClose={handleClose}
        okText={'Apply'}
        title={'Add Filter'}
        submitHandler={onSubmit}
        isOk={true}
        cancelText={'cancel'}
        footer
      >
        <FormProvider methods={methods}>
          <Grid container spacing={2} mt={-1}>
            {assignedPhysicalGiftFilterDataArray?.map((form: any) => (
              <Grid item xs={12} md={form?.gridLength} key={form?.id}>
                <form.component {...form?.componentProps} size="small" />
              </Grid>
            ))}
          </Grid>
        </FormProvider>
      </CommonDrawer>
    </>
  );
};
