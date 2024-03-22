import { Box, Button, Grid, InputAdornment, Typography } from '@mui/material';
import { FormProvider } from '@/components/ReactHookForm';
import { profileFields } from './UserDetailsProfile.data';
import useToggle from '@/hooks/useToggle';
import { EditInputIcon } from '@/assets/icons';
import useProfile from './useProfile';

const UserDetailsProfile = (props: any) => {
  const { profileData, setTabVal } = props;
  const [isToggled, setIsToggled] = useToggle(false);

  const profileParams = {
    isToggled,
    setTabVal,
    profileData,
  };

  const { methods, handleSubmit, onSubmit, initialTab } =
    useProfile(profileParams);

  return (
    <FormProvider methods={methods}>
      <Typography variant="h5">Personal Details</Typography>
      <Grid container spacing={1} sx={{ mt: '5px' }}>
        {profileFields?.map((item: any) => {
          return (
            <Grid item xs={12} md={item?.md} key={item?.compoentProps?.name}>
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
                      top: 53,
                      right: 15,
                      zIndex: 99,
                    }}
                    position="end"
                  >
                    <Box
                      onClick={() => setIsToggled(true)}
                      sx={{ cursor: 'pointer', fontSize: '20px' }}
                    >
                      <EditInputIcon />
                    </Box>
                  </InputAdornment>
                </Box>
              )}
              {!item?.toShow?.includes('address') && (
                <item.component
                  {...item?.componentProps}
                  size={'small'}
                  disabled={
                    (isToggled && item?.componentProps?.name === 'address') ||
                    item?.componentProps?.name === 'email'
                      ? true
                      : false
                  }
                >
                  {item?.componentProps?.select &&
                    item?.options?.map((option: any) => (
                      <option
                        key={item?.compoentProps?.name}
                        value={option?.value}
                      >
                        {option?.label}
                      </option>
                    ))}
                </item.component>
              )}
              {isToggled && item?.toShow?.includes('address') && (
                <item.component {...item.componentProps} size={'small'}>
                  {item?.componentProps?.select &&
                    item?.options?.map((option: any) => (
                      <option
                        key={option?.compoentProps?.name}
                        value={option?.value}
                      >
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
        <Button
          variant="outlined"
          color="inherit"
          onClick={() => setTabVal(initialTab)}
        >
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
