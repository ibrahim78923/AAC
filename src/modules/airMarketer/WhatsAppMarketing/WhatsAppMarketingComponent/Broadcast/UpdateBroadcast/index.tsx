import React from 'react';
import {
  Typography,
  Avatar,
  Box,
  Button,
  Grid,
  InputAdornment,
  Stack,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import { ArrowBackIcon, PlusSharedColorIcon } from '@/assets/icons';
import DateRangeIcon from '@mui/icons-material/DateRange';
import {
  contactDetails,
  contactsColumns,
  createBroadcastFields,
  defaultValues,
  validationSchema,
} from './CreateBroadcast.data';
import { FormProvider } from '@/components/ReactHookForm';
import { v4 as uuidv4 } from 'uuid';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import useCreateBroadcast from './useCreateBroadcast';
import { styles } from './CreateBroadcast.style';
import TanstackTable from '@/components/Table/TanstackTable';

const UpdateBroadcast = () => {
  const router = useRouter();
  const { theme, setIsAddContactDrawerOpen } = useCreateBroadcast();

  const methods: any = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: defaultValues,
  });

  const { handleSubmit, reset } = methods;

  const onSubmit = async () => {
    reset();
  };

  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: '27px' }}>
        <Box
          onClick={() => router.push('/air-marketer/whatsapp-marketing')}
          sx={{ cursor: 'pointer', lineHeight: '1', mr: '12px' }}
        >
          <ArrowBackIcon />
        </Box>
        <Typography sx={styles.heading} variant="h3">
          Update Broadcast
        </Typography>
      </Box>

      <FormProvider methods={methods}>
        <Grid container spacing={3}>
          <Grid item md={7}>
            <Grid container spacing={2}>
              {createBroadcastFields?.map((item: any) => {
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
                            {option?.label}
                          </option>
                        ))}
                    </item.component>
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
                    src="/broken-image.jpg"
                    sx={styles.previewAvatar}
                  >
                    AB
                  </Avatar>
                  <Box>
                    <Typography variant="h5" sx={styles.previewName}>
                      Broadcast Name
                    </Typography>
                    <Typography sx={styles.previewTime} variant="body2">
                      Just Now
                    </Typography>
                  </Box>
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <Box sx={styles.previewAttachment}></Box>
              </Grid>
              <Grid item xs={12}>
                <Box sx={styles.previewLabel}>Details</Box>
                <Box sx={styles.previewDetails}></Box>
              </Grid>
              <Grid item xs={12}>
                <Box sx={styles.previewLabel}>Added Contacts</Box>
                <Box sx={styles.previewContacts}>
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
            md={12}
            sx={{ display: 'flex', justifyContent: 'right', gap: '10px' }}
          >
            <Button variant="outlined" startIcon={<DateRangeIcon />}>
              Schedule
            </Button>
            <Button variant="contained" onClick={handleSubmit(onSubmit)}>
              Send Now
            </Button>
          </Grid>
        </Grid>
      </FormProvider>
    </>
  );
};

export default UpdateBroadcast;
