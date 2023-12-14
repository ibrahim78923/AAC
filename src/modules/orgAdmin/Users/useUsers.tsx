import { useState } from 'react';
import { getSession } from '@/utils';
import { useGetEmployeeListQuery } from '@/services/superAdmin/user-management/UserList';

const useUsers = () => {
  const { user } = getSession();
  const [employeeDataById, setEmployeeDataById] = useState();
  const [searchEmployee, setSearchEmployee] = useState('');
  const [employeeFilter, setEmployeeFilter] = useState({
    status: '',
    product: '',
    company: '',
  });
  const empListParams = {
    page: 1,
    limit: 10,
    search: searchEmployee,
    // status:'ACTIVE'
    product: employeeFilter?.product,
    company: employeeFilter?.company,
  };
  const { data: employeeList } = useGetEmployeeListQuery({
    orgId: user?.organization?._id,
    values: empListParams,
  });
  const employeeDetails = employeeList?.data?.users;

  return {
    user,
    employeeList,
    employeeFilter,
    setEmployeeFilter,
    searchEmployee,
    setSearchEmployee,
    employeeDetails,
    employeeDataById,
    setEmployeeDataById,
  };
};

export default useUsers;
