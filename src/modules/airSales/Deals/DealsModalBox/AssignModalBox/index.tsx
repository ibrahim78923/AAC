import { Grid, MenuItem } from '@mui/material';
import { FormProvider } from '@/components/ReactHookForm';
import { ScheduleModals } from '@/components/ScheduleModals';
import { v4 as uuidv4 } from 'uuid';
import { RestoreModalData } from './RestoreAssign.data';
import useRestoreAssign from './useRestoreAssign';
import { AssignModalBoxProps } from '../DealsModalBox-interface';

const AssignModalBox = ({
  open,
  onClose,
  seletedId,
  setSelectedRows,
}: AssignModalBoxProps) => {
  const { handleSubmit, onSubmit, methods, UserListData, loadingUpdateOwner } =
    useRestoreAssign(seletedId, onClose, setSelectedRows);

  return (
    <ScheduleModals
      type={'assign'}
      open={open}
      handleClose={onClose}
      handleSubmit={handleSubmit(onSubmit)}
      submitButonText={'Update'}
      isFooter
      loading={loadingUpdateOwner}
    >
      <FormProvider methods={methods}>
        <Grid container spacing={2}>
          {RestoreModalData(UserListData)?.map((obj: any) => (
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
