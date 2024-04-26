import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { profileValidationSchema } from './UserDetailsProfile.data';
import useUserManagement from '@/modules/superAdmin/UserManagement/useUserManagement';
import { enqueueSnackbar } from 'notistack';
import { useEffect } from 'react';

const useProfile = (profileParams: any) => {
  const { isToggled, setTabVal, profileData } = profileParams;
  const { updateUsers }: any = useUserManagement();
  const initialTab = 0;

  const defaultValues = {
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    phoneNumber: '',
    jobTitle: '',
    postCode: '',
    facebookUrl: '',
    twitterUrl: '',
  };

  const methods: any = useForm({
    resolver: yupResolver(profileValidationSchema),
    defaultValues: defaultValues,
  });

  const { handleSubmit, watch, setValue } = methods;

  // Watch all values from forms
  const formValues = watch();

  // Make sum up of address fields
  const addressValues = [
    formValues.flat && `Flat # ${formValues.flat}, `,
    formValues.buildingName && `Building Name ${formValues.buildingName}, `,
    formValues.buildingNumber && `Building # ${formValues.buildingNumber}, `,
    formValues.streetName && `Street # ${formValues.streetName}, `,
    formValues.city && `${formValues.city}, `,
    formValues.country && formValues.country,
  ]
    .filter(Boolean)
    .join('');

  // Set value of address fields
  useEffect(() => {
    setValue('address', addressValues);
  }, [addressValues]);

  useEffect(() => {
    const data = profileData;
    const fieldsToSet: any = {
      firstName: data?.firstName,
      lastName: data?.lastName,
      email: data?.email,
      address: data?.address?.composite,
      flat: profileData?.address?.flatNumber ?? '',
      city: profileData?.address?.city ?? '',
      country: profileData?.address?.country ?? '',
      buildingName: profileData?.address?.buildingName ?? '',
      buildingNumber: profileData?.address?.buildingNumber ?? '',
      streetName: profileData?.address?.streetName ?? '',
      postCode: data?.postCode,
      phoneNumber: data?.phoneNumber,
      jobTitle: data?.jobTitle,
      facebookUrl: data?.facebookUrl,
      linkedInUrl: data?.linkedInUrl,
    };
    for (const key in fieldsToSet) {
      setValue(key, fieldsToSet[key]);
    }
  }, [profileData]);

  const onSubmit = async (values: any) => {
    const bodyVals: any = {
      firstName: values?.firstName,
      lastName: values?.lastName,
      postCode: values?.postCode,
      phoneNumber: values?.phoneNumber,
      jobTitle: values?.jobTitle,
      facebookUrl: values?.facebookURl,
      twitterUrl: values?.twitterUrl,
    };

    if (isToggled) {
      // If isToggled is true, construct the address object with individual fields
      bodyVals.address = {
        flatNumber: values?.flat,
        buildingName: values?.buildingName,
        buildingNumber: values?.buildingNumber,
        streetName: values?.streetName,
        city: values?.city,
        country: values?.country,
      };
    } else {
      // If isToggled is false, use a composite address value
      bodyVals.address = {
        composite: values?.address,
      };
    }

    try {
      await updateUsers({ id: profileData?._id, body: bodyVals })?.unwrap();
      enqueueSnackbar('User updated successfully', {
        variant: 'success',
      });
      setTabVal(initialTab);
    } catch (error: any) {
      enqueueSnackbar(error?.data?.message, {
        variant: 'error',
      });
    }
  };

  return {
    methods,
    handleSubmit,
    onSubmit,
    initialTab,
    addressVal: formValues.address,
  };
};

export default useProfile;
