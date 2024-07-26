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
} from './CallsEditorDrawer.data';

import { avatarGroupMockData } from '@/modules/superAdmin/PlanManagement/PlanManagement.data';
import { options } from '../../Emails/EmailEditorDrawer/EmailEditorDrawer.data';

import { AttendeeAvatarImage } from '@/assets/images';

import { v4 as uuidv4 } from 'uuid';

const CallsEditorDrawer = (props: any) => {
  const { openDrawer, setOpenDrawer } = props;
  const { handleSubmit, onSubmit, methodsdealsCalls } = useCallsEditorDrawer();

  return (
    <div>
      <CommonDrawer
        isDrawerOpen={openDrawer}
        onClose={() => setOpenDrawer('')}
        title={drawerTitle[openDrawer]}
        okText={drawerButtonTitle[openDrawer]}
        isOk={true}
        footer={openDrawer === 'View' ? false : true}
      >
        <Box sx={{ pt: 2 }}>
          <FormProvider
            methods={methodsdealsCalls}
            onSubmit={handleSubmit(onSubmit)}
          >
            <Grid container spacing={5}>
              {dealsCallsDataArray?.map((item: any) => (
                <Grid item xs={12} md={item?.md} key={uuidv4()}>
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
                  name="attendee"
                  options={[
                    {
                      value: 'Guy Hawkins',
                      label: 'Guy Hawkins',
                      image: AttendeeAvatarImage,
                    },
                    {
                      value: 'Jacob Jones',
                      label: 'Jacob Jones',
                      image: AttendeeAvatarImage,
                    },
                    {
                      value: 'Courtney Henry',
                      label: 'Courtney Henry',
                      image: AttendeeAvatarImage,
                    },
                  ]}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <AppAvatarGroup data={avatarGroupMockData} />
              </Grid>
              <Grid item xs={12}>
                <RHFSelect name="template" label="Template" size="small">
                  {options?.map((option: any) => (
                    <option key={uuidv4()} value={option?.value}>
                      {option?.label}
                    </option>
                  ))}
                </RHFSelect>
              </Grid>
              <Grid item xs={12}>
                <RHFEditor label="Meeting Notes" name="meeeting_notes" />
              </Grid>
            </Grid>
          </FormProvider>
        </Box>
      </CommonDrawer>
    </div>
  );
};

export default CallsEditorDrawer;
