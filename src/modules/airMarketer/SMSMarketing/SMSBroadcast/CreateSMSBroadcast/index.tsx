import {
  Avatar,
  AvatarGroup,
  Box,
  Button,
  Grid,
  InputAdornment,
  Skeleton,
  Stack,
  Typography,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { contactsColumns, createBroadcast } from './CreateSMSBroadcast.data';
import { FormProvider, RHFDateTimePicker } from '@/components/ReactHookForm';
import TanstackTable from '@/components/Table/TanstackTable';
import { PlusSharedColorIcon, TimeClockIcon } from '@/assets/icons';
import useCreateSMSBroadcast from './useCreateSMSBroadcast';
import AddContactDrawer from './AddContactDrawer';
import { AIR_MARKETER } from '@/routesConstants/paths';
import {
  ARRAY_INDEX,
  DRAWER_TYPES,
  SMS_BROADCAST_CONSTANTS,
  STATUS_CONTANTS,
} from '@/constants/strings';
import { v4 as uuidv4 } from 'uuid';
import { LoadingButton } from '@mui/lab';
import { styles } from './CreateSMSBroadcast.style';
import dayjs from 'dayjs';
import { componentMap } from '@/utils/dynamic-forms';
import { createElement } from 'react';
import { API_STATUS } from '@/constants';
import { generateImage } from '@/utils/avatarUtils';

const CreateSMSBroadcast = () => {
  const {
    setIsAddContactDrawerOpen,
    setSelectedContactsData,
    updateBroadcastLoading,
    isAddContactDrawerOpen,
    postBroadcastLoading,
    selectedContactsData,
    flattenContactsData,
    smsBroadcastLoading,
    handleSaveAsDraft,
    setCreateStatus,
    setSelectedRec,
    broadcastName,
    recipientType,
    setRecipientType,
    setIsSchedule,
    handleSubmit,
    createStatus,
    selectedRec,
    detailsText,
    isSchedule,
    onSubmit,
    navigate,
    methods,
    theme,
    type,
    form,
    getDynamicFieldsStatus,
  } = useCreateSMSBroadcast();

  return (
    <>
      <FormProvider methods={methods}>
        <Stack direction={{ sm: 'row' }} justifyContent="space-between">
          <Box
            alignItems="center"
            gap={1}
            sx={{ display: { md: 'flex' }, zIndex: 99, position: 'relative' }}
          >
            <ArrowBackIcon
              sx={{ cursor: 'pointer' }}
              onClick={() => {
                navigate?.push(AIR_MARKETER?.SMS_MARKETING);
              }}
            />
            <Typography variant="h3">
              {type === DRAWER_TYPES?.ADD ? 'Create ' : 'Edit '}SMS Broadcast
            </Typography>
          </Box>
          <Box
            onMouseOver={() => {
              setCreateStatus(STATUS_CONTANTS?.DRAFT);
            }}
          >
            {type === DRAWER_TYPES?.ADD && (
              <LoadingButton
                variant="outlined"
                color="inherit"
                className="small"
                onClick={handleSaveAsDraft}
                loading={
                  createStatus === STATUS_CONTANTS?.DRAFT &&
                  postBroadcastLoading
                }
              >
                Save as Draft
              </LoadingButton>
            )}
          </Box>
        </Stack>
        <Grid container spacing={3}>
          <Grid item md={6}>
            <Grid container spacing={2} mt={1}>
              {createBroadcast()?.map((item: any) => {
                return (
                  <Grid
                    item
                    xs={12}
                    md={item?.md}
                    key={item?.componentProps?.name}
                  >
                    {item?.componentProps?.name ===
                      SMS_BROADCAST_CONSTANTS?.RECIPIENTS &&
                      !smsBroadcastLoading && (
                        <Box
                          position="relative"
                          onClick={() => setIsAddContactDrawerOpen(true)}
                        >
                          <InputAdornment
                            sx={{
                              position: 'absolute',
                              top: 53,
                              right: 10,
                              zIndex: 1,
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
                              <Box sx={{ cursor: 'pointer' }}>
                                <PlusSharedColorIcon
                                  color={theme?.palette?.primary?.main}
                                />
                              </Box>
                            </Box>
                          </InputAdornment>
                        </Box>
                      )}

                    {smsBroadcastLoading ? (
                      <Skeleton
                        variant="rectangular"
                        height={48}
                        animation={'wave'}
                      />
                    ) : (
                      <item.component
                        disabled={
                          item.componentProps?.name ===
                          SMS_BROADCAST_CONSTANTS?.RECIPIENTS
                            ? true
                            : false
                        }
                        {...item.componentProps}
                        size={'small'}
                      >
                        {item?.componentProps?.select &&
                          item?.options?.map((option: any) => (
                            <option
                              key={item?.componentProps?.name}
                              value={option?.value}
                            >
                              <Typography variant="body2">
                                {option?.label}
                              </Typography>
                            </option>
                          ))}
                      </item.component>
                    )}
                    {item?.componentProps?.name ===
                      SMS_BROADCAST_CONSTANTS?.RECIPIENTS &&
                      !smsBroadcastLoading && (
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
                              position: 'end',
                            }}
                          >
                            {selectedContactsData?.map((item: any) => {
                              const contacts = item?.contacts || [item];
                              return contacts?.map((contact: any) => (
                                <Avatar
                                  key={uuidv4()}
                                  alt="recipient_avatar"
                                  src={generateImage(
                                    contact?.profilePicture?.url || 'N/A',
                                  )}
                                >
                                  <Typography variant="body3" fontWeight={500}>
                                    {contact?.firstName
                                      ?.charAt(ARRAY_INDEX?.ZERO)
                                      ?.toUpperCase()}
                                    {contact?.lastName
                                      ?.charAt(ARRAY_INDEX?.ZERO)
                                      ?.toUpperCase()}
                                  </Typography>
                                </Avatar>
                              ));
                            })}
                          </AvatarGroup>
                        </Box>
                      )}
                    {item?.componentProps?.name ===
                      SMS_BROADCAST_CONSTANTS?.RECIPIENTS &&
                      isSchedule && (
                        <Box sx={{ mt: 2 }}>
                          <RHFDateTimePicker
                            name="schedualDate"
                            label="Select Date and Time"
                            fullWidth
                            size="small"
                            disablePast
                            required
                            minDateTime={dayjs()}
                          />
                        </Box>
                      )}
                  </Grid>
                );
              })}

              {getDynamicFieldsStatus?.status === API_STATUS?.PENDING ? (
                <>
                  <Grid item xs={12}>
                    <Skeleton
                      variant="rounded"
                      sx={{ width: '100%', height: '45px' }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Skeleton
                      variant="rounded"
                      sx={{ width: '100%', height: '45px' }}
                    />
                  </Grid>
                </>
              ) : (
                <>
                  {form?.map((item: any) => (
                    <Grid item xs={12} key={item?.id}>
                      {componentMap[item?.component] &&
                        createElement(componentMap[item?.component], {
                          ...item?.componentProps,
                          name: item?.componentProps?.label,
                          size: 'small',
                        })}
                    </Grid>
                  ))}
                </>
              )}
            </Grid>
          </Grid>

          <Grid item md={6} xs={12}>
            <Typography variant="h4">Preview</Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} my={1}>
                <Stack direction="row" alignItems="center" gap={1}>
                  <Avatar alt="Remy Sharp">
                    {broadcastName?.title === ''
                      ? 'N/A'
                      : broadcastName?.title?.charAt(0)?.toUpperCase()}
                  </Avatar>
                  <Box>
                    <Typography
                      variant="body1"
                      fontWeight={700}
                      sx={{
                        color: theme?.palette?.custom?.text_slate_blue,
                        fontSize: '15px',
                        width: '500px',
                        wordWrap: 'wrap',
                      }}
                    >
                      {broadcastName === ''
                        ? 'Broadcast Name'
                        : broadcastName?.title
                          ? broadcastName?.title
                          : broadcastName}
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
                <Typography variant="body2" fontWeight={600} sx={{ pb: 1 }}>
                  Details
                </Typography>
                <Box sx={styles?.previewDetails}>
                  <Box dangerouslySetInnerHTML={{ __html: detailsText }} />
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body2" fontWeight={600} sx={{ pb: 1 }}>
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
                    data={flattenContactsData(selectedContactsData)}
                    isLoading={smsBroadcastLoading}
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
            <Button
              variant="outlined"
              color="inherit"
              className="small"
              onClick={() => {
                setIsSchedule(!isSchedule);
              }}
              startIcon={<TimeClockIcon />}
            >
              {isSchedule ? 'Send Now' : 'Send Later'}
            </Button>
            <LoadingButton
              variant="contained"
              className="small"
              onClick={handleSubmit(onSubmit)}
              disabled={selectedRec?.length === 0 ? true : false}
              loading={
                createStatus === STATUS_CONTANTS?.COMPLETED &&
                (postBroadcastLoading || updateBroadcastLoading)
              }
            >
              {isSchedule ? 'Send Later' : 'Send Now'}
            </LoadingButton>
          </Grid>
        </Grid>
      </FormProvider>

      {isAddContactDrawerOpen && (
        <AddContactDrawer
          isDrawerOpen={isAddContactDrawerOpen}
          onClose={() => setIsAddContactDrawerOpen(false)}
          selectedRec={selectedRec}
          setSelectedRec={setSelectedRec}
          setSelectedContactsData={setSelectedContactsData}
          setRecipientType={setRecipientType}
          recipientType={recipientType}
        />
      )}
    </>
  );
};

export default CreateSMSBroadcast;
