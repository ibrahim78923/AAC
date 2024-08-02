import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import {
  useGetproductUsersByIdQuery,
  usePostPoductUserMutation,
  useUpdateProductsUsersMutation,
} from '@/services/airSales/settings/users';
import { enqueueSnackbar } from 'notistack';
import { DRAWER_TYPES, NOTISTACK_VARIANTS } from '@/constants/strings';
import { indexNumbers } from '@/constants';
import { userValidationSchema } from '../Users/Users.data';

interface IsAddUserDrawer {
  isToggle: boolean;
  type: string;
  recordId: string[];
}

const useAddUser = (
  isAddUserDrawer: IsAddUserDrawer,
  setIsAddUserDrawer: (val: IsAddUserDrawer) => void,
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
    role: null,
    team: null,
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
    if (isAddUserDrawer?.type !== DRAWER_TYPES?.ADD) {
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
    }
  }, [productUsersById]);

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
        await updateProductsUsers({
          id: isAddUserDrawer?.recordId,
          body: values,
        })?.unwrap();
        enqueueSnackbar('User updated successfully', {
          variant: NOTISTACK_VARIANTS?.SUCCESS,
        });
        setIsAddUserDrawer({ ...isAddUserDrawer, isToggle: false });
      }
    } catch (error: any) {
      enqueueSnackbar(error?.data?.message, {
        variant: NOTISTACK_VARIANTS?.ERROR,
      });
    }
  };

  return {
    methods,
    handleSubmit,
    onSubmit,
    postUserLoading,
    updateUserLoading,
    productUsersById,
    productUserByIdLoading,
  };
};

export default useAddUser;
