import { useEffect, useState } from 'react';
import { teamList } from './Teams.data';
import { PAGINATION } from '@/config';
import { useLazyGetTeamListForOperationQuery } from '@/services/airOperations/user-management/user';
import UpsertTeams from './UpsertTeams';
import TeamsDetails from './TeamsDetails';
import { DeleteTeam } from './DeleteTeam';

export const useTeams = () => {
  const [isPortalOpen, setIsPortalOpen] = useState<any>({});
  const [page, setPage] = useState(PAGINATION?.CURRENT_PAGE);
  const [pageLimit, setPageLimit] = useState(PAGINATION?.PAGE_LIMIT);
  const [search, setSearch] = useState('');

  const [
    lazyGetTeamListForOperationTrigger,
    lazyGetTeamListForOperationStatus,
  ]: any = useLazyGetTeamListForOperationQuery?.();

  const getOperationUsersList = async () => {
    const apiDataParameter = {
      queryParams: {
        page,
        limit: pageLimit,
        search,
      },
    };
    try {
      await lazyGetTeamListForOperationTrigger?.(apiDataParameter)?.unwrap();
    } catch (error: any) {}
  };

  useEffect(() => {
    getOperationUsersList?.();
  }, [page, search, pageLimit]);

  const teamListColumn = teamList(setIsPortalOpen);

  const portalComponentProps = {
    isPortalOpen,
    setIsPortalOpen,
    page,
    setPage,
    pageLimit,
    setPageLimit,
    getOperationUsersList,
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
    teamListColumn,
    setPageLimit,
    setPage,
    setSearch,
    isPortalOpen,
    setIsPortalOpen,
    lazyGetTeamListForOperationStatus,
    renderPortalComponent,
  };
};
