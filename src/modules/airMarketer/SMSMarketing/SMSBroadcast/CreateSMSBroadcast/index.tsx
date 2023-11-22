import {
  Avatar,
  AvatarGroup,
  Box,
  Button,
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
  defaultValues,
  validationSchema,
} from './CreateSMSBroadcast.data';
import { v4 as uuidv4 } from 'uuid';
import { useForm } from 'react-hook-form';
import { FormProvider } from '@/components/ReactHookForm';
import TanstackTable from '@/components/Table/TanstackTable';
import { yupResolver } from '@hookform/resolvers/yup';
import DateRangeIcon from '@mui/icons-material/DateRange';
import { PlusSharedColorIcon } from '@/assets/icons';
import useCreateSMSBroadcast from './useCreateSMSBroadcast';
import AddContactsDrawer from './AddContactsDrawer';

const CreateSMSBroadcast = (props: any) => {
  const { setIsCreateSmsBroadcast } = props;

  const { theme, isAddRecipients, setIsAddRecipients } =
    useCreateSMSBroadcast();

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
      <Box
        alignItems="center"
        gap={1}
        sx={{ display: { md: 'flex' }, zIndex: 99, position: 'relative' }}
      >
        <ArrowBackIcon
          sx={{ cursor: 'pointer' }}
          onClick={() => {
            setIsCreateSmsBroadcast(false);
          }}
        />
        <Typography variant="h4">Create SMS Broadcast</Typography>
      </Box>
      <FormProvider methods={methods}>
        <Grid container spacing={3}>
          <Grid item md={6}>
            <Grid container spacing={2} mt={1}>
              {createBroadcast?.map((item: any) => {
                return (
                  <Grid item xs={12} md={item?.md} key={uuidv4()}>
                    <item.component {...item.componentProps} size={'small'}>
                      {item?.componentProps?.select &&
                        item?.options?.map((option: any) => (
                          <option key={uuidv4()} value={option?.value}>
                            {option?.label}
                          </option>
                        ))}
                    </item.component>
                    {item?.componentProps?.name === 'recipients' && (
                      <Box sx={{ position: 'relative', cursor: 'pointer' }}>
                        <InputAdornment
                          sx={{
                            position: 'absolute',
                            top: -30,
                            right: 15,
                            zIndex: 99,
                          }}
                          onClick={() => {
                            setIsAddRecipients(true);
                          }}
                          position="end"
                        >
                          <PlusSharedColorIcon
                            color={theme?.palette?.primary?.main}
                          />
                        </InputAdornment>
                        <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                          <AvatarGroup max={4}>
                            <Avatar alt="avatar" src="" />
                            <Avatar alt="avatar" src="" />
                            <Avatar alt="avatar" src="" />
                            <Avatar alt="avatar" src="" />
                            <Avatar alt="avatar" src="" />
                          </AvatarGroup>
                        </Box>
                      </Box>
                    )}
                  </Grid>
                );
              })}
            </Grid>
          </Grid>
          <Grid item md={6} xs={12}>
            <Typography variant="h4">Preview</Typography>
            <Grid container sx={{ p: 1 }}>
              <Grid item xs={12}>
                <Stack direction="row" alignItems="center" gap={1}>
                  <Avatar />
                  <Box>
                    <Typography variant="h5" sx={{ color: '#405893' }}>
                      Compaign Name
                    </Typography>
                    <Typography variant="body2">Just Now</Typography>
                  </Box>
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h6">Details</Typography>
                <TextareaAutosize
                  style={{
                    width: '100%',
                    height: '203px',
                    padding: '16px',
                    border: '1px solid #EAECF0',
                    borderRadius: '8px',
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h6">Added Contacts</Typography>
                <Box
                  sx={{
                    border: '1px solid #EAECF0',
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
      {isAddRecipients && (
        <AddContactsDrawer
          isDrawerOpen={isAddRecipients}
          onClose={() => setIsAddRecipients(false)}
        />
      )}
    </>
  );
};

export default CreateSMSBroadcast;
