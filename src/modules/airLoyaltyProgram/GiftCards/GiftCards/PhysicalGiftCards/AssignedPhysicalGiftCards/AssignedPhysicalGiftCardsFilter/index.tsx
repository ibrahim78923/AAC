import { Grid } from '@mui/material';
import { FormProvider } from '@/components/ReactHookForm';
import CommonDrawer from '@/components/CommonDrawer';

import { useAssignedPhysicalGiftCardsFilter } from './useAssignedPhysicalGiftCardsFilter';
import { assignedPhysicalGiftFilterDataArray } from './AssignedPhysicalGiftCardsFilter.data';

export const AssignedPhysicalGiftCardsFilter = (props: any) => {
  const { isPortalOpen } = props;
  const {
    methods,
    handleSubmit,
    submitFilter,
    closeFilterForm,
    resetFilterForm,
  } = useAssignedPhysicalGiftCardsFilter(props);

  return (
    <>
      <CommonDrawer
        isDrawerOpen={isPortalOpen?.isFilter}
        onClose={() => closeFilterForm?.()}
        okText={'Apply'}
        title={'Add Filter'}
        submitHandler={handleSubmit(submitFilter)}
        isOk
        cancelText={'Reset'}
        footer
        cancelBtnHandler={() => resetFilterForm()}
      >
        <FormProvider methods={methods}>
          <Grid container spacing={2}>
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
