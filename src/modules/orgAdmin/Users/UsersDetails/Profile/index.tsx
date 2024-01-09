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
import { EditInputIcon, RevertIcon } from '@/assets/icons';
import useUserManagement from '@/modules/superAdmin/UserManagement/useUserManagement';

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
    ];

    for (const key of keysToDelete) {
      delete values[key];
    }
    updateUsers({ id: profileData?._id, body: values });
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
                      sx={{
                        display: 'flex',
                        gap: '10px',
                        alignItems: 'center',
                      }}
                    >
                      <Box
                        sx={{ cursor: 'pointer' }}
                        // onClick={() => setIsToggled(false)}
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
