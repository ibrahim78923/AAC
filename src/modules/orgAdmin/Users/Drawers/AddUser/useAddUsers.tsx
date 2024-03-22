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
    addressVal: formValues.compositeAddress,
  };
};

export default useAddUser;
