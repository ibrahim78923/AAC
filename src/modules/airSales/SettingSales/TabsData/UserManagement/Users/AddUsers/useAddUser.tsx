import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { userValidationSchema } from '../Users.data';
import { useLazyGetproductUsersByIdQuery } from '@/services/airSales/settings/users';

const useAddUser = (checkedUser: any) => {
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

  const { handleSubmit, setValue } = methods;

  const [trigger, { data: productUsersById }] =
    useLazyGetproductUsersByIdQuery();

  useEffect(() => {
    trigger({ id: checkedUser });
  }, [checkedUser]);

  useEffect(() => {
    const data = productUsersById?.data;
    const fieldsToSet: any = {
      firstName: data?.user?.firstName,
      lastName: data?.user?.lastName,
      email: data?.user?.email,
      role: data?.role?._id,
      address: 'N/A',
      phoneNumber: 'N/A',
      jobTitle: 'N/A',
      language: 'N/A',
      timeZone: 'N/A',
      facebookUrl: 'N/A',
      linkedInUrl: 'N/A',
      twitterUrl: 'N/A',
    };
    for (const key in fieldsToSet) {
      setValue(key, fieldsToSet[key]);
    }
  }, [productUsersById?.data]);

  return {
    methods,
    handleSubmit,
  };
};

export default useAddUser;
