import React from 'react';

import { Box, Button, Grid, InputAdornment, Typography } from '@mui/material';

import { FormProvider } from '@/components/ReactHookForm';

import {
  profileDefaultValues,
  profileFields,
  profileValidationSchema,
} from './UserDetailsProfile.data';

import { useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';

import { v4 as uuidv4 } from 'uuid';
import useToggle from '@/hooks/useToggle';
import { EditInputIcon, RevertIcon } from '@/assets/icons';

const UserDetailsProfile = () => {
  const [isToggled, setIsToggled] = useToggle(false);

  const methods: any = useForm({
    resolver: yupResolver(profileValidationSchema),
    defaultValues: profileDefaultValues,
  });

  const { handleSubmit } = methods;

  const onSubmit = async () => {
    alert('profile');
  };

  return (
    <FormProvider methods={methods}>
      <Typography variant="h5">Personal Details</Typography>
      <Grid container spacing={1} sx={{ mt: '5px' }}>
        {profileFields?.map((item: any) => {
          return (
            <Grid item xs={12} md={item?.md} key={uuidv4()}>
              {item?.componentProps?.heading && (
                <Typography variant="h5">
                  {item?.componentProps?.heading}
                </Typography>
              )}
              {/* for address fileds */}
              {item?.componentProps?.name === 'address' && (
                <Box
                  sx={{
                    position: 'relative',
                  }}
                >
                  <InputAdornment
                    sx={{
                      position: 'absolute',
                      top: 45,
                      right: 15,
                      zIndex: 99,
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
                        onClick={() => setIsToggled(false)}
                      >
                        <RevertIcon />
                      </Box>
                      <Box
                        onClick={() => setIsToggled(true)}
                        sx={{ cursor: 'pointer', fontSize: '20px' }}
                      >
                        <EditInputIcon />
                      </Box>
                    </Box>
                  </InputAdornment>
                </Box>
              )}
              {!item?.toShow?.includes('address') && (
                <item.component {...item?.componentProps} size={'small'}>
                  {item?.componentProps?.select &&
                    item?.options?.map((option: any) => (
                      <option key={uuidv4()} value={option?.value}>
                        {option?.label}
                      </option>
                    ))}
                </item.component>
              )}
              {isToggled && item?.toShow?.includes('address') && (
                <item.component {...item.componentProps} size={'small'}>
                  {item?.componentProps?.select &&
                    item?.options?.map((option: any) => (
                      <option key={uuidv4()} value={option?.value}>
                        {option?.label}
                      </option>
                    ))}
                </item.component>
              )}
            </Grid>
          );
        })}
      </Grid>
      <Grid
        item
        lg={12}
        sx={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', my: 2 }}
      >
        <Button variant="outlined" color="inherit">
          Cancel
        </Button>
        <Button variant="contained" onClick={handleSubmit(onSubmit)}>
          Save
        </Button>
      </Grid>
    </FormProvider>
  );
};

export default UserDetailsProfile;
