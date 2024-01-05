import { Box, Grid } from '@mui/material';

import CommonDrawer from '@/components/CommonDrawer';
import AppAvatarGroup from '@/components/AvatarGroup';

import {
  FormProvider,
  RHFEditor,
  RHFMultiSearchableSelect,
  RHFSelect,
} from '@/components/ReactHookForm';

import useCallsEditorDrawer from './useCallsEditorDrawer';
import {
  dealsCallsDataArray,
  drawerButtonTitle,
  drawerTitle,
  options,
} from './CallsEditorDrawer.data';

import { avatarGroupMockData } from '@/modules/superAdmin/PlanManagement/PlanManagement.data';

import { v4 as uuidv4 } from 'uuid';

const CallsEditorDrawer = (props: any) => {
  const {
    openDrawer,
    setOpenDrawer,
    setSelectedCheckboxes,
    selectedCheckboxes,
    companyId,
  } = props;
  const { handleSubmit, onSubmit, methodsdealsCalls, EmployeeData } =
    useCallsEditorDrawer({
      openDrawer,
      setOpenDrawer,
      setSelectedCheckboxes,
      selectedCheckboxes,
      companyId,
    });

  return (
    <CommonDrawer
      isDrawerOpen={openDrawer}
      onClose={() => setOpenDrawer('')}
      title={drawerTitle[openDrawer]}
      okText={drawerButtonTitle[openDrawer]}
      isOk={true}
      footer={openDrawer === 'View' ? false : true}
      submitHandler={handleSubmit(onSubmit)}
    >
      <Box sx={{ pt: 2 }}>
        <FormProvider methods={methodsdealsCalls}>
          <Grid container spacing={5}>
            {dealsCallsDataArray(openDrawer)?.map((item: any) => (
              <Grid
                item
                xs={12}
                md={item?.md}
                key={uuidv4()}
                sx={{ paddingTop: '25px !important' }}
              >
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

            <Grid item xs={12} md={8} sx={{ paddingTop: '25px !important' }}>
              <RHFMultiSearchableSelect
                size="small"
                label="Attendees"
                name="attendee"
                options={EmployeeData}
                disabled={openDrawer === 'View'}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <AppAvatarGroup data={avatarGroupMockData} />
            </Grid>
            <Grid item xs={12} sx={{ paddingTop: '25px !important' }}>
              <RHFSelect
                name="Outcome"
                label="Outcome"
                size="small"
                disabled={openDrawer === 'View'}
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
                label="Notes"
                name="Notes"
                disabled={openDrawer === 'View'}
              />
            </Grid>
          </Grid>
        </FormProvider>
      </Box>
    </CommonDrawer>
  );
};

export default CallsEditorDrawer;
