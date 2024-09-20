import { useGetTeamsByIdForOperationQuery } from '@/services/airOperations/user-management/user';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { setIsPortalClose } from '@/redux/slices/airOperations/teams/slice';

export const useTeamsDetails = () => {
  const dispatch = useAppDispatch();
  const isPortalOpen = useAppSelector(
    (state) => state?.operationsTeam?.isPortalOpen,
  );

  const { data, isLoading, isFetching, isError, refetch }: any =
    useGetTeamsByIdForOperationQuery(isPortalOpen?.data?._id, {
      refetchOnMountOrArgChange: true,
      skip: !!!isPortalOpen?.data?._id,
    });

  const teamDataArray = data?.data?.accounts || [];

  const closeDrawer = () => {
    dispatch(setIsPortalClose());
  };

  return {
    teamDataArray,
    data,
    isLoading,
    closeDrawer,
    isFetching,
    isError,
    refetch,
    isPortalOpen,
  };
};
