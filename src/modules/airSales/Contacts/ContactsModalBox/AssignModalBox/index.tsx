import { Grid, MenuItem } from '@mui/material';

import { useForm } from 'react-hook-form';

import { FormProvider } from '@/components/ReactHookForm';
import { ScheduleModals } from '@/components/ScheduleModals';

import { AssignModalData, defaultValues } from './AssignModal.data';
import { v4 as uuidv4 } from 'uuid';

const AssignModalBox = ({ open, onClose }: any) => {
  const methods: any = useForm({
    defaultValues: defaultValues,
  });
  const { handleSubmit } = methods;
  const onSubmit = () => {};
  return (
    <ScheduleModals
      type={'assign'}
      open={open}
      handleClose={onClose}
      handleSubmit={handleSubmit(onSubmit)}
      submitButonText={'Update'}
      isFooter
    >
      <FormProvider methods={methods}>
        <Grid container spacing={2}>
          {AssignModalData?.map((obj: any) => (
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
