import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { userValidationSchema } from '../Users.data';
import {
  useGetproductUsersByIdQuery,
  usePostPoductUserMutation,
  useUpdateProductsUsersMutation,
} from '@/services/airMarketer/settings/users';
import { enqueueSnackbar } from 'notistack';
import { DRAWER_TYPES } from '@/constants/strings';
import { indexNumbers } from '@/constants';

const useAddUser = (
  checkedUser: any,
  isAddUserDrawer: any,
  setIsAddUserDrawer: any,
) => {
  const [postPoductUser, { isLoading: postUserLoading }] =
    usePostPoductUserMutation();
  const [updateProductsUsers, { isLoading: updateUserLoading }] =
    useUpdateProductsUsersMutation();

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

  const { data: productUsersById, isLoading: productUserByIdLoading } =
    useGetproductUsersByIdQuery(
      {
        id: isAddUserDrawer?.recordId,
      },
      {
        skip:
          !Array?.isArray(isAddUserDrawer?.recordId) ||
          isAddUserDrawer?.recordId?.length === indexNumbers?.ZERO,
      },
    );

  useEffect(() => {
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
      role: data?.role ?? null,
      team: data?.team ?? null,
    };
    for (const key in fieldsToSet) {
      setValue(key, fieldsToSet[key]);
    }
  }, [productUsersById?.data]);

  const onSubmit = async (values: any) => {
    values.address = {
      composite: values?.address,
    };
    values.role = values?.role?._id;
    values.team = values?.team?._id;
    try {
      if (isAddUserDrawer?.type === DRAWER_TYPES?.ADD) {
        await postPoductUser({ body: values })?.unwrap();
        reset();
        enqueueSnackbar('User added successfully', {
          variant: 'success',
        });
        setIsAddUserDrawer({ ...isAddUserDrawer, isToggle: false });
      } else {
        delete values['email'];
        delete values['timeZone'];
        await updateProductsUsers({ id: checkedUser, body: values })?.unwrap();
        enqueueSnackbar('User updated successfully', {
          variant: 'success',
        });
        setIsAddUserDrawer({ ...isAddUserDrawer, isToggle: false });
      }
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
    postUserLoading,
    updateUserLoading,
    productUserByIdLoading,
  };
};

export default useAddUser;
