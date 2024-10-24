import { Grid } from '@mui/material';
import { FormProvider } from '@/components/ReactHookForm';
import { ScheduleModals } from '@/components/ScheduleModals';
import { RestoreModalData } from './RestoreAssign.data';
import useRestoreAssign from './useRestoreAssign';
import { AssignModalBoxProps } from '../DealsModalBox-interface';

const AssignModalBox = ({
  open,
  onClose,
  seletedId,
  setSelectedRows,
}: AssignModalBoxProps) => {
  const { handleSubmit, onSubmit, methods, loadingUpdateOwner } =
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
          {RestoreModalData()?.map((item: any) => (
            <Grid item xs={12} md={item?.md} key={item?.componentProps?.name}>
              <item.component {...item.componentProps} size={'small'}>
                {item?.componentProps?.select
                  ? item?.options?.map((option: any) => (
                      <option key={option?.value} value={option?.value}>
                        {option?.label}
                      </option>
                    ))
                  : null}
              </item.component>
            </Grid>
          ))}
        </Grid>
      </FormProvider>
    </ScheduleModals>
  );
};

export default AssignModalBox;
