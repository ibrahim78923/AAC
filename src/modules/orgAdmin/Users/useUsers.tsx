import { useEffect, useState } from 'react';
import { getSession } from '@/utils';
import { useGetEmployeeListQuery } from '@/services/superAdmin/user-management/UserList';
import { indexNumbers } from '@/constants';
import { PAGINATION } from '@/config';

const useUsers = () => {
  const { user }: any = getSession();
  const [employeeDataById, setEmployeeDataById] = useState('');
  const [searchEmployee, setSearchEmployee] = useState('');
  const [employeeFilter, setEmployeeFilter] = useState<any>({
    product: {},
    company: {},
    status: '',
  });
  const [searchAccount, setSearchAccount] = useState('');

  const [page, setPage] = useState(1);

  const empListParams = {
    page: page,
    limit: PAGINATION?.PAGE_LIMIT,
    search: searchEmployee,
    product: employeeFilter?.product?._id,
    company: employeeFilter?.company?._id,
    status: employeeFilter?.status
      ? employeeFilter?.status?.toUpperCase()
      : undefined,
  };

  const { data: employeeList, isLoading: employeeListLoading } =
    useGetEmployeeListQuery(
      {
        orgId: user?.organization?._id,
        values: empListParams,
      },
      { skip: !user?.organization?._id },
    );

  const employeeDetails = employeeList?.data?.users;
  const employeeMetaData = employeeList?.data?.meta;

  useEffect(() => {
    setEmployeeDataById(
      employeeList?.data?.users[indexNumbers?.ZERO]?._id ?? null,
    );
  }, [employeeList?.data?.users]);

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
      status: '',
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
    searchAccount,
    setSearchAccount,
    employeeListLoading,
  };
};

export default useUsers;
