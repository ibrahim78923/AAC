import { Grid, MenuItem } from '@mui/material';
import { FormProvider } from '@/components/ReactHookForm';
import { ScheduleModals } from '@/components/ScheduleModals';
import { AssignModalData } from './AssignModal.data';
import { v4 as uuidv4 } from 'uuid';

const AssignModalBox = (props: any) => {
  const { open, onClose, contactOwnerData, methods, handleSubmit, loading } =
    props;
  const formField = AssignModalData(contactOwnerData);

  return (
    <ScheduleModals
      type={'assign'}
      open={open}
      handleClose={onClose}
      handleSubmit={handleSubmit}
      submitButonText={'Update'}
      isFooter
      loading={loading}
    >
      <FormProvider methods={methods}>
        <Grid container spacing={2}>
          {formField?.map((obj: any) => (
            <Grid item xs={12} key={uuidv4()}>
              <obj.component
                fullWidth
                size={'small'}
                SelectProps={{ sx: { borderRadius: '8px' } }}
                {...obj?.componentProps}
              >
                {obj?.componentProps?.select
                  ? obj?.options?.map((option: any) => (
                      <MenuItem key={uuidv4()} value={option?.value}>
                        {option?.label}
                      </MenuItem>
                    ))
                  : null}
              </obj.component>
            </Grid>
          ))}
        </Grid>
      </FormProvider>
    </ScheduleModals>
  );
};

export default AssignModalBox;
