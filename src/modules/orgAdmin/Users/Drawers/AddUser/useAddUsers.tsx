import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { enqueueSnackbar } from 'notistack';
import useUsers from '../../useUsers';
import { defaultValues, validationSchema } from './AddUser.data';
import { usePostUserEmployeeMutation } from '@/services/superAdmin/user-management/UserList';

const useAddUsers = (setIsOpenAdduserDrawer: any) => {
  const { user } = useUsers();
  const [postUserEmployee] = usePostUserEmployeeMutation();

  const methods: any = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: defaultValues,
  });

  const { handleSubmit, reset } = methods;

  const onSubmit = async (values: any) => {
    try {
      values.role = 'ORG_EMPLOYEE';
      postUserEmployee({ id: user?.organization?._id, body: values })?.unwrap();
      setIsOpenAdduserDrawer(false);
      enqueueSnackbar('User Added Successfully', {
        variant: 'success',
      });
      reset();
    } catch (error: any) {
      enqueueSnackbar(error, {
        variant: 'error',
      });
    }
  };

  return {
    handleSubmit,
    onSubmit,
    methods,
  };
};

export default useAddUsers;
