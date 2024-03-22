import { yupResolver } from '@hookform/resolvers/yup';
import { enqueueSnackbar } from 'notistack';
import { useForm } from 'react-hook-form';
import { profileValidationSchema } from './UserDetailsProfile.data';
import useUserManagement from '../../useUserManagement';
import { useEffect } from 'react';

const useUserDeatilProfile = (userprofileParams: any) => {
  const { isToggled, userDetails, setTabVal } = userprofileParams;
  const { updateUsers }: any = useUserManagement();
  const id = userDetails?._id;
  const initialTab = 0;

  const profileDefaultValues: any = {
    firstName: '',
    lastName: '',
    email: '',
    compositeAddress: '',
    phoneNumber: '',
    jobTitle: '',
    postCode: '',
    facebookUrl: '',
    twitterUrl: '',
  };

  // const profileDefaultValues = {
  //   ...userDetails,
  //   compositeAddress: userDetails?.address?.composite ?? '',
  //   flat: userDetails?.address?.flatNumber ?? '',
  //   city: userDetails?.address?.city ?? '',
  //   country: userDetails?.address?.country ?? '',
  //   buildingName: userDetails?.address?.buildingName ?? '',
  //   buildingNumber: userDetails?.address?.buildingNumber ?? '',
  //   streetName: userDetails?.address?.streetName ?? '',
  // };

  const methods: any = useForm({
    resolver: yupResolver(profileValidationSchema),
    defaultValues: profileDefaultValues,
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
    setValue('compositeAddress', addressValues);
  }, [addressValues]);

  useEffect(() => {
    // if (drawerType === 'edit') {
    const fieldsToSet: any = {
      firstName: userDetails?.firstName,
      lastName: userDetails?.lastName,
      email: userDetails?.email,
      compositeAddress: userDetails?.address?.composite,
      flat: userDetails?.address?.flatNumber ?? '',
      city: userDetails?.address?.city ?? '',
      country: userDetails?.address?.country ?? '',
      buildingName: userDetails?.address?.buildingName ?? '',
      buildingNumber: userDetails?.address?.buildingNumber ?? '',
      streetName: userDetails?.address?.streetName ?? '',
      postCode: userDetails?.postCode,
      phoneNumber: userDetails?.phoneNumber,
      jobTitle: userDetails?.jobTitle,
      facebookUrl: userDetails?.facebookUrl,
      linkedInUrl: userDetails?.linkedInUrl,
    };
    for (const key in fieldsToSet) {
      setValue(key, fieldsToSet[key]);
    }
    // }
  }, [userDetails]);

  //submission and hit post api
  const onSubmit = async (values: any) => {
    if (!isToggled) {
      values.address = {
        composite: values?.compositeAddress,
      };
    } else {
      values.address = {
        flatNumber: values?.flat,
        buildingName: values?.buildingName,
        buildingNumber: values?.buildingNumber,
        streetName: values?.streetName,
        city: values?.city,
        country: values?.country,
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
      'avatar',
      'email',
    ];

    for (const key of keysToDelete) {
      delete values[key];
    }

    try {
      await updateUsers({ id: id, body: values })?.unwrap();
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
    addressVal: formValues?.compositeAddress,
  };
};

export default useUserDeatilProfile;
