import { Box, Grid } from '@mui/material';

import CommonDrawer from '@/components/CommonDrawer';
import AppAvatarGroup from '@/components/AvatarGroup';

import {
  FormProvider,
  RHFEditor,
  RHFMultiSearchableSelect,
  RHFSelect,
} from '@/components/ReactHookForm';

import { avatarGroupMockData } from '@/modules/superAdmin/PlanManagement/PlanManagement.data';

import { v4 as uuidv4 } from 'uuid';
import {
  dealsCallsDataArray,
  drawerButtonTitle,
  drawerTitle,
} from './ScheduleCallDrawer.data';
import { options } from '@/modules/airSales/Contacts/ViewDetails/Emails/EmailEditorDrawer/EmailEditorDrawer.data';
import useScheduleEditorDrawer from './useScheduleEditorDrawer';

const ScheduleEditorDrawer = (props: any) => {
  const {
    openDrawer,
    setOpenDrawer,
    selectedCheckboxes,
    setSelectedCheckboxes,
  } = props;
  const {
    handleSubmit,
    onSubmit,
    methodsdealsCalls,
    EmployeeData,
    DealsListData,
  } = useScheduleEditorDrawer({
    selectedCheckboxes,
    openDrawer,
    setOpenDrawer,
    setSelectedCheckboxes,
  });

  return (
    <div>
      <CommonDrawer
        isDrawerOpen={openDrawer}
        onClose={() => setOpenDrawer('')}
        title={drawerTitle[openDrawer]}
        okText={drawerButtonTitle[openDrawer]}
        isOk={true}
        submitHandler={handleSubmit(onSubmit)}
        footer={openDrawer === 'View' ? false : true}
      >
        <Box sx={{ pt: 2 }}>
          <FormProvider
            methods={methodsdealsCalls}
            onSubmit={handleSubmit(onSubmit)}
          >
            <Grid container spacing={2}>
              {dealsCallsDataArray({ DealsListData, openDrawer })?.map(
                (item: any) => (
                  <Grid item xs={12} md={item?.md} key={uuidv4()}>
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
                ),
              )}

              <Grid item xs={12} md={8}>
                <RHFMultiSearchableSelect
                  size="small"
                  label="Attendees"
                  name="attendees"
                  disabled={openDrawer === 'Reschedule'}
                  options={EmployeeData}
                  placeholder="Select Option"
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <Box sx={{ pt: 2.6 }}>
                  <AppAvatarGroup data={avatarGroupMockData} />
                </Box>
              </Grid>
              <Grid item xs={12}>
                <RHFSelect
                  name="outcome"
                  label="Outcomes"
                  disabled={openDrawer === 'Reschedule'}
                  size="small"
                >
                  {options?.map((option: any) => (
                    <option key={uuidv4()} value={option?.value}>
                      {option?.label}
                    </option>
                  ))}
                </RHFSelect>
              </Grid>
              <Grid item xs={12}>
                <RHFEditor
                  label="Calling Notes"
                  name="callNotes"
                  disabled={openDrawer === 'Reschedule'}
                />
              </Grid>
            </Grid>
          </FormProvider>
        </Box>
      </CommonDrawer>
    </div>
  );
};

export default ScheduleEditorDrawer;
