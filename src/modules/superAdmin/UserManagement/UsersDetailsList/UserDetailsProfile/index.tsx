import { Box, Button, Grid, InputAdornment, Typography } from '@mui/material';

import { FormProvider } from '@/components/ReactHookForm';

import {
  profileFields,
  profileValidationSchema,
} from './UserDetailsProfile.data';

import { useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';
import BorderColorIcon from '@mui/icons-material/BorderColor';

import { v4 as uuidv4 } from 'uuid';
import useToggle from '@/hooks/useToggle';
import { EraserIcon } from '@/assets/icons';

const UserDetailsProfile = (props: any) => {
  const { userDetails } = props;
  const [isToggled, setIsToggled] = useToggle(false);

  const methods: any = useForm({
    resolver: yupResolver(profileValidationSchema),
    defaultValues: userDetails,
  });

  const { handleSubmit } = methods;

  const onSubmit = async () => {};

  return (
    <FormProvider methods={methods}>
      <Typography variant="h5">Personal Details</Typography>
      <Grid container spacing={2} sx={{ mt: '5px' }}>
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
                    backgroundColor: '',
                    position: 'relative',
                    right: 0,
                  }}
                >
                  <InputAdornment
                    sx={{
                      position: 'absolute',
                      top: 45,
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
                        onClick={() => setIsToggled(false)}
                      >
                        <EraserIcon />
                      </Box>
                      <BorderColorIcon
                        onClick={() => setIsToggled(true)}
                        sx={{ cursor: 'pointer', fontSize: '20px' }}
                      />
                    </Box>
                  </InputAdornment>
                </Box>
              )}

              {!item?.toShow?.includes('address') && (
                <item.component {...item.componentProps} size={'small'}>
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
        <Button variant="outlined">Cancel</Button>
        <Button variant="contained" onClick={handleSubmit(onSubmit)}>
          Edit
        </Button>
      </Grid>
    </FormProvider>
  );
};

export default UserDetailsProfile;
