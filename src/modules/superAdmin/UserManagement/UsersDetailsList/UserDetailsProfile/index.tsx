import {
  Box,
  Button,
  Grid,
  InputAdornment,
  Typography,
  useTheme,
} from '@mui/material';
import { FormProvider } from '@/components/ReactHookForm';
import { profileFields } from './UserDetailsProfile.data';
import useToggle from '@/hooks/useToggle';
import { EditInputIcon } from '@/assets/icons';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { SUPER_ADMIN_USER_MANAGEMENT_PERMISSIONS } from '@/constants/permission-keys';
import useUserDeatilProfile from './useUserDeatilProfile';
import { v4 as uuidv4 } from 'uuid';

const UserDetailsProfile = (props: any) => {
  const { userDetails, setTabVal } = props;
  const theme = useTheme();
  const [isToggled, setIsToggled] = useToggle(false);
  const userProfileParams = {
    isToggled,
    userDetails,
    setTabVal,
  };
  const { methods, handleSubmit, onSubmit, initialTab, addressVal } =
    useUserDeatilProfile(userProfileParams);

  return (
    <FormProvider methods={methods}>
      <Box
        sx={{
          maxHeight: `calc(50vh - ${15}px)`,
          overflow: 'auto',
        }}
      >
        <PermissionsGuard
          permissions={[
            SUPER_ADMIN_USER_MANAGEMENT_PERMISSIONS?.VIEW_SUB_USER_PROFILE,
          ]}
        >
          <Typography variant="h5">Personal Details</Typography>
          <Grid container spacing={2} sx={{ mt: '5px' }}>
            {profileFields?.map((item: any) => {
              return (
                <Grid
                  item
                  xs={12}
                  md={item?.md}
                  key={item?.componentProps?.name}
                >
                  {item?.componentProps?.heading && (
                    <Typography variant="h5">
                      {item?.componentProps?.heading}
                    </Typography>
                  )}
                  {/* for address fileds */}
                  {item?.componentProps?.name === 'compositeAddress' && (
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
                          top: 53,
                          right: 0,
                          zIndex: 9999,
                        }}
                        position="end"
                      >
                        <Button
                          onClick={() => setIsToggled(true)}
                          disabled={!addressVal ? false : true}
                          sx={{
                            backgroundColor:
                              addressVal && theme?.palette?.grey[700],
                            margin: 0,
                          }}
                        >
                          <EditInputIcon />
                        </Button>
                      </InputAdornment>
                    </Box>
                  )}

                  {!item?.toShow?.includes('address') && (
                    <item.component
                      {...item.componentProps}
                      size={'small'}
                      disabled={
                        (isToggled &&
                          item?.componentProps?.name === 'compositeAddress') ||
                        item?.componentProps?.name === 'email'
                          ? true
                          : false
                      }
                    >
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
                          <option
                            key={option?.componentProps?.name}
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
        </PermissionsGuard>
        <Grid
          item
          lg={12}
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            gap: '10px',
            my: 2,
          }}
        >
          <Button variant="outlined" onClick={() => setTabVal(initialTab)}>
            Cancel
          </Button>
          <PermissionsGuard
            permissions={[
              SUPER_ADMIN_USER_MANAGEMENT_PERMISSIONS?.UPDATE_SUB_USER_PROFILE,
            ]}
          >
            <Button variant="contained" onClick={handleSubmit(onSubmit)}>
              Update
            </Button>
          </PermissionsGuard>
        </Grid>
      </Box>
    </FormProvider>
  );
};

export default UserDetailsProfile;
