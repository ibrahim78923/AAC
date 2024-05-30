import { AddWhiteBgIcon, CallIcon } from '@/assets/icons';
import { Box, Button, Grid, Typography } from '@mui/material';
import CreatePowerDialerModal from './CreatePowerDialer';
import CallTrigger from './CallTrigger';
import { PowerDialerList } from './PowerDialerList';
import { usePowerDialer } from './usePowerDialer';

const PowerDialer = () => {
  const { theme, powerDialerModal, setPowerDialerModal } = usePowerDialer();
  return (
    <>
      {false ? (
        <Grid container height="70vh">
          <Grid
            item
            xs={12}
            height="100%"
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              flexDirection="column"
            >
              <Box
                borderRadius={2}
                bgcolor={'primary.light'}
                p={1.5}
                px={2}
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                <Box sx={{ '& svg': { scale: '1.8' } }}>
                  <CallIcon color={theme?.palette?.primary?.main} />
                </Box>
              </Box>
              <Box mt={1}>
                <Typography variant="h2" color="grey.800" fontWeight={600}>
                  Create Power Dialer List
                </Typography>
              </Box>
              <Box mt={1} mb={1}>
                <Typography
                  variant="h4"
                  color="custom.main"
                  fontWeight={500}
                  textAlign="center"
                >
                  Start by creating your desired power dialer list by
                  <br /> adding contacts from contacts page
                </Typography>
              </Box>
              <Button
                variant="contained"
                color="primary"
                onClick={() => setPowerDialerModal(true)}
                startIcon={<AddWhiteBgIcon />}
                disableElevation
              >
                add contact
              </Button>
            </Box>
          </Grid>
        </Grid>
      ) : (
        <>
          <PowerDialerList />
          <CallTrigger />
        </>
      )}
      <CreatePowerDialerModal
        powerDialerModal={powerDialerModal}
        setPowerDialerModal={setPowerDialerModal}
      />
    </>
  );
};

export default PowerDialer;
