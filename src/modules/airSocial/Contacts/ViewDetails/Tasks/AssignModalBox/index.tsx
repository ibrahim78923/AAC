import { Grid } from '@mui/material';
import { FormProvider } from '@/components/ReactHookForm';
import { ScheduleModals } from '@/components/ScheduleModals';
import { assignModalData } from './AssignModal.data';
import useAssignModal from './useAssignModal';

const AssignModalBox = (props: any) => {
  const { open, onClose, data, setSelectedRow } = props;

  const {
    orgId,
    methods,
    usersData,
    handleSubmitReassign,
    loadingReAssignTask,
  } = useAssignModal(data, onClose, setSelectedRow);

  const formField = assignModalData(usersData, orgId);

  return (
    <ScheduleModals
      type={'assign'}
      open={open}
      handleClose={onClose}
      handleSubmit={handleSubmitReassign}
      submitButonText={'Update'}
      isFooter
      loading={loadingReAssignTask}
    >
      <FormProvider methods={methods}>
        <Grid container spacing={2}>
          {formField?.map((item: any) => (
            <Grid item xs={12} md={item?.md} key={item?.id}>
              <item.component {...item?.componentProps} size={'small'}>
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
