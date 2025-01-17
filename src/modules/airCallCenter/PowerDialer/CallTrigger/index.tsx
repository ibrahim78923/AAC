import React from 'react';
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  Popover,
  Typography,
} from '@mui/material';
import CallIcon from '@mui/icons-material/Call';
import { SingleDropdownButton } from '@/components/Buttons/SingleDropdownButton';
import { callFromDropDown, recentCallsData } from './CallTrigger.data';
import { LoadingButton } from '@mui/lab';
import Search from '@/components/Search';
import { UKFlagImage } from '@/assets/images';
import Image from 'next/image';
import Keypad from '../Keypad';
import { KeypadIcon } from '@/assets/icons';
import { useCallTrigger } from './useCallTrigger';
import PowerDialerDialog from '../PowerDialerDialog';

const CallTrigger = () => {
  const {
    anchorEl,
    buttonName,
    setButtonName,
    search,
    setSearch,
    handleClick,
    handleClose,
    open,
    id,
    startPowerDialerModal,
    setStartPowerDialerModal,
  } = useCallTrigger();

  return (
    <>
      <IconButton
        sx={{
          position: 'fixed',
          bottom: '5%',
          right: '4%',
          bgcolor: 'success.main',
          color: 'common.white',
          '&:hover': { bgcolor: 'success.main' },
        }}
        onClick={handleClick}
      >
        <CallIcon sx={{ fontSize: 40, rotate: '-10deg' }} />
      </IconButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
      >
        <Box width={343}>
          <Box bgcolor="primary.main">
            <SingleDropdownButton
              dropdownOptions={callFromDropDown(setButtonName)}
              dropdownName={`From : ${buttonName}`}
              variant="contained"
              color="primary"
              component={LoadingButton}
              loading={false}
              sx={{
                bgcolor: 'primary.main',
                color: 'common.white',
                fontSize: 20,
                width: '100%',
                fontWeight: 500,
                justifyContent: 'flex-start',
              }}
              disableElevation
            />
          </Box>
          <Box
            mb={2}
            sx={{
              '& .MuiTextField-root': {
                '& fieldset': {
                  borderRadius: '0',
                },
                '&:hover fieldset': {
                  borderColor: 'grey.700',
                  boxShadow: `0px 0px 0px 3px transparent`,
                },
              },
            }}
          >
            <Search
              label="search"
              searchBy={search}
              setSearchBy={setSearch}
              width="100%"
              InputProps={{
                endAdornment: <InputAdornment position="end"></InputAdornment>,
                startAdornment: (
                  <InputAdornment position="start">
                    <Image
                      width={30}
                      height={30}
                      src={UKFlagImage}
                      alt="UK Flag"
                    />
                  </InputAdornment>
                ),
              }}
              placeholder="Type a name or number here"
            />
          </Box>
          <Box px={2} mt={2}>
            <Button
              variant="contained"
              color="primary"
              sx={{ fontWeight: 500, cursor: 'default' }}
              fullWidth
              size="small"
              disableElevation
              disableRipple
            >
              Recent Calls
            </Button>
          </Box>
          <Box my={2} maxHeight={350} overflow="auto">
            {recentCallsData.map((call) => (
              <Box
                key={call.id}
                mt={1}
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                mx={1}
                borderBottom="1px solid"
                borderColor="grey.700"
                sx={{ cursor: 'pointer' }}
                onClick={() => setStartPowerDialerModal(true)}
              >
                <Box display="flex" alignItems="center" mb={1}>
                  <Box sx={{ width: 40, height: 40, borderRadius: '50%' }}>
                    <Image
                      src={call.avatar}
                      alt="Avatar"
                      width={40}
                      height={40}
                    />
                  </Box>
                  <Box ml={1} display="flex" flexDirection="column">
                    <Typography variant="body4" color="blue.dull_blue">
                      {call.name}
                    </Typography>
                    <Typography variant="body3" color="custom.light">
                      {call.phoneNumber}
                    </Typography>
                  </Box>
                </Box>
                <Box>
                  <Typography variant="body4" color="custom.main">
                    {call.time}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>
          <Box px={2} my={2}>
            <Keypad setStartPowerDialerModal={setStartPowerDialerModal}>
              <Box display="flex" flexDirection="column" alignItems="center">
                <IconButton>
                  <KeypadIcon />
                </IconButton>
                <Typography
                  sx={{ cursor: 'pointer' }}
                  variant="body4"
                  color="grey.900"
                >
                  Keypad
                </Typography>
              </Box>
            </Keypad>
          </Box>
        </Box>
      </Popover>
      <PowerDialerDialog
        powerDialerModal={startPowerDialerModal}
        setPowerDialerModal={setStartPowerDialerModal}
      />
    </>
  );
};

export default CallTrigger;
