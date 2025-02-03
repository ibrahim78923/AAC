import { useEffect, useState } from 'react';
import { usersListColumnsDynamic } from './UsersList.data';
import { useLazyGetSoftwareUsersDetailsQuery } from '@/services/airServices/assets/software/single-software-detail/users';
import { PAGINATION } from '@/config';
import { useRouter } from 'next/router';
import { buildQueryParams } from '@/utils/api';

export const useUsersList = (props: any) => {
  const { setUsersData, usersData, page, search } = props;
  const router = useRouter();
  const softwareId: any = router?.query?.softwareId;
  const [filterValues, setFilterValues] = useState<any>({});
  const [limit, setLimit] = useState<number>(PAGINATION?.PAGE_LIMIT);

  const [
    getUserListTrigger,
    { data, isLoading, isFetching, isSuccess, isError },
  ] = useLazyGetSoftwareUsersDetailsQuery();

  const handleGetUser = async (currentPage = page) => {
    const additionalParams = [
      ['page', currentPage + ''],
      ['limit', limit + ''],
      ['search', search],
      ['id', softwareId + ''],
    ];
    const filterData = {
      ...filterValues,
      ...(filterValues?.department?._id
        ? {
            department: {
              _id: filterValues?.department?.name,
            },
          }
        : {}),
    };
    const getUserListParam: any = buildQueryParams(
      additionalParams,
      filterData,
    );

    await getUserListTrigger(getUserListParam);
  };
  useEffect(() => {
    handleGetUser();
  }, [softwareId, page, limit, search, filterValues, getUserListTrigger]);

  const userDetails = data?.data?.softwareusers;
  const metaData = data?.data?.meta;

  const userListColumn = usersListColumnsDynamic(
    usersData,
    setUsersData,
    userDetails,
  );

  return {
    userListColumn,
    userDetails,
    limit,
    setLimit,
    isLoading,
    isFetching,
    isSuccess,
    isError,
    handleGetUser,
    metaData,
    setFilterValues,
    filterValues,
  };
};
