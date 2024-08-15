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
import { DeleteUser } from './DeleteUser';
import { UserIsPortalOpenI, UserPortalComponentPropsI } from './User.interface';
import {
  LazyQueryTrigger,
  UseLazyQueryLastPromiseInfo,
} from '@reduxjs/toolkit/dist/query/react/buildHooks';
import { SingleDropdownOptionI } from '@/components/SingleDropdownButton/SingleDropdownButton.interface';

export const useUser = () => {
  const [selectedUserList, setSelectedUserList] = useState<any>([]);
  const [search, setSearch] = useState<string>('');
  const [page, setPage] = useState<number>(PAGINATION?.CURRENT_PAGE);
  const [pageLimit, setPageLimit] = useState<number>(PAGINATION?.PAGE_LIMIT);
  const [isPortalOpen, setIsPortalOpen] = useState<UserIsPortalOpenI>({});
  const [
    lazyGetProductUserListForOperationTrigger,
    lazyGetProductUserListForOperationStatus,
  ]: [LazyQueryTrigger<any>, any, UseLazyQueryLastPromiseInfo<any>] =
    useLazyGetProductUserListForOperationQuery?.();

  const [changeSingleUserStatusTrigger, changeSingleUserStatusStatus] =
    useUpdateProductUserForOperationMutation?.();

  const getOperationUsersList = async (currentPage: number = page) => {
    const apiDataParameter = {
      queryParams: {
        page: currentPage,
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

  const changeOperationUserStatus = async (e: any, id: string) => {
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

  const setSingleUserDetail = (user: { [key: string]: any }) => {
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

  const portalComponentsProps: UserPortalComponentPropsI = {
    isPortalOpen: isPortalOpen,
    setIsPortalOpen: setIsPortalOpen,
    userId: selectedUserList?.[ARRAY_INDEX?.ZERO]?._id,
    setSelectedUserList,
    getOperationUsersList,
    selectedUserList,
    page,
    setPage,
    totalRecords:
      lazyGetProductUserListForOperationStatus?.data?.data?.usercompanyaccounts
        ?.length,
  };

  const renderPortalComponent = () => {
    if (isPortalOpen?.isUpsert) {
      return <UpsertUser {...portalComponentsProps} />;
    }
    if (isPortalOpen?.isDelete) {
      return <DeleteUser {...portalComponentsProps} />;
    }
    return <></>;
  };

  const actionButtonDropdown: SingleDropdownOptionI[] =
    actionsForOperationUserDynamic?.(setIsPortalOpen, selectedUserList);

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
