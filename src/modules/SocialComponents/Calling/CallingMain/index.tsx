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
import { AlertModals } from '@/components/AlertModals';

import { callingData } from '@/mock/modules/SocialComponents/Calling';
import { columns } from './CallingMain.data';

import useCallingMain from './useCallingMain';

import { DownIcon, MobileIcon, PlusIcon } from '@/assets/icons';
import ScheduleCallDrawer from './ScheduleCallDrawer';
import TanstackTable from '@/components/Table/TanstackTable';

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

    anchorElAction,
    actionMenuOpenAction,
    handleClickAction,
    handleCloseAction,

    setIsDeleteModalOpen,
    isDeleteModalOpen,
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
        <Box
          mt={2}
          mb={3}
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            gap: '10px',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Search
            label={'Search here'}
            searchBy={callingSearch}
            setSearchBy={setCallingSearch}
            size="small"
          />

          <Button
            id="basic-button"
            aria-controls={actionMenuOpenAction ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={actionMenuOpenAction ? 'true' : undefined}
            onClick={handleClickAction}
            variant="outlined"
            color="inherit"
            sx={{
              '@media(max-width: 500px)': {
                width: '100%',
              },
            }}
          >
            Actions &nbsp; <DownIcon />
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={anchorElAction}
            open={actionMenuOpenAction}
            onClose={handleCloseAction}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            <MenuItem
              onClick={() => {
                setOpenDrawer('Edit'), handleCloseAction;
              }}
            >
              Edit
            </MenuItem>
            <MenuItem
              onClick={() => {
                setIsDeleteModalOpen(true), handleCloseAction;
              }}
            >
              Delete
            </MenuItem>
          </Menu>
        </Box>
      </Box>
      <TanstackTable columns={getColumns} data={callingData} isPagination />

      <ScheduleCallDrawer
        openDrawer={openDrawer}
        setOpenDrawer={setOpenDrawer}
      />

      <AlertModals
        message={'Are you sure you want to delete this entry ?'}
        type="delete"
        open={isDeleteModalOpen}
        handleClose={() => setIsDeleteModalOpen(false)}
        handleSubmit={() => setIsDeleteModalOpen(false)}
      />
    </Box>
  );
};

export default CallingMain;
