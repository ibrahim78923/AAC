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
import useUserManagement from '../../useUserManagement';

const UserDetailsProfile = (props: any) => {
  const { userDetails } = props;
  const { updateUserProfile }: any = useUserManagement();
  const [isToggled, setIsToggled] = useToggle(false);
  const id = userDetails?._id;

  const userProfileDefaultValues = {
    ...userDetails,
    address: userDetails?.address?.composite
      ? userDetails?.address?.composite
      : `Flat # ${userDetails?.address?.flatNumber}, building # ${userDetails?.address?.buildingNumber} ,
    ${userDetails?.address?.buildingName}, street # ${userDetails?.address?.streetName},${userDetails?.address?.city}, ${userDetails?.address?.country} `,
    flat: userDetails?.address?.flatNumber ?? 'N/A',
    city: userDetails?.address?.city ?? 'N/A',
    country: userDetails?.address?.country ?? 'N/A',
    buildingName: userDetails?.address?.buildingName ?? 'N/A',
    buildingNumber: userDetails?.address?.buildingNumber ?? 'N/A',
    streetName: userDetails?.address?.streetName ?? 'N/A',
  };

  const methods: any = useForm({
    resolver: yupResolver(profileValidationSchema),
    defaultValues: userProfileDefaultValues,
  });

  const { handleSubmit } = methods;

  const onSubmit = async (values: any) => {
    const keysToDelete = [
      '_id',
      'products',
      'role',
      'organization',
      'createdAt',
      'createdBy',
      'updatedAt',
      'status',
    ];

    for (const key of keysToDelete) {
      delete values[key];
    }
    updateUserProfile({ id, ...values });
  };

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
          Update
        </Button>
      </Grid>
    </FormProvider>
  );
};

export default UserDetailsProfile;
