import { Grid, MenuItem } from '@mui/material';
import { FormProvider } from '@/components/ReactHookForm';
import CommonDrawer from '@/components/CommonDrawer';

import { FilterData } from './ContactsFilterDrawer.data';
import { v4 as uuidv4 } from 'uuid';
import { useGetOrganizationUsersQuery } from '@/services/dropdowns';
import useAuth from '@/hooks/useAuth';
import {
  useGetLifeCycleQuery,
  useGetContactsStatusQuery,
} from '@/services/commonFeatures/contacts';

const ContactsFilterDrawer = ({ open, onClose, onSubmit, methods }: any) => {
  const { user }: any = useAuth();
  const { data: dataOrgUsers } = useGetOrganizationUsersQuery(
    user?.organization?._id,
  );
  const { data: dataLifeCycle } = useGetLifeCycleQuery({});
  const { data: dataContactStatus } = useGetContactsStatusQuery({});

  const contactOwners = dataOrgUsers ? dataOrgUsers?.data?.users : [];
  const lifeCycleStages = dataLifeCycle
    ? dataLifeCycle?.data?.lifecycleStages
    : [];
  const contactStatuses = dataContactStatus
    ? dataContactStatus?.data?.conatactStatus
    : [];
  const formFields = FilterData(
    contactOwners,
    lifeCycleStages,
    contactStatuses,
  );

  return (
    <CommonDrawer
      isDrawerOpen={open}
      onClose={onClose}
      footer
      isOk
      okText="Apply"
      title="Filter"
      submitHandler={onSubmit}
    >
      <FormProvider methods={methods}>
        <Grid container spacing={1}>
          {formFields?.map((obj) => (
            <Grid item xs={12} key={uuidv4()}>
              <obj.component
                fullWidth
                size={'small'}
                SelectProps={{ sx: { borderRadius: '8px' } }}
                {...obj?.componentProps}
              >
                {obj?.componentProps?.select
                  ? obj.options?.map((option: any) => (
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
    </CommonDrawer>
  );
};

export default ContactsFilterDrawer;
