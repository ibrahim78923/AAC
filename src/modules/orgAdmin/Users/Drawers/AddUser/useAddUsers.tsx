import { usePostUserEmployeeMutation } from '@/services/superAdmin/user-management/UserList';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { superAdminValidationSchema } from './AddUser.data';
import { useEffect } from 'react';
import { enqueueSnackbar } from 'notistack';
import useToggle from '@/hooks/useToggle';

const useAddUser = (useActionParams?: any) => {
  const { organizationId, setIsOpenAdduserDrawer } = useActionParams;

  const [isToggled, setIsToggled] = useToggle(false);

  const [postUserEmployee] = usePostUserEmployeeMutation();

  // form methods
  const methods: any = useForm({
    resolver: yupResolver(superAdminValidationSchema),
  });

  //constant methods for both forms
  const { watch, setValue, handleSubmit, reset } = methods;

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

  //onsubmit function of forms
  const onSubmit = async (values: any) => {
    const bodyVals: any = {
      firstName: values?.firstName,
      lastName: values?.lastName,
      postCode: values?.postCode,
      phoneNumber: values?.phoneNumber,
      jobTitle: values?.jobTitle,
      role: 'ORG_EMPLOYEE',
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
      await postUserEmployee({ id: organizationId, body: bodyVals })?.unwrap();
      setIsOpenAdduserDrawer(false);
      enqueueSnackbar('User Added Successfully', {
        variant: 'success',
      });
      reset();
    } catch (error: any) {
      enqueueSnackbar(error?.data?.message, {
        variant: 'error',
      });
    }
  };

  return {
    postUserEmployee,
    methods,
    handleSubmit,
    onSubmit,
    isToggled,
    setIsToggled,
    addressVal: formValues.compositeAddress,
  };
};

export default useAddUser;
