import { useForm } from 'react-hook-form';
import { userDataArray, userDefaultValues } from './UsersFilter.data';
import { useLazyGetDepartmentDropdownQuery } from '@/services/airServices/assets/software/single-software-detail/users';

export const useUsersFilter = (props: any) => {
  const { userDetailsFilterLists } = props;
  const methods: any = useForm({
    defaultValues: userDefaultValues(userDetailsFilterLists),
  });

  const { handleSubmit, reset } = methods;

  const apiQueryDepartment = useLazyGetDepartmentDropdownQuery();

  const userFieldsData = userDataArray(apiQueryDepartment);

  return {
    userFieldsData,
    methods,
    handleSubmit,
    reset,
  };
};
