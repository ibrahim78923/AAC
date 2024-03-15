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

  //watch all values from forms
  const formValues = watch();

  //make sum up of address fields
  const addressValues = formValues?.composite?.address
    ? formValues?.composite?.address
    : `${formValues?.flatNumber ? `Flat # ${formValues?.flatNumber}, ` : ''}` +
      `${
        formValues?.buildingNumber
          ? `Building # ${formValues?.buildingNumber}, `
          : ''
      }` +
      `${
        formValues?.buildingName
          ? `Building Name ${formValues?.buildingName}, `
          : ''
      }` +
      `${
        formValues?.streetName ? `Street # ${formValues?.streetName}, ` : ''
      }` +
      `${formValues?.city ? `${formValues?.city}, ` : ''}` +
      `${formValues?.country ? `${formValues?.country}` : ''}`;

  // setValue of address values
  useEffect(() => {
    setValue('compositeAddress', addressValues?.trim());
  }, [addressValues]);

  //onsubmit function of forms
  const onSubmit = async (values: any) => {
    values.role = 'ORG_EMPLOYEE';
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
    const keysToDelete: any = [
      'flat',
      'buildingNumber',
      'buildingName',
      'city',
      'country',
      'streetName',
      'compositeAddress',
    ];

    for (const key of keysToDelete) {
      delete values[key];
    }
    // if (isToggled) {
    //   values.address = {
    //     flatNumber: values.flat,
    //     buildingName: values?.buildingName,
    //     buildingNumber: values?.buildingNumber,
    //     streetName: values?.streetName,
    //     city: values?.city,
    //     country: values?.country,
    //   };
    // } else {
    //   values.address = {
    //     composite: values?.compositeAddress,
    //   };
    // }

    // const keysToDelete: any = [
    //   'flat',
    //   'compositeAddress',
    //   'compositeAddress ',
    //   'buildingNumber',
    //   'buildingName',
    //   'city',
    //   'country',
    //   'streetName',
    // ];

    // for (const key of keysToDelete) {
    //   delete values[key];
    // }

    try {
      await postUserEmployee({ id: organizationId, body: values })?.unwrap();
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
  };
};

export default useAddUser;
