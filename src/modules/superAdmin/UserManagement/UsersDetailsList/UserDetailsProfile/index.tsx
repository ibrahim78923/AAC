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
import useUserManagement from '../../useUserManagement';

const UserDetailsProfile = (props: any) => {
  const { userDetails } = props;
  const { updateUsers }: any = useUserManagement();
  const [isToggled, setIsToggled] = useToggle(false);
  const id = userDetails?._id;

  const userProfileDefaultValues = {
    ...userDetails,
    compositeAddress: userDetails?.address?.composite
      ? userDetails?.address?.composite
      : `Flat # ${userDetails?.address?.flatNumber}, building # ${userDetails?.address?.buildingNumber} ,
    ${userDetails?.address?.buildingName}, street # ${userDetails?.address?.streetName},${userDetails?.address?.city}, ${userDetails?.address?.country} `,
    flat: userDetails?.address?.flatNumber ?? '',
    city: userDetails?.address?.city ?? '',
    country: userDetails?.address?.country ?? '',
    buildingName: userDetails?.address?.buildingName ?? '',
    buildingNumber: userDetails?.address?.buildingNumber ?? '',
    streetName: userDetails?.address?.streetName ?? '',
  };

  const methods: any = useForm({
    resolver: yupResolver(profileValidationSchema),
    defaultValues: userProfileDefaultValues,
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
    updateUsers({ id: id, body: values });
  };

  return (
    <FormProvider methods={methods}>
      <Box
        sx={{
          maxHeight: `calc(50vh - ${15}px)`,
          overflow: 'auto',
        }}
      >
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
                        top: 50,
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
                          <EditInputIcon />
                        </Box>
                        <Box
                          sx={{ cursor: 'pointer' }}
                          onClick={() => setIsToggled(true)}
                        >
                          <RevertIcon />
                        </Box>
                      </Box>
                    </InputAdornment>
                  </Box>
                )}

                {!item?.toShow?.includes('address') && (
                  <item.component
                    {...item.componentProps}
                    size={'small'}
                    disabled={
                      isToggled &&
                      item?.componentProps?.name === 'compositeAddress'
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
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            gap: '10px',
            my: 2,
          }}
        >
          <Button variant="outlined">Cancel</Button>
          <Button variant="contained" onClick={handleSubmit(onSubmit)}>
            Update
          </Button>
        </Grid>
      </Box>
    </FormProvider>
  );
};

export default UserDetailsProfile;
