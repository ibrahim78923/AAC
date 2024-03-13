import { Box, Button, Grid, InputAdornment, Typography } from '@mui/material';
import { FormProvider } from '@/components/ReactHookForm';
import {
  profileFields,
  profileValidationSchema,
} from './UserDetailsProfile.data';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { v4 as uuidv4 } from 'uuid';
import useToggle from '@/hooks/useToggle';
import { EditInputIcon } from '@/assets/icons';
import useUserManagement from '@/modules/superAdmin/UserManagement/useUserManagement';
import { enqueueSnackbar } from 'notistack';

const UserDetailsProfile = (props: any) => {
  const { profileData } = props;
  const [isToggled, setIsToggled] = useToggle(false);
  const { updateUsers }: any = useUserManagement();

  const profileDefaulValues = {
    ...profileData,
    address: profileData?.address?.composite
      ? profileData?.address?.composite
      : `Flat # ${profileData?.address?.flatNumber}, building # ${profileData?.address?.buildingNumber} ,
      ${profileData?.address?.buildingName}, street # ${profileData?.address?.streetName},${profileData?.address?.city}, ${profileData?.address?.country} `,
    flat: profileData?.address?.flatNumber ?? '',
    city: profileData?.address?.city ?? '',
    country: profileData?.address?.country ?? '',
    buildingName: profileData?.address?.buildingName ?? '',
    buildingNumber: profileData?.address?.buildingNumber ?? '',
    streetName: profileData?.address?.streetName ?? '',
  };

  const methods: any = useForm({
    resolver: yupResolver(profileValidationSchema),
    defaultValues: profileDefaulValues,
  });

  const { handleSubmit } = methods;

  const onSubmit = async (values: any) => {
    if (isToggled) {
      values.address = {
        flatNumber: values.flat,
        buildingName: values?.buildingName,
        buildingNumber: values?.buildingNumber,
        streetName: values?.streetName,
        city: values?.city,
        country: values?.country,
      };
    } else {
      values.address = {
        composite: values?.compositeAddress,
      };
    }

    const keysToDelete = [
      '_id',
      'products',
      'role',
      'email',
      'organization',
      'createdAt',
      'createdBy',
      'updatedAt',
      'status',
      'flat',
      'compositeAddress',
      'buildingNumber',
      'buildingName',
      'city',
      'country',
      'streetName',
      'linkedInUrl',
      'departmentId',
      'avatar',
    ];

    for (const key of keysToDelete) {
      delete values[key];
    }
    try {
      await updateUsers({ id: profileData?._id, body: values })?.unwrap();
      enqueueSnackbar('User updated successfully', {
        variant: 'success',
      });
    } catch (error: any) {
      enqueueSnackbar(error?.data?.message, {
        variant: 'error',
      });
    }
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
                  disabled={item?.componentProps?.name === 'email' && true}
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
