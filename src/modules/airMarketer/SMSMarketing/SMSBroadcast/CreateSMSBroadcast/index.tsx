import {
  Avatar,
  AvatarGroup,
  Box,
  Button,
  FormLabel,
  Grid,
  InputAdornment,
  Stack,
  TextareaAutosize,
  Typography,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {
  contactDetails,
  contactsColumns,
  createBroadcast,
} from './CreateSMSBroadcast.data';
import { v4 as uuidv4 } from 'uuid';
import { FormProvider } from '@/components/ReactHookForm';
import TanstackTable from '@/components/Table/TanstackTable';
import DateRangeIcon from '@mui/icons-material/DateRange';
import { BookMarkIcon, PlusSharedColorIcon } from '@/assets/icons';
import useCreateSMSBroadcast from './useCreateSMSBroadcast';
import AddContactDrawer from './AddContactDrawer';
import { AIR_MARKETER } from '@/routesConstants/paths';

const CreateSMSBroadcast = () => {
  const {
    theme,
    isAddContactDrawerOpen,
    setIsAddContactDrawerOpen,
    type,
    onSubmit,
    handleSubmit,
    methods,
    navigate,
    textAreaVal,
    setTextAreaVal,
  } = useCreateSMSBroadcast();

  return (
    <>
      <Stack direction={{ sm: 'row' }} justifyContent="space-between">
        <Box
          alignItems="center"
          gap={1}
          sx={{ display: { md: 'flex' }, zIndex: 99, position: 'relative' }}
        >
          <ArrowBackIcon
            sx={{ cursor: 'pointer' }}
            onClick={() => {
              navigate.push(AIR_MARKETER?.SMS_MARKETING);
            }}
          />
          <Typography variant="h3">
            {type === 'add' ? 'Create ' : 'Edit '}SMS Broadcast
          </Typography>
        </Box>
        <Box>
          {type !== 'add' && (
            <Button variant="outlined" color="inherit" className="small">
              Save as Draft
            </Button>
          )}
        </Box>
      </Stack>

      <FormProvider methods={methods}>
        <Grid container spacing={3}>
          <Grid item md={6}>
            <Grid container spacing={2} mt={1}>
              {createBroadcast?.map((item: any) => {
                return (
                  <Grid item xs={12} md={item?.md} key={uuidv4()}>
                    {item?.componentProps?.name === 'recipients' && (
                      <Box position="relative">
                        <InputAdornment
                          sx={{
                            position: 'absolute',
                            top: 48,
                            right: 15,
                            zIndex: 9999,
                          }}
                          position="end"
                        >
                          <Box
                            sx={{
                              display: 'flex',
                              gap: '10px',
                              alignItems: 'center',
                            }}
                          >
                            <Box
                              sx={{ cursor: 'pointer' }}
                              onClick={() => setIsAddContactDrawerOpen(true)}
                            >
                              <PlusSharedColorIcon
                                color={theme?.palette?.primary?.main}
                              />
                            </Box>
                          </Box>
                        </InputAdornment>
                      </Box>
                    )}

                    <item.component {...item.componentProps} size={'small'}>
                      {item?.componentProps?.select &&
                        item?.options?.map((option: any) => (
                          <option key={uuidv4()} value={option?.value}>
                            <Typography variant="body2">
                              {option?.label}
                            </Typography>
                          </option>
                        ))}
                    </item.component>

                    {item?.componentProps?.name === 'recipients' && (
                      <Box sx={{ display: 'flex' }}>
                        <AvatarGroup
                          max={4}
                          sx={{
                            '& .MuiAvatar-root': {
                              background: theme?.palette?.primary?.main,
                              height: '30px',
                              width: '30px',
                              fontSize: '12px',
                            },
                          }}
                        >
                          <Avatar alt="recipient_avatar" src="" />
                        </AvatarGroup>
                      </Box>
                    )}
                  </Grid>
                );
              })}
              <Grid item xs={12}>
                <FormLabel sx={{ color: theme?.palette?.common?.black }}>
                  Details
                </FormLabel>
                <TextareaAutosize
                  required
                  name="details"
                  onChange={(e: any) => {
                    setTextAreaVal(e?.target?.value);
                  }}
                  placeholder="Type"
                  minRows={10}
                  style={{
                    width: '100%',
                    padding: '16px',
                    borderRadius: '8px',
                  }}
                />
              </Grid>
            </Grid>
          </Grid>

          <Grid item md={6} xs={12}>
            <Typography variant="h4">Preview</Typography>
            <Grid container sx={{ p: 1 }}>
              <Grid item xs={12} my={1}>
                <Stack direction="row" alignItems="center" gap={1}>
                  <Avatar />
                  <Box>
                    <Typography
                      variant="body1"
                      fontWeight={700}
                      sx={{
                        color: theme?.palette?.custom?.text_slate_blue,
                        fontSize: '15px',
                      }}
                    >
                      Compaign Name
                    </Typography>
                    <Typography
                      variant="body2"
                      fontWeight={500}
                      sx={{ fontSize: '13px' }}
                    >
                      Just Now
                    </Typography>
                  </Box>
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body2" fontWeight={600}>
                  Details
                </Typography>
                <TextareaAutosize
                  disabled
                  value={textAreaVal}
                  minRows={10}
                  style={{
                    width: '100%',
                    padding: '16px',
                    border: `1px solid ${theme?.palette?.custom?.off_white_three}`,
                    borderRadius: '8px',
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body2" fontWeight={600}>
                  Added Contacts
                </Typography>
                <Box
                  sx={{
                    border: `1px solid ${theme?.palette?.custom?.off_white_three}`,
                    borderRadius: '8px',
                    padding: '10px',
                  }}
                >
                  <TanstackTable
                    columns={contactsColumns}
                    data={contactDetails}
                  />
                </Box>
              </Grid>
            </Grid>
          </Grid>

          <Grid
            item
            lg={12}
            sx={{
              display: { xs: 'flex' },
              flexDirection: { sm: 'row', xs: 'column' },
              justifyContent: 'right',
              gap: '10px',
              width: '100%',
            }}
          >
            {type !== 'add' && (
              <Button
                className="small"
                variant="outlined"
                sx={{ background: theme?.palette?.primary?.light }}
                startIcon={<BookMarkIcon />}
              >
                Save as Template
              </Button>
            )}
            <Button
              variant="outlined"
              color="inherit"
              className="small"
              startIcon={<DateRangeIcon />}
            >
              Schedule
            </Button>
            <Button
              variant="contained"
              className="small"
              onClick={handleSubmit(onSubmit)}
            >
              Send Now
            </Button>
          </Grid>
        </Grid>
      </FormProvider>

      {isAddContactDrawerOpen && (
        <AddContactDrawer
          isDrawerOpen={isAddContactDrawerOpen}
          onClose={() => setIsAddContactDrawerOpen(false)}
        />
      )}
    </>
  );
};

export default CreateSMSBroadcast;
