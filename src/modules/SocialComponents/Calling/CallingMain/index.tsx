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

import Search from '@/components/Search';
import TanstackTable from '@/components/Tabel/TanstackTable';

import { callingData } from '@/mock/modules/SocialComponents/Calling';
import { columns } from './CallingMain.data';

import useCallingMain from './useCallingMain';

import { DownIcon, MobileIcon, PlusSharedIcon } from '@/assets/icons';
import ScheduleCallDrawer from './ScheduleCallDrawer';

const CallingMain = ({ setAddaNumber }: any) => {
  const {
    callingSearch,
    setCallingSearch,
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

  const getColumns = columns();
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
          <Box sx={{ display: 'flex', gap: '10px' }}>
            {callingData.length > 0 ? (
              <>
                <Button
                  variant="text"
                  sx={{ background: theme.palette.primary.light }}
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
                  <PlusSharedIcon />
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
        <Box
          mt={2}
          mb={3}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Search
            label={'Search here'}
            searchBy={callingSearch}
            setSearchBy={setCallingSearch}
            width="100%"
          />
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
            }}
          ></Box>
        </Box>
      </Box>
      <TanstackTable columns={getColumns} data={callingData} />

      <ScheduleCallDrawer
        openDrawer={openDrawer}
        setOpenDrawer={setOpenDrawer}
      />
    </Box>
  );
};

export default CallingMain;
