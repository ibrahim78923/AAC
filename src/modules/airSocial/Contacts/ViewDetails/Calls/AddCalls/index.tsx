import { Box, Grid } from '@mui/material';

import CommonDrawer from '@/components/CommonDrawer';
import AppAvatarGroup from '@/components/AvatarGroup';

import {
  FormProvider,
  RHFEditor,
  RHFMultiSearchableSelect,
  RHFSelect,
} from '@/components/ReactHookForm';

import { addCallFormData } from './AddCalls.data';

import { avatarGroupMockData } from '@/modules/superAdmin/PlanManagement/PlanManagement.data';
import { options } from './AddCalls.data';

const AddCall = (props: any) => {
  const { openDrawer, onClose, methods, onSubmit, employeeList, contactsList } =
    props;
  const formFields = addCallFormData(employeeList);

  return (
    <div>
      <CommonDrawer
        isDrawerOpen={openDrawer}
        onClose={onClose}
        title={'Add Call'}
        okText={'Save'}
        isOk={true}
        footer={true}
        submitHandler={onSubmit}
      >
        <Box sx={{ pt: 2 }}>
          <FormProvider methods={methods}>
            <Grid container spacing={'22px'}>
              {formFields?.map((item: any) => (
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

              <Grid item xs={12} md={8}>
                <RHFMultiSearchableSelect
                  size="small"
                  label="Attendees"
                  name="assignee"
                  options={contactsList}
                  required={true}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <AppAvatarGroup data={avatarGroupMockData} />
              </Grid>
              <Grid item xs={12}>
                <RHFSelect name="outcome" label="Outcome" size="small">
                  {options?.map((option: any) => (
                    <option key={option?.value} value={option?.value}>
                      {option?.label}
                    </option>
                  ))}
                </RHFSelect>
              </Grid>
              <Grid item xs={12}>
                <RHFEditor label="Meeting Notes" name="note" required />
              </Grid>
            </Grid>
          </FormProvider>
        </Box>
      </CommonDrawer>
    </div>
  );
};

export default AddCall;
