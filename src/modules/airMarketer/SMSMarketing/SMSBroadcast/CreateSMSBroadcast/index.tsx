import { Box, Button, Grid, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {
  createBroadcast,
  defaultValues,
  validationSchema,
} from './CreateSMSBroadcast.data';
import { v4 as uuidv4 } from 'uuid';
import { useForm } from 'react-hook-form';
import { FormProvider } from '@/components/ReactHookForm';
import { yupResolver } from '@hookform/resolvers/yup';

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
      <Box alignItems="center" gap={1} sx={{ display: { md: 'flex' } }}>
        <ArrowBackIcon
          sx={{ cursor: 'pointer' }}
          onClick={() => {
            setIsCreateSmsBroadcast(false);
          }}
        />
        <Typography variant="h4">Create SMS Broadcast</Typography>
      </Box>

      <FormProvider methods={methods}>
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
        <Grid sx={{ display: 'flex', justifyContent: 'right', gap: '10px' }}>
          <Button variant="contained">Schedule</Button>
          <Button variant="contained" onClick={handleSubmit(onSubmit)}>
            Send Now
          </Button>
        </Grid>
      </FormProvider>
    </>
  );
};

export default CreateSMSBroadcast;
