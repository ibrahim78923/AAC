import {
  CallPauseIcon,
  CallResumeIcon,
  CallTransferIcon,
  CloseModalIcon,
  CloseRecordingIcon,
  KeypadCircleIcon,
  MicOffIcon,
  MicOnIcon,
  StartRecordingIcon,
} from '@/assets/icons';
import {
  FormProvider,
  RHFAutocomplete,
  RHFTextField,
} from '@/components/ReactHookForm';
import { LoadingButton } from '@mui/lab';
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Typography,
} from '@mui/material';
import CallIcon from '@mui/icons-material/Call';
import Image from 'next/image';
import { AvatarImage } from '@/assets/images';
import Search from '@/components/Search';
import Keypad from '../Keypad';
import { TransferCall } from './TransferCall';
import { usePowerDialerDialog } from './usePowerDialerDialog';

const PowerDialerDialog = (props: any) => {
  const {
    openTransferCallModal,
    setOpenTransferCallModal,
    search,
    setSearch,
    startRecording,
    setStartRecording,
    pauseCall,
    setPauseCall,
    micOn,
    setMicOn,
    method,
    onSubmit,
    powerDialerModal,
    setPowerDialerModal,
  } = usePowerDialerDialog(props);
  return (
    <>
      {powerDialerModal && (
        <Dialog
          open={powerDialerModal}
          onClose={() => setPowerDialerModal(false)}
          aria-labelledby="responsive-dialog-title"
          PaperProps={{
            style: {
              maxWidth: 922,
              width: 922,
              borderRadius: 12,
            },
          }}
        >
          <DialogTitle
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            paddingBottom={2.4}
          >
            <Typography variant="h4" color="primary?.main"></Typography>
            <Box
              onClick={() => setPowerDialerModal(false)}
              sx={{
                cursor: 'pointer',
              }}
            >
              <CloseModalIcon />
            </Box>
          </DialogTitle>
          <FormProvider
            methods={method}
            onSubmit={method?.handleSubmit(onSubmit)}
          >
            <DialogContent>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Box
                    borderRadius={2}
                    p={{ sm: 3, xs: 1 }}
                    bgcolor="primary.light"
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Grid container spacing={2}>
                      <Grid item sm={9} xs={12}>
                        <Box display="flex" gap={2} alignItems="center">
                          <IconButton
                            sx={{
                              bgcolor: 'success.main',
                              color: 'common.white',
                              height: 48,
                              width: 48,
                              '&:hover': { bgcolor: 'success.main' },
                              display: { sm: 'block', xs: 'none' },
                            }}
                          >
                            <CallIcon sx={{ fontSize: 35, rotate: '10deg' }} />
                          </IconButton>
                          <Box
                            display="flex"
                            justifyContent="space-between"
                            flexDirection="column"
                          >
                            <Typography
                              variant="body2"
                              color="common.black"
                              fontWeight={500}
                            >
                              Power Dialer in progress . . . 1/9
                            </Typography>
                            <Box display="flex" alignItems="center">
                              <Box
                                sx={{
                                  width: 24,
                                  height: 24,
                                  borderRadius: '50%',
                                }}
                              >
                                <Image
                                  src={AvatarImage}
                                  alt="Avatar"
                                  width={24}
                                  height={24}
                                />
                              </Box>
                              <Box ml={1} display="flex" flexDirection="column">
                                <Typography
                                  variant="body4"
                                  color="blue.dull_blue"
                                >
                                  Olivia Rhye
                                </Typography>
                                <Typography
                                  variant="body3"
                                  color="custom.light"
                                >
                                  Syntel
                                </Typography>
                              </Box>
                            </Box>
                          </Box>
                        </Box>
                      </Grid>
                      <Grid item sm={3} xs={12}>
                        <Box textAlign="center">
                          <Typography
                            variant="body2"
                            color="slateBlue.main"
                            fontWeight={500}
                          >
                            Total Call Duration
                          </Typography>
                          <Typography
                            variant="h5"
                            color="grey.800"
                            fontWeight={700}
                          >
                            00:00:00
                          </Typography>
                        </Box>
                      </Grid>
                    </Grid>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Grid container spacing={2} alignItems="stretch">
                    <Grid item sm={4} xs={12}>
                      <Box
                        borderRadius={2}
                        border="1px solid"
                        borderColor="grey.700"
                        height="100%"
                      >
                        <Button
                          variant="contained"
                          color="primary"
                          sx={{ fontWeight: 500, cursor: 'default' }}
                          fullWidth
                          size="small"
                          disableElevation
                          disableRipple
                        >
                          Contact Details
                        </Button>
                        <Box p={1}>
                          <Box>
                            <Typography variant="body2" color="custom.main">
                              Name
                            </Typography>
                            <Typography
                              variant="body2"
                              color="slateBlue.main"
                              fontWeight={600}
                            >
                              Johnathan
                            </Typography>
                          </Box>
                          <Box my={2}>
                            <Typography variant="body2" color="custom.main">
                              Phone Number
                            </Typography>
                            <Typography
                              variant="body2"
                              color="slateBlue.main"
                              fontWeight={600}
                            >
                              +123809 14 14 1243
                            </Typography>
                          </Box>
                          <Box>
                            <Typography variant="body2" color="custom.main">
                              Company
                            </Typography>
                            <Typography
                              variant="body2"
                              color="slateBlue.main"
                              fontWeight={600}
                            >
                              Syntel
                            </Typography>
                          </Box>
                        </Box>
                      </Box>
                    </Grid>
                    <Grid item sm={8} xs={12}>
                      <Box
                        borderRadius={2}
                        border="1px solid"
                        borderColor="grey.700"
                      >
                        <Box p={2}>
                          <RHFTextField
                            fullWidth={true}
                            size="small"
                            multiline
                            rows={4}
                            name="notes"
                            label="Call Notes"
                          />
                          <RHFAutocomplete
                            fullWidth={true}
                            size="small"
                            multiple
                            options={[
                              { label: 'Interested', value: 'Interested' },
                              {
                                label: 'Not Interested',
                                value: 'Not Interested',
                              },
                              { label: 'Left message', value: 'Left message' },
                            ]}
                            getOptionLabel={(option: any) => option?.label}
                            name="tags"
                            label="Selected Tags"
                          />
                          <Box>
                            <Box
                              display="flex"
                              justifyContent="space-between"
                              alignItems="center"
                              flexDirection={{ md: 'row', xs: 'column' }}
                              gap={1}
                            >
                              <Typography
                                variant="body2"
                                color="common.black"
                                fontWeight={500}
                              >
                                Conversation History
                              </Typography>
                              <Search
                                label="search"
                                searchBy={search}
                                setSearchBy={setSearch}
                                placeholder="Search conversation notes"
                              />
                            </Box>
                            <Box
                              height={100}
                              display="flex"
                              justifyContent="center"
                              alignItems="center"
                            >
                              {true ? (
                                <Typography
                                  variant="body2"
                                  color="grey.800"
                                  fontWeight={500}
                                >
                                  No conversation history found
                                </Typography>
                              ) : (
                                <Box></Box>
                              )}
                            </Box>
                          </Box>
                        </Box>
                        <Box
                          borderRadius={2}
                          p={1}
                          bgcolor="custom.off_white_one"
                          display="flex"
                          justifyContent="space-between"
                        >
                          <Grid container alignItems="center" spacing={3}>
                            <Grid item md={3} xs={12}>
                              <LoadingButton
                                variant="contained"
                                startIcon={
                                  startRecording ? (
                                    <CloseRecordingIcon />
                                  ) : (
                                    <StartRecordingIcon />
                                  )
                                }
                                color="primary"
                                sx={{
                                  fontWeight: 500,
                                  width: '100%',
                                  bgcolor: 'common.white',
                                  color: 'custom.main',
                                  border: '1px solid',
                                  borderColor: 'grey.0',
                                  px: 2,
                                  py: 1,
                                  '&:hover': {
                                    bgcolor: 'common.white',
                                    color: 'custom.main',
                                  },
                                }}
                                size="small"
                                onClick={() =>
                                  setStartRecording(!startRecording)
                                }
                                disableElevation
                              >
                                Record
                              </LoadingButton>
                            </Grid>
                            <Grid item md={6} xs={12}>
                              <Box
                                p={1}
                                borderRadius={8}
                                boxShadow={2}
                                bgcolor="common.white"
                                display="flex"
                                gap={{ sm: 2, xs: 1 }}
                                justifyContent="space-between"
                                alignItems="center"
                              >
                                <IconButton
                                  onClick={() => setOpenTransferCallModal(true)}
                                  sx={{
                                    bgcolor: 'primary.main',
                                    '&:hover': { bgcolor: 'primary.main' },
                                  }}
                                >
                                  <CallTransferIcon />
                                </IconButton>
                                <IconButton
                                  onClick={() => setPauseCall(!pauseCall)}
                                  sx={{
                                    bgcolor: 'common.white',
                                    p: 0,
                                    scale: '1.4',
                                  }}
                                >
                                  {!pauseCall ? (
                                    <CallPauseIcon />
                                  ) : (
                                    <CallResumeIcon />
                                  )}
                                </IconButton>
                                <IconButton
                                  onClick={() => setMicOn(!micOn)}
                                  sx={{
                                    bgcolor: 'error.light',
                                    '&:hover': { bgcolor: 'error.main' },
                                  }}
                                >
                                  {micOn ? <MicOnIcon /> : <MicOffIcon />}
                                </IconButton>
                                <Keypad>
                                  <IconButton
                                    sx={{
                                      bgcolor: 'common.white',
                                      boxShadow: '0.75px 3px 3px 0px #0000000F',
                                      border: '0.08px solid #222C3D66',
                                    }}
                                  >
                                    <KeypadCircleIcon />
                                  </IconButton>
                                </Keypad>
                              </Box>
                            </Grid>
                            <Grid item md={3} xs={12}>
                              <LoadingButton
                                variant="contained"
                                color="primary"
                                sx={{
                                  fontWeight: 500,
                                  width: '100%',
                                  bgcolor: 'error.main',
                                  px: 2,
                                  py: 1,
                                  '&:hover': {
                                    bgcolor: 'error.main',
                                  },
                                }}
                                size="small"
                                disableElevation
                              >
                                leave call
                              </LoadingButton>
                            </Grid>
                          </Grid>
                        </Box>
                      </Box>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </DialogContent>
          </FormProvider>
        </Dialog>
      )}
      <TransferCall
        openTransferCallModal={openTransferCallModal}
        closeTransferCallModal={() => setOpenTransferCallModal(false)}
      />
    </>
  );
};

export default PowerDialerDialog;
