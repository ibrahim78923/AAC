import { Box, Button, Grid, InputAdornment, Typography } from '@mui/material';
import { FormProvider } from '@/components/ReactHookForm';
import { profileFields } from './UserDetailsProfile.data';
import useToggle from '@/hooks/useToggle';
import useProfile from './useProfile';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { UserDetailsProfileProps } from '@/modules/orgAdmin/Users/UsersDetails/UsersDetails-interface';
import { fieldName, indexNumbers } from '@/constants';
import { LoadingButton } from '@mui/lab';

const UserDetailsProfile = (props: UserDetailsProfileProps) => {
  const { profileData, setTabVal } = props;
  const [isToggled, setIsToggled] = useToggle(false);

  const profileParams = {
    isToggled,
    setTabVal,
    profileData,
  };

  const { methods, handleSubmit, onSubmit, addressVal, updateUserLoading } =
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
              {item?.componentProps?.name === fieldName?.ADDRESS && (
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
                    {addressVal?.length > indexNumbers?.ZERO ? (
                      <BorderColorIcon
                        sx={{
                          cursor: 'not-allowed',
                          fontSize: '20px',
                          color: 'lightgrey',
                        }}
                      />
                    ) : (
                      <BorderColorIcon
                        onClick={() => {
                          setIsToggled(true);
                        }}
                        sx={{ cursor: 'pointer', fontSize: '20px' }}
                      />
                    )}
                  </InputAdornment>
                </Box>
              )}
              {!item?.toShow?.includes(fieldName?.ADDRESS) && (
                <item.component
                  {...item?.componentProps}
                  size={'small'}
                  disabled={
                    (isToggled &&
                      item?.componentProps?.name === fieldName?.ADDRESS) ||
                    item?.componentProps?.name === fieldName?.EMAIL
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
              {isToggled && item?.toShow?.includes(fieldName?.ADDRESS) && (
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
          onClick={() => setTabVal(indexNumbers?.ZERO)}
        >
          Cancel
        </Button>
        <LoadingButton
          variant="contained"
          onClick={handleSubmit(onSubmit)}
          loading={updateUserLoading}
        >
          Save
        </LoadingButton>
      </Grid>
    </FormProvider>
  );
};

export default UserDetailsProfile;
