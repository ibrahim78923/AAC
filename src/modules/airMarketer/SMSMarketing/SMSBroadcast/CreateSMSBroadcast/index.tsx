import { Box, Button, Grid, Typography } from '@mui/material';
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
import { yupResolver } from '@hookform/resolvers/yup';
import DateRangeIcon from '@mui/icons-material/DateRange';
import TanstackTable from '@/components/Table/TanstackTable';

const CreateSMSBroadcast = (props: any) => {
  const { setIsCreateSmsBroadcast } = props;

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
                  </Grid>
                );
              })}
            </Grid>
          </Grid>
          <Grid item md={6}>
            <Typography variant="h4">Preview</Typography>
            <Typography variant="h6">Details</Typography>
            <Typography variant="h6">Added Contacts</Typography>
            <Box>
              <TanstackTable columns={contactsColumns} data={contactDetails} />
            </Box>
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

export default CreateSMSBroadcast;
