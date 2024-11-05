import { useEffect } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { profileValidationSchema } from './UserDetailsProfile.data';
import { UserProfileParams } from '@/modules/superAdmin/UserManagement/UsersDetailsList/UsesDetailList-interface';
import { useUpdateUsersMutation } from '@/services/superAdmin/user-management/users';
import { errorSnackbar, successSnackbar } from '@/lib/snackbar';

const useUserDeatilProfile = (userprofileParams: UserProfileParams) => {
  const { isToggled, userDetails, setTabVal } = userprofileParams;
  const id = userDetails?._id;
  const initialTab = 0;
  const [updateUsers, { isLoading: updateUserLoading }] =
    useUpdateUsersMutation();

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
      successSnackbar('User updated successfully');
      setTabVal(initialTab);
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
    }
  };

  return {
    methods,
    handleSubmit,
    onSubmit,
    initialTab,
    addressVal: formValues?.compositeAddress,
    updateUserLoading,
  };
};

export default useUserDeatilProfile;
