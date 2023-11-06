import React from 'react';

import {
  Box,
  Button,
  FormControlLabel,
  Grid,
  Switch,
  Typography,
  useTheme,
} from '@mui/material';

import CommonDrawer from '@/components/CommonDrawer';

import {
  FormProvider,
  RHFEditor,
  RHFMultiSearchableSelect,
  RHFSelect,
} from '@/components/ReactHookForm';

import {
  dealsCallsDataArray,
  drawerButtonTitle,
  drawerTitle,
} from './MeetingsEditorDrawer.data';

import useMeetingsEditorDrawer from './useMeetingsEditorDrawer';
import { AttendeeAvatarImage } from '@/assets/images';
import { options } from '../../Emails/EmailEditorDrawer/EmailEditorDrawer.data';
import AppAvatarGroup from '@/components/AvatarGroup';
import { avatarGroupMockData } from '@/modules/superAdmin/PlanManagement/PlanManagement.data';

import { MircosoftTeamsIcon, ZoomIcon } from '@/assets/icons';

import { v4 as uuidv4 } from 'uuid';

const MeetingsEditorDrawer = (props: any) => {
  const theme = useTheme();
  const { openDrawer, setOpenDrawer } = props;
  const { handleSubmit, onSubmit, methodsdealsCalls } =
    useMeetingsEditorDrawer();

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
            <Grid container spacing={4}>
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
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Switch defaultChecked />}
                  label="All Day"
                />
              </Grid>

              <Grid item xs={12}>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    gap: 1.5,
                  }}
                >
                  <Typography
                    variant="body2"
                    sx={{ color: theme?.palette?.grey[600] }}
                  >
                    Add Video Conferencing
                  </Typography>

                  <Box
                    sx={{
                      gap: 1,
                      display: 'flex',
                      flexDirection: { xs: 'column', sm: 'row' },
                    }}
                  >
                    <Button
                      variant="outlined"
                      sx={{ color: 'grey', gap: 0.5 }}
                      className="small"
                    >
                      <ZoomIcon />{' '}
                      <Typography variant="body2">Connect Zoom</Typography>
                    </Button>

                    <Button
                      variant="outlined"
                      sx={{ color: 'grey', gap: 0.5 }}
                      className="small"
                    >
                      <MircosoftTeamsIcon />
                      <Typography variant="body2">Connect Teams</Typography>
                    </Button>
                  </Box>
                </Box>
              </Grid>

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

export default MeetingsEditorDrawer;
