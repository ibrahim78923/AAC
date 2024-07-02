import React from 'react';
import {
  Typography,
  Avatar,
  Box,
  Button,
  Grid,
  Stack,
  AvatarGroup,
} from '@mui/material';
import { useRouter } from 'next/router';
import { ArrowBackIcon } from '@/assets/icons';
import DateRangeIcon from '@mui/icons-material/DateRange';
import { contactsColumns, createBroadcastFields } from './CreateBroadcast.data';
import { FormProvider } from '@/components/ReactHookForm';
import { v4 as uuidv4 } from 'uuid';
import useCreateBroadcast from './useCreateBroadcast';
import { styles } from './CreateBroadcast.style';
import TanstackTable from '@/components/Table/TanstackTable';
import AddContactDrawer from './AddContactDrawer/index';
import { AIR_MARKETER } from '@/routesConstants/paths';
import { AvatarImage } from '@/assets/images';
import { LoadingButton } from '@mui/lab';
import {
  DRAWER_TYPES,
  SMS_BROADCAST_CONSTANTS,
  SMS_MARKETING_CONSTANTS,
} from '@/constants/strings';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDateTimePicker } from '@mui/x-date-pickers/StaticDateTimePicker';
import { DATE_TIME_FORMAT } from '@/constants';
import dayjs from 'dayjs';

const CreateBroadcast = () => {
  const router = useRouter();
  const {
    handleCloseContactsDrawer,
    handleOpenContactsDrawer,
    setSelectedContactsData,
    isAddContactDrawerOpen,
    updateBroadcastLoading,
    postBroadcastLoading,
    selectedContactsData,
    flattenContactsData,
    setSelectedDateVal,
    setSelectedRec,
    setIsSchedule,
    handleSubmit,
    selectedRec,
    isSchedule,
    onSubmit,
    methods,
    theme,
    type,
  } = useCreateBroadcast();
  const { watch } = methods;
  const previewName = watch(SMS_MARKETING_CONSTANTS?.NAME);
  const previewDetail = watch(SMS_MARKETING_CONSTANTS?.DETAIL);
  const previewAttachment = watch(SMS_MARKETING_CONSTANTS?.ATTACHMENT);
  const formFields = createBroadcastFields(handleOpenContactsDrawer);

  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: '27px' }}>
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
            ? ' Update Broadcast'
            : 'Create Broadcast'}
        </Typography>
      </Box>

      <FormProvider methods={methods}>
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
                                src=""
                              >
                                <Typography variant="body3" fontWeight={500}>
                                  {contact?.firstName?.charAt(0)?.toUpperCase()}
                                  {contact?.lastName?.charAt(0)?.toUpperCase()}
                                </Typography>
                              </Avatar>
                            ));
                          })}
                        </AvatarGroup>
                      </Box>
                    )}
                  </Grid>
                );
              })}
            </Grid>
          </Grid>
          <Grid item md={5} xs={12}>
            <Typography sx={{ mb: '18px' }} variant="h4">
              Preview
            </Typography>
            <Grid container spacing={'16px'}>
              <Grid item xs={12}>
                <Stack direction="row" alignItems="center" gap={'10px'}>
                  <Avatar
                    alt="Remy Sharp"
                    src={AvatarImage?.src}
                    sx={styles?.previewAvatar}
                  >
                    AB
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
                  <Box dangerouslySetInnerHTML={{ __html: previewDetail }} />
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Box sx={styles?.previewLabel}>Added Contacts</Box>
                <Box sx={styles?.previewContacts}>
                  <TanstackTable
                    columns={contactsColumns}
                    // data={contactDetails}
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
          >
            <Box sx={styles?.buttonPicker}>
              <Button
                variant="outlined"
                color="inherit"
                className="small"
                onClick={() => {
                  setIsSchedule(!isSchedule);
                }}
                startIcon={<DateRangeIcon />}
              >
                Schedule
              </Button>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                {isSchedule && (
                  <Box sx={styles?.datePickerWrapper}>
                    <StaticDateTimePicker
                      defaultValue={dayjs()}
                      onAccept={(date: any) => {
                        setIsSchedule(false);
                        setSelectedDateVal(
                          dayjs(date)?.format(DATE_TIME_FORMAT?.YYMMDD),
                        );
                      }}
                      onClose={() => {
                        setIsSchedule(false);
                      }}
                    />
                  </Box>
                )}
              </LocalizationProvider>
            </Box>
            <LoadingButton
              variant="contained"
              className="small"
              onClick={handleSubmit(onSubmit)}
              loading={
                // createStatus === STATUS_CONTANTS?.COMPLETED &&
                postBroadcastLoading || updateBroadcastLoading
              }
            >
              Send Now
            </LoadingButton>
          </Grid>
        </Grid>
      </FormProvider>

      {isAddContactDrawerOpen && (
        <AddContactDrawer
          isDrawerOpen={isAddContactDrawerOpen}
          onClose={handleCloseContactsDrawer}
          selectedRec={selectedRec}
          setSelectedRec={setSelectedRec}
          setSelectedContactsData={setSelectedContactsData}
        />
      )}
    </>
  );
};

export default CreateBroadcast;
