// import { yupResolver } from '@hookform/resolvers/yup';
// import { useForm } from 'react-hook-form';
// import { profileValidationSchema } from './UserDetailsProfile.data';
// import useUserManagement from '@/modules/superAdmin/UserManagement/useUserManagement';
// import { enqueueSnackbar } from 'notistack';

// const useProfile = (profileParams: any) => {
//     const { isToggled, setTabVal, profileData } = profileParams;
//     const { updateUsers }: any = useUserManagement();
//     const initialTab = 0;

//     const profileDefaulValues = {
//         ...profileData,
//         address: profileData?.address?.composite
//             ? profileData?.address?.composite
//             : `${profileData?.address?.flatNumber
//                 ? `Flat # ${profileData?.address?.flatNumber}, `
//                 : ''
//             }` +
//             `${profileData?.address?.buildingNumber
//                 ? `Building # ${profileData?.address?.buildingNumber}, `
//                 : ''
//             }` +
//             `${profileData?.address?.buildingName
//                 ? `Building Name ${profileData?.address?.buildingName}, `
//                 : ''
//             }` +
//             `${profileData?.address?.streetName
//                 ? `Street # ${profileData?.address?.streetName}, `
//                 : ''
//             }` +
//             `${profileData?.address?.city ? `${profileData?.address?.city}, ` : ''
//             }` +
//             `${profileData?.address?.country
//                 ? `${profileData?.address?.country}`
//                 : ''
//             }`,
//         flat: profileData?.address?.flatNumber ?? '',
//         city: profileData?.address?.city ?? '',
//         country: profileData?.address?.country ?? '',
//         buildingName: profileData?.address?.buildingName ?? '',
//         buildingNumber: profileData?.address?.buildingNumber ?? '',
//         streetName: profileData?.address?.streetName ?? '',
//     };

//     const methods: any = useForm({
//         resolver: yupResolver(profileValidationSchema),
//         defaultValues: profileDefaulValues,
//     });

//     const { handleSubmit } = methods;
//     const onSubmit = async (values: any) => {

//         if (isToggled) {
//         values.address = {
//             flatNumber: values?.flat,
//             buildingName: values?.buildingName,
//             buildingNumber: values?.buildingNumber,
//             streetName: values?.streetName,
//             city: values?.city,
//             country: values?.country,
//             composite: values?.address,
//         };
//         }
//         else {
//         values.address = {
//             composite: values?.address,
//         };
//     }

//     const keysToDelete = [
//         '_id',
//         'products',
//         'role',
//         'organization',
//         'createdAt',
//         'createdBy',
//         'updatedAt',
//         'status',
//         'flat',
//         'compositeAddress',
//         'buildingNumber',
//         'buildingName',
//         'city',
//         'country',
//         'streetName',
//         'linkedInUrl',
//         'departmentId',
//         'avatar',
//         'email',
//     ];

//     for (const key of keysToDelete) {
//         delete values[key];
//     }
//     try {
//         await updateUsers({ id: profileData?._id, body: values })?.unwrap();
//         enqueueSnackbar('User updated successfully', {
//             variant: 'success',
//         });
//         setTabVal(initialTab);
//     }
//     catch (error: any) {
//         enqueueSnackbar(error?.data?.message, {
//             variant: 'error',
//         });
//     }
// };

// return (
//     {
//         methods,
//         handleSubmit,
//         onSubmit,
//         initialTab
//     }
// )
// }

// export default useProfile

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

  // default values of profile
  const profileDefaultValues = {
    ...profileData,
    address:
      profileData?.address?.composite &&
      !profileData?.address?.flatNumber &&
      !profileData?.address?.city &&
      !profileData?.address?.country &&
      !profileData?.address?.buildingName &&
      !profileData?.address?.buildingNumber &&
      !profileData?.address?.streetName
        ? profileData.address.composite
        : `${
            profileData?.address?.flatNumber
              ? `Flat # ${profileData?.address?.flatNumber}, `
              : ''
          }` +
          `${
            profileData?.address?.buildingNumber
              ? `Building # ${profileData?.address?.buildingNumber}, `
              : ''
          }` +
          `${
            profileData?.address?.buildingName
              ? `Building Name ${profileData?.address?.buildingName}, `
              : ''
          }` +
          `${
            profileData?.address?.streetName
              ? `Street # ${profileData?.address?.streetName}, `
              : ''
          }` +
          `${
            profileData?.address?.city ? `${profileData?.address?.city}, ` : ''
          }` +
          `${
            profileData?.address?.country
              ? `${profileData?.address?.country}`
              : ''
          }`,
    flat: profileData?.address?.flatNumber ?? '',
    city: profileData?.address?.city ?? '',
    country: profileData?.address?.country ?? '',
    buildingName: profileData?.address?.buildingName ?? '',
    buildingNumber: profileData?.address?.buildingNumber ?? '',
    streetName: profileData?.address?.streetName ?? '',
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
    setValue('address', addressValues);
  }, [addressValues]);

  const onSubmit = async (values: any) => {
    if (!isToggled) {
      values.address = {
        composite: values?.address,
      };
    } else {
      values.address = {
        flatNumber: values?.flat,
        buildingName: values?.buildingName,
        buildingNumber: values?.buildingNumber,
        streetName: values?.streetName,
        city: values?.city,
        country: values?.country,
        composite: values?.address,
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
      await updateUsers({ id: profileData?._id, body: values })?.unwrap();
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
  };
};

export default useProfile;
