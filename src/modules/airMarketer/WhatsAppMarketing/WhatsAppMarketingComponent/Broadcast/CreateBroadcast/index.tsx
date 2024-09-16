import React, { createElement } from 'react';
import {
  Typography,
  Avatar,
  Box,
  Button,
  Grid,
  Stack,
  AvatarGroup,
  CircularProgress,
} from '@mui/material';
import { ArrowBackIcon, TimeClockIcon } from '@/assets/icons';
import { contactsColumns } from './CreateBroadcast.data';
import {
  FormProvider,
  RHFDateTimePicker,
  RHFTextField,
} from '@/components/ReactHookForm';
import { v4 as uuidv4 } from 'uuid';
import useCreateBroadcast from './useCreateBroadcast';
import { styles } from './CreateBroadcast.style';
import TanstackTable from '@/components/Table/TanstackTable';
import AddContactDrawer from './AddContactDrawer/index';
import { AIR_MARKETER } from '@/routesConstants/paths';
import { LoadingButton } from '@mui/lab';
import {
  DRAWER_TYPES,
  SMS_BROADCAST_CONSTANTS,
  STATUS_CONTANTS,
} from '@/constants/strings';
import dayjs from 'dayjs';
import SkeletonForm from '@/components/Skeletons/SkeletonForm';
import { componentMap } from '@/utils/dynamic-forms';
import { generateImage } from '@/utils/avatarUtils';
import { indexNumbers } from '@/constants';

const CreateBroadcast = () => {
  const {
    handleCloseContactsDrawer,
    templateDetailsVariables,
    setSelectedContactsData,
    broadcastDetailsLoading,
    isAddContactDrawerOpen,
    updateBroadcastLoading,
    postBroadcastLoading,
    selectedContactsData,
    flattenContactsData,
    previewAttachment,
    setSelectedRec,
    setIsSchedule,
    createStatus,
    recipientType,
    setRecipientType,
    setCreateStatus,
    handleSubmit,
    selectedRec,
    previewName,
    isSchedule,
    formFields,
    onSubmit,
    methods,
    router,
    theme,
    type,
    form,
    detailsMsg,
    getDynamicFieldsStatus,
    handleSaveAsDraft,
  } = useCreateBroadcast();

  return (
    <>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        flexWrap="wrap"
        gap={1}
        mb={3}
      >
        <Box display="flex" gap={0.5} alignItems="center">
          <Box
            onClick={() =>
              router?.push({ pathname: AIR_MARKETER?.WHATSAPP_MARKETING })
            }
            sx={{ cursor: 'pointer', lineHeight: '1', mr: '12px' }}
          >
            <ArrowBackIcon />
          </Box>
          <Typography sx={styles?.heading} variant="h3">
            {type === DRAWER_TYPES?.EDIT
              ? 'Update Broadcast'
              : 'Create Broadcast'}
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
                createStatus === STATUS_CONTANTS?.DRAFT && postBroadcastLoading
              }
            >
              Save as Draft
            </LoadingButton>
          )}
        </Box>
      </Box>

      <FormProvider methods={methods}>
        {broadcastDetailsLoading ? (
          <SkeletonForm />
        ) : (
          <Grid container spacing={3}>
            <Grid item md={7}>
              <Grid container spacing={2}>
                {formFields?.map((item: any) => {
                  return (
                    <Grid item xs={12} md={item?.md} key={item?.id}>
                      <item.component
                        disabled={
                          item?.componentProps?.name ===
                          SMS_BROADCAST_CONSTANTS?.RECIPIENTS
                            ? true
                            : false
                        }
                        {...item?.componentProps}
                        size={'small'}
                      >
                        {item?.componentProps?.select &&
                          item?.options?.map((option: any) => (
                            <option key={uuidv4()} value={option?.value}>
                              {option?.label}
                            </option>
                          ))}
                      </item.component>
                      {item?.componentProps?.name ===
                        SMS_BROADCAST_CONSTANTS?.RECIPIENTS && (
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
                                      ?.charAt(0)
                                      ?.toUpperCase()}
                                    {contact?.lastName
                                      ?.charAt(0)
                                      ?.toUpperCase()}
                                  </Typography>
                                </Avatar>
                              ));
                            })}
                          </AvatarGroup>
                        </Box>
                      )}
                      {item?.componentProps?.name === 'detail' && (
                        <Grid container spacing={2} mt={2}>
                          {templateDetailsVariables?.map((variable: any) => (
                            <Grid item xs={6} key={variable}>
                              <RHFTextField
                                name={`field_${variable}`}
                                placeholder={`Enter ${variable}`}
                                size="small"
                                fullWidth
                              />
                            </Grid>
                          ))}
                        </Grid>
                      )}
                      {item?.componentProps?.name ===
                        SMS_BROADCAST_CONSTANTS?.DETAILS &&
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
                {getDynamicFieldsStatus.isLoading ? (
                  <Box
                    display="flex"
                    justifyContent="center"
                    mt={3}
                    width="100%"
                  >
                    <CircularProgress />
                  </Box>
                ) : (
                  form?.map((item: any) => (
                    <Grid item xs={12} key={item?.id}>
                      {componentMap[item?.component] &&
                        createElement(componentMap[item?.component], {
                          ...item?.componentProps,
                          name: item?.componentProps?.label,
                          size: 'small',
                        })}
                    </Grid>
                  ))
                )}
              </Grid>
            </Grid>
            <Grid item md={5} xs={12}>
              <Typography sx={{ mb: '18px' }} variant="h4">
                Preview
              </Typography>
              <Grid container spacing={'16px'}>
                <Grid item xs={12}>
                  <Stack direction="row" alignItems="center" gap={'10px'}>
                    <Avatar alt="Remy Sharp" sx={styles?.previewAvatar}>
                      {previewName === ''
                        ? 'N/A'
                        : previewName?.charAt(0)?.toUpperCase()}
                    </Avatar>
                    <Box>
                      <Typography variant="h5" sx={styles?.previewName}>
                        {previewName === '' ? 'Broadcast Name' : previewName}
                      </Typography>
                      <Typography sx={styles?.previewTime} variant="body2">
                        Just Now
                      </Typography>
                    </Box>
                  </Stack>
                </Grid>
                <Grid item xs={12}>
                  <Box sx={styles?.previewAttachment}>
                    {previewAttachment?.name}
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Box sx={styles?.previewLabel}>Details</Box>
                  <Box sx={styles?.previewDetails}>
                    <Box dangerouslySetInnerHTML={{ __html: detailsMsg }} />
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Box sx={styles?.previewLabel}>Added Contacts</Box>
                  <Box sx={styles?.previewContacts}>
                    <TanstackTable
                      columns={contactsColumns}
                      data={flattenContactsData(selectedContactsData)}
                    />
                  </Box>
                </Grid>
              </Grid>
            </Grid>
            <Grid
              item
              md={12}
              sx={{ display: 'flex', justifyContent: 'right', gap: '10px' }}
              onMouseOver={() => {
                setCreateStatus(STATUS_CONTANTS?.COMPLETED);
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
                loading={postBroadcastLoading || updateBroadcastLoading}
                disabled={
                  selectedContactsData?.length === indexNumbers?.ZERO
                    ? true
                    : false
                }
              >
                Send Now
              </LoadingButton>
            </Grid>
          </Grid>
        )}
      </FormProvider>

      {isAddContactDrawerOpen && (
        <AddContactDrawer
          isDrawerOpen={isAddContactDrawerOpen}
          onClose={handleCloseContactsDrawer}
          selectedRec={selectedRec}
          setSelectedRec={setSelectedRec}
          setSelectedContactsData={setSelectedContactsData}
          selectedContactsData={selectedContactsData}
          setRecipientType={setRecipientType}
          recipientType={recipientType}
        />
      )}
    </>
  );
};

export default CreateBroadcast;
