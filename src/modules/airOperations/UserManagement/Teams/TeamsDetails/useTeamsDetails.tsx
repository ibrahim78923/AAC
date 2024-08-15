import { useGetTeamsByIdForOperationQuery } from '@/services/airOperations/user-management/user';
import { TeamPortalComponentPropsI } from '../Teams.interface';

export const useTeamsDetails = (props: TeamPortalComponentPropsI) => {
  const { setIsPortalOpen, isPortalOpen } = props;

  const { data, isLoading, isFetching, isError, refetch }: any =
    useGetTeamsByIdForOperationQuery(isPortalOpen?.data?._id, {
      refetchOnMountOrArgChange: true,
      skip: !!!isPortalOpen?.data?._id,
    });

  const teamDataArray = data?.data?.accounts || [];

  const closeDrawer = () => {
    setIsPortalOpen({});
  };

  return {
    teamDataArray,
    data,
    isLoading,
    closeDrawer,
    isFetching,
    isError,
    refetch,
  };
};
