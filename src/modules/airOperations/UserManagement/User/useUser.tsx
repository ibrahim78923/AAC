import { PAGINATION } from '@/config';
import { useEffect, useState } from 'react';
import {
  actionsForOperationUserDynamic,
  operationUsersColumnsDynamic,
} from './User.data';
import { ARRAY_INDEX, PRODUCT_USER_STATUS } from '@/constants/strings';
import { errorSnackbar } from '@/utils/api';
import { UpsertUser } from './UpsertUser';
import {
  useLazyGetProductUserListForOperationQuery,
  useUpdateProductUserForOperationMutation,
} from '@/services/airOperations/user-management/user';

export const useUser = () => {
  const [search, setSearch] = useState('');
  const [selectedUserList, setSelectedUserList] = useState<any>([]);
  const [page, setPage] = useState(PAGINATION?.CURRENT_PAGE);
  const [pageLimit, setPageLimit] = useState(PAGINATION?.PAGE_LIMIT);
  const [isPortalOpen, setIsPortalOpen] = useState<any>({});
  const [
    lazyGetProductUserListForOperationTrigger,
    lazyGetProductUserListForOperationStatus,
  ]: any = useLazyGetProductUserListForOperationQuery?.();

  const [changeSingleUserStatusTrigger, changeSingleUserStatusStatus]: any =
    useUpdateProductUserForOperationMutation?.();

  const getOperationUsersList = async () => {
    const apiDataParameter = {
      queryParams: {
        page,
        limit: pageLimit,
        search,
      },
    };
    try {
      await lazyGetProductUserListForOperationTrigger?.(
        apiDataParameter,
      )?.unwrap();
    } catch (error: any) {}
  };

  useEffect(() => {
    getOperationUsersList?.();
  }, [page, search, pageLimit]);

  const changeOperationUserStatus = async (e: any, id: any) => {
    const body = {
      status: e?.target?.checked
        ? PRODUCT_USER_STATUS?.ACTIVE
        : PRODUCT_USER_STATUS?.INACTIVE,
    };

    const apiDataParameter = {
      pathParams: {
        id,
      },
      body,
    };

    try {
      await changeSingleUserStatusTrigger(apiDataParameter)?.unwrap();
    } catch (error: any) {
      errorSnackbar?.(error?.data?.message);
    }
  };
  const setSingleUserDetail = (user: any) => {
    setSelectedUserList?.([user]);
    setIsPortalOpen?.({
      isOpen: true,
      isUpsert: true,
      isView: true,
    });
  };

  const userListColumns = operationUsersColumnsDynamic?.(
    selectedUserList,
    setSelectedUserList,
    lazyGetProductUserListForOperationStatus?.data?.data?.usercompanyaccounts,
    changeOperationUserStatus,
    changeSingleUserStatusStatus,
    setSingleUserDetail,
  );
  const renderPortalComponent = () => {
    if (isPortalOpen?.isUpsert) {
      return (
        <UpsertUser
          isPortalOpen={isPortalOpen}
          setIsPortalOpen={setIsPortalOpen}
          userId={selectedUserList?.[ARRAY_INDEX?.ZERO]?._id}
          setSelectedUserList={setSelectedUserList}
        />
      );
    }
    return <></>;
  };
  const actionButtonDropdown = actionsForOperationUserDynamic?.(
    setIsPortalOpen,
    selectedUserList,
  );

  return {
    userListColumns,
    setSearch,
    setPageLimit,
    setPage,
    lazyGetProductUserListForOperationStatus,
    setIsPortalOpen,
    isPortalOpen,
    renderPortalComponent,
    setSelectedUserList,
    actionButtonDropdown,
    selectedUserList,
  };
};
