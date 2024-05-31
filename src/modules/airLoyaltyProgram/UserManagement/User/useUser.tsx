import { PAGINATION } from '@/config';
import { useEffect, useState } from 'react';
import {
  actionsForLoyaltyUserDynamic,
  loyaltyUsersColumnsDynamic,
} from './User.data';
import {
  useLazyGetProductUserListForLoyaltyQuery,
  useUpdateProductUserForLoyaltyMutation,
} from '@/services/airLoyaltyProgram/user-management/user';
import { ARRAY_INDEX, PRODUCT_USER_STATUS } from '@/constants/strings';
import { errorSnackbar } from '@/utils/api';
import { UpsertUser } from '../UpsertUser';

export const useUser = () => {
  const [search, setSearch] = useState('');
  const [selectedUserList, setSelectedUserList] = useState<any>([]);
  const [page, setPage] = useState(PAGINATION?.CURRENT_PAGE);
  const [pageLimit, setPageLimit] = useState(PAGINATION?.PAGE_LIMIT);
  const [isPortalOpen, setIsPortalOpen] = useState<any>({});
  const [
    lazyGetProductUserListForLoyaltyTrigger,
    lazyGetProductUserListForLoyaltyStatus,
  ]: any = useLazyGetProductUserListForLoyaltyQuery?.();

  const [changeSingleUserStatusTrigger, changeSingleUserStatusStatus]: any =
    useUpdateProductUserForLoyaltyMutation?.();

  const getLoyaltyUsersList = async () => {
    const apiDataParameter = {
      queryParams: {
        page,
        limit: pageLimit,
        search,
      },
    };
    try {
      await lazyGetProductUserListForLoyaltyTrigger?.(
        apiDataParameter,
      )?.unwrap();
    } catch (error: any) {}
  };

  useEffect(() => {
    getLoyaltyUsersList?.();
  }, [page, search, pageLimit]);

  const changeLoyaltyUserStatus = async (e: any, id: any) => {
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

  const userListColumns = loyaltyUsersColumnsDynamic?.(
    selectedUserList,
    setSelectedUserList,
    lazyGetProductUserListForLoyaltyStatus?.data?.data?.usercompanyaccounts,
    changeLoyaltyUserStatus,
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
  const actionButtonDropdown = actionsForLoyaltyUserDynamic?.(
    setIsPortalOpen,
    selectedUserList,
  );

  return {
    userListColumns,
    setSearch,
    setPageLimit,
    setPage,
    lazyGetProductUserListForLoyaltyStatus,
    setIsPortalOpen,
    isPortalOpen,
    changeLoyaltyUserStatus,
    changeSingleUserStatusStatus,
    renderPortalComponent,
    setSelectedUserList,
    actionButtonDropdown,
    selectedUserList,
  };
};
