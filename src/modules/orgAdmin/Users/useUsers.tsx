import { useState } from 'react';
import { getSession } from '@/utils';
import { useGetEmployeeListQuery } from '@/services/superAdmin/user-management/UserList';

const useUsers = () => {
  const { user } = getSession();
  const [employeeDataById, setEmployeeDataById] = useState();
  const [searchEmployee, setSearchEmployee] = useState('');
  const [employeeFilter, setEmployeeFilter] = useState({
    product: '',
    company: '',
    user: '',
  });

  const [page, setPage] = useState(1);
  const employeeRecordsLimit = 10;

  const empListParams = {
    page: page,
    limit: employeeRecordsLimit,
    search: searchEmployee,
    product: employeeFilter?.product,
    company: employeeFilter?.company,
    // status: employeeFilter?.status
  };

  const { data: employeeList } = useGetEmployeeListQuery({
    orgId: user?.organization?._id,
    values: empListParams,
  });
  const employeeDetails = employeeList?.data?.users;
  const employeeMetaData = employeeList?.data?.meta;

  const handleEmpListPaginationChange = (
    event: React.ChangeEvent<unknown>,
    value: number,
  ) => {
    setPage(value);
  };

  const resetFilter = () => {
    setEmployeeFilter({
      product: '',
      company: '',
      user: '',
    });
  };

  return {
    user,
    employeeList,
    employeeFilter,
    setEmployeeFilter,
    handleEmpListPaginationChange,
    searchEmployee,
    setSearchEmployee,
    employeeDetails,
    employeeDataById,
    setEmployeeDataById,
    resetFilter,
    employeeMetaData,
  };
};

export default useUsers;
