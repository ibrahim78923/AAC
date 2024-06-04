import { PAGINATION } from '@/config';
import { useEffect, useState } from 'react';
import { useUpdateProductUserForLoyaltyMutation } from '@/services/airLoyaltyProgram/user-management/user';
import { PRODUCT_USER_STATUS } from '@/constants/strings';
import { buildQueryParams, errorSnackbar } from '@/utils/api';
import {
  actionsForReportListsDynamic,
  reportListsColumnsDynamic,
} from './ReportLists.data';
import { CloneReport } from '../CloneReport';
import { DeleteReport } from '../DeleteReport';
import { RenameReport } from '../RenameReport';
import { ChangeReportOwner } from '../ChangeReportOwner';
import { EmailReport } from '../EmailReport';
import { FilterReport } from '../FilterReport';

export const useReportLists = (props: any) => {
  const { filter, apiQuery } = props;
  const [search, setSearch] = useState('');
  const [selectedReportLists, setSelectedReportLists] = useState<any>([]);
  const [page, setPage] = useState(PAGINATION?.CURRENT_PAGE);
  const [pageLimit, setPageLimit] = useState(PAGINATION?.PAGE_LIMIT);
  const [isPortalOpen, setIsPortalOpen] = useState<any>({});
  const [reportFilters, setReportFilter] = useState<any>({});

  const [
    lazyGetProductUserListForLoyaltyTrigger,
    lazyGetProductUserListForLoyaltyStatus,
  ]: any = apiQuery;

  const [changeSingleUserStatusTrigger, changeSingleUserStatusStatus]: any =
    useUpdateProductUserForLoyaltyMutation?.();

  const getLoyaltyUsersList = async (
    currentPage = page,
    filterReports = reportFilters,
  ) => {
    const additionalParams = [
      ['page', currentPage + ''],
      ['limit', pageLimit + ''],
      ['search', search],
      ...(filter ? [['filter', filter]] : []),
    ];
    const getInventoryParam: any = buildQueryParams(
      additionalParams,
      filterReports,
    );

    const apiDataParameter = {
      queryParams: getInventoryParam,
    };

    try {
      await lazyGetProductUserListForLoyaltyTrigger?.(
        apiDataParameter,
      )?.unwrap();
    } catch (error: any) {}
  };

  useEffect(() => {
    getLoyaltyUsersList?.();
  }, [page, pageLimit, search, reportFilters]);

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

  const userListColumns = reportListsColumnsDynamic?.(
    selectedReportLists,
    setSelectedReportLists,
    lazyGetProductUserListForLoyaltyStatus?.data?.data?.usercompanyaccounts,
    changeLoyaltyUserStatus,
    changeSingleUserStatusStatus,
  );

  const renderPortalComponent = () => {
    if (isPortalOpen?.isClone) {
      return (
        <CloneReport
          isPortalOpen={isPortalOpen}
          setIsPortalOpen={setIsPortalOpen}
          setSelectedReportLists={setSelectedReportLists}
          selectedReportLists={selectedReportLists}
        />
      );
    }
    if (isPortalOpen?.isEmail) {
      return (
        <EmailReport
          isPortalOpen={isPortalOpen}
          setIsPortalOpen={setIsPortalOpen}
          setSelectedReportLists={setSelectedReportLists}
          selectedReportLists={selectedReportLists}
        />
      );
    }
    if (isPortalOpen?.isChangeOwner) {
      return (
        <ChangeReportOwner
          isPortalOpen={isPortalOpen}
          setIsPortalOpen={setIsPortalOpen}
          setSelectedReportLists={setSelectedReportLists}
          selectedReportLists={selectedReportLists}
        />
      );
    }
    if (isPortalOpen?.isRename) {
      return (
        <RenameReport
          isPortalOpen={isPortalOpen}
          setIsPortalOpen={setIsPortalOpen}
          setSelectedReportLists={setSelectedReportLists}
          selectedReportLists={selectedReportLists}
        />
      );
    }
    if (isPortalOpen?.isDelete) {
      return (
        <DeleteReport
          isPortalOpen={isPortalOpen}
          setIsPortalOpen={setIsPortalOpen}
          setSelectedReportLists={setSelectedReportLists}
          selectedReportLists={selectedReportLists}
        />
      );
    }
    if (isPortalOpen?.isFilter) {
      return (
        <FilterReport
          isPortalOpen={isPortalOpen}
          setIsPortalOpen={setIsPortalOpen}
          setSelectedReportLists={setSelectedReportLists}
          selectedReportLists={selectedReportLists}
          reportFilters={reportFilters}
          setReportFilter={setReportFilter}
        />
      );
    }
    return <></>;
  };
  const actionButtonDropdown = actionsForReportListsDynamic?.(
    setIsPortalOpen,
    selectedReportLists,
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
    actionButtonDropdown,
    setSelectedReportLists,
    selectedReportLists,
  };
};
