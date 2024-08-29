import { useEffect, useState } from 'react';
import { operationsTeamsListColumnDynamic } from './Teams.data';
import { PAGINATION } from '@/config';
import { useLazyGetTeamListForOperationQuery } from '@/services/airOperations/user-management/user';
import UpsertTeams from './UpsertTeams';
import TeamsDetails from './TeamsDetails';
import { DeleteTeam } from './DeleteTeam';
import {
  TeamIsPortalOpenI,
  TeamPortalComponentPropsI,
} from './Teams.interface';
import {
  LazyQueryTrigger,
  UseLazyQueryLastPromiseInfo,
} from '@reduxjs/toolkit/dist/query/react/buildHooks';

export const useTeams = () => {
  const [isPortalOpen, setIsPortalOpen] = useState<TeamIsPortalOpenI>({});
  const [page, setPage] = useState<number>(PAGINATION?.CURRENT_PAGE);
  const [pageLimit, setPageLimit] = useState<number>(PAGINATION?.PAGE_LIMIT);
  const [search, setSearch] = useState<string>('');

  const [
    lazyGetTeamListForOperationTrigger,
    lazyGetTeamListForOperationStatus,
  ]: [LazyQueryTrigger<any>, any, UseLazyQueryLastPromiseInfo<any>] =
    useLazyGetTeamListForOperationQuery();

  const getOperationsTeamsLists = async (currentPage: number = page) => {
    const apiDataParameter = {
      queryParams: {
        page: currentPage,
        limit: pageLimit,
        search,
      },
    };
    try {
      await lazyGetTeamListForOperationTrigger?.(apiDataParameter)?.unwrap();
    } catch (error: any) {}
  };

  useEffect(() => {
    getOperationsTeamsLists?.();
  }, [page, search, pageLimit]);

  const operationsTeamsListColumn =
    operationsTeamsListColumnDynamic(setIsPortalOpen);

  const portalComponentProps: TeamPortalComponentPropsI = {
    isPortalOpen,
    setIsPortalOpen,
    page,
    setPage,
    pageLimit,
    setPageLimit,
    getOperationsTeamsLists,
    totalRecords: lazyGetTeamListForOperationStatus?.data?.data?.userTeams,
  };

  const renderPortalComponent = () => {
    if (isPortalOpen?.isUpsert) {
      return <UpsertTeams {...portalComponentProps} />;
    }
    if (isPortalOpen?.isView) {
      return <TeamsDetails {...portalComponentProps} />;
    }
    if (isPortalOpen?.isDelete) {
      return <DeleteTeam {...portalComponentProps} />;
    }
    return <></>;
  };

  return {
    operationsTeamsListColumn,
    setPageLimit,
    setPage,
    setSearch,
    isPortalOpen,
    setIsPortalOpen,
    lazyGetTeamListForOperationStatus,
    renderPortalComponent,
  };
};
