import React from 'react';

import Link from 'next/link';

import {
  Box,
  Button,
  Menu,
  MenuItem,
  Typography,
  useTheme,
} from '@mui/material';

import { callingData } from '@/mock/modules/SocialComponents/Calling';
import useCallingMain from './useCallingMain';

import { DownIcon, MobileIcon, PlusIcon } from '@/assets/icons';
import HorizontalTabs from '@/components/Tabs/HorizontalTabs';
import ScheduleCalls from './ScheduleCalls/ScheduleCalls';
import ScheduleEditorDrawer from './ScheduleCallDrawer';

const CallsTabsData = ['Calls', 'Schedule Calls'];

const CallingMain = ({ setAddaNumber }: any) => {
  const {
    openDrawer,
    setOpenDrawer,
    anchorElCallNow,
    handleClickCallNow,
    handleCloseCallNow,
    anchorElScheduleCall,
    handleClickScheduleCall,
    handleCloseScheduleCall,
    setAnchorElScheduleCall,
  } = useCallingMain();

  const theme = useTheme();
  return (
    <Box
      sx={{
        borderRadius: '15px',
        border: '1px solid #EAECF0',
      }}
    >
      <Box sx={{ padding: '16px 24px' }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '19px',
            flexWrap: 'wrap',
            gap: '10px',
          }}
        >
          <Typography variant="h3" sx={{ fontWeight: '600' }}>
            Calling
          </Typography>
          <Box
            sx={{
              display: 'flex',
              gap: '10px',
              flexDirection: { xs: 'column', md: 'row' },
              '@media(max-width: 500px)': {
                width: '100%',
              },
            }}
          >
            {callingData?.length > 0 ? (
              <>
                <Button
                  variant="text"
                  sx={{ background: theme?.palette?.primary?.light }}
                  aria-controls="simple-menu"
                  aria-haspopup="true"
                  onClick={handleClickCallNow}
                >
                  <MobileIcon /> &nbsp; Make a call now &nbsp;{' '}
                  <DownIcon color={'#38CAB5'} />
                </Button>
                <Menu
                  id="simple-menu"
                  anchorEl={anchorElCallNow}
                  keepMounted
                  open={Boolean(anchorElCallNow)}
                  onClose={handleCloseCallNow}
                >
                  <Link href={'/social-components/calling/call'}>
                    <MenuItem>For Web</MenuItem>
                  </Link>
                  <MenuItem>For Mobile</MenuItem>
                </Menu>

                <Button
                  variant="contained"
                  aria-controls="schedule-a-call"
                  aria-haspopup="true"
                  onClick={handleClickScheduleCall}
                >
                  Schedule a call &nbsp;
                  <PlusIcon />
                </Button>
                <Menu
                  id="schedule-a-call"
                  anchorEl={anchorElScheduleCall}
                  keepMounted
                  open={Boolean(anchorElScheduleCall)}
                  onClose={handleCloseScheduleCall}
                >
                  <MenuItem
                    onClick={() => {
                      setOpenDrawer('Add'), setAnchorElScheduleCall(null);
                    }}
                  >
                    For Web
                  </MenuItem>
                  <MenuItem>For Mobile</MenuItem>
                </Menu>
              </>
            ) : (
              <Button variant="contained" onClick={() => setAddaNumber(true)}>
                <MobileIcon /> &nbsp; Connect a Number
              </Button>
            )}
          </Box>
        </Box>
      </Box>

      <HorizontalTabs tabsDataArray={CallsTabsData}>
        <ScheduleCalls />
        <ScheduleCalls />
      </HorizontalTabs>

      <ScheduleEditorDrawer
        openDrawer={openDrawer}
        setOpenDrawer={setOpenDrawer}
      />
    </Box>
  );
};

export default CallingMain;
