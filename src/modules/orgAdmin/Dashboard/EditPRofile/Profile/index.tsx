import { useForm } from 'react-hook-form';

import { Grid, Button, Divider, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { FormProvider } from '@/components/ReactHookForm';
import { yupResolver } from '@hookform/resolvers/yup';

import {
  editProfileDataArray,
  editProfileDefaultValues,
  editProfileValidationSchema,
} from './Profile.data';
import useDashboard from '../../useDashboard';

import { v4 as uuidv4 } from 'uuid';

const Profile = () => {
  const { theme } = useDashboard();
  const methodsCreateNewTicketForm = useForm({
    resolver: yupResolver(editProfileValidationSchema),
    defaultValues: editProfileDefaultValues,
  });

  const onSubmit = () => {};

  const { handleSubmit } = methodsCreateNewTicketForm;

  return (
    <Box>
      <FormProvider
        methods={methodsCreateNewTicketForm}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Grid container spacing={3}>
          {editProfileDataArray()?.map((item: any) => (
            <Grid item xs={12} md={item?.md} key={uuidv4()}>
              {item?.componentProps?.heading && (
                <Typography variant="h5">
                  {item?.componentProps?.heading}
                </Typography>
              )}
              <item.component {...item?.componentProps} size={'small'}>
                {item?.componentProps?.select
                  ? item?.options?.map((option: any) => (
                      <option key={option?.value} value={option?.value}>
                        <Typography sx={{ color: theme?.palette?.grey[600] }}>
                          {option?.label}
                        </Typography>
                      </option>
                    ))
                  : null}
              </item.component>
            </Grid>
          ))}
        </Grid>
        <Divider sx={{ marginTop: '30px' }} />

        <Box sx={{ display: 'flex', justifyContent: 'end', marginTop: '30px' }}>
          <Button
            sx={{
              marginRight: '15px',
              backgroundColor: theme?.palette?.grey[400],
              color: theme?.palette?.custom['main'],
              borderRadius: '4px',
            }}
          >
            Cancel
          </Button>
          <Button type="submit" variant="contained">
            Save
          </Button>
        </Box>
      </FormProvider>
    </Box>
  );
};

export default Profile;
