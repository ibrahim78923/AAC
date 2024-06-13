import { Grid } from '@mui/material';
import { FormProvider } from '@/components/ReactHookForm';
import { ScheduleModals } from '@/components/ScheduleModals';
import { AssignModalData } from './AssignModal.data';
import useAuth from '@/hooks/useAuth';
import { useLazyGetOrganizationUsersQuery } from '@/services/dropdowns';

const AssignModalBox = (props: any) => {
  const { open, onClose, methods, handleSubmit, loading } = props;
  const { user }: any = useAuth();
  const orgId = user?.organization?._id;
  const contactOwnerData = useLazyGetOrganizationUsersQuery();
  const formField = AssignModalData(contactOwnerData, orgId);

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
