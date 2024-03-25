import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { userValidationSchema } from '../Users.data';
import {
  useGetproductUsersByIdQuery,
  usePostPoductUserMutation,
  useUpdateProductsUsersMutation,
} from '@/services/airSales/settings/users';
import { enqueueSnackbar } from 'notistack';

const useAddUser = (checkedUser: any, drawerType: any) => {
  const [postPoductUser] = usePostPoductUserMutation();
  const [updateProductsUsers] = useUpdateProductsUsersMutation();

  const defaultValues = {
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    phoneNumber: '',
    jobTitle: '',
    role: '',
    team: '',
    language: '',
    timezone: '',
    facebookUrl: '',
    linkedInUrl: '',
    twitterUrl: '',
  };

  const methods: any = useForm({
    resolver: yupResolver(userValidationSchema),
    defaultValues: defaultValues,
  });

  const { handleSubmit, setValue, reset } = methods;

  const { data: productUsersById } = useGetproductUsersByIdQuery({
    id: checkedUser,
  });

  useEffect(() => {
    // if (drawerType === 'edit') {
    const data = productUsersById?.data;
    const fieldsToSet: any = {
      firstName: data?.user?.firstName,
      lastName: data?.user?.lastName,
      email: data?.user?.email,
      address: data?.user?.address?.composite,
      phoneNumber: data?.user?.phoneNumber,
      jobTitle: data?.user?.jobTitle,
      language: data?.user?.language,
      timezone: data?.user?.timezone,
      facebookUrl: data?.user?.facebookUrl,
      linkedInUrl: data?.user?.linkedInUrl,
      twitterUrl: data?.user?.twitterUrl,
      role: data?.role?._id,
      team: data?.team?._id,
    };
    for (const key in fieldsToSet) {
      setValue(key, fieldsToSet[key]);
    }
    // }
  }, [productUsersById?.data]);

  const onSubmit = async (values: any) => {
    values.address = {
      composite: values?.address,
    };
    try {
      if (drawerType === 'add') {
        await postPoductUser({ body: values })?.unwrap();
        reset();
        enqueueSnackbar('User added successfully', {
          variant: 'success',
        });
      } else {
        delete values['email'];
        delete values['timeZone'];
        await updateProductsUsers({ id: checkedUser, body: values })?.unwrap();
        enqueueSnackbar('User updated successfully', {
          variant: 'success',
        });
      }
      // setIsAddUserDrawer({ isToggle: false, type: 'add' });
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
  };
};

export default useAddUser;
