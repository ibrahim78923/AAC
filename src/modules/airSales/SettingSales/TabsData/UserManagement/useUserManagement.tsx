import { useGetTeamsQuery } from '@/services/airSales/settings/teams';

const useUserManagement = () => {
  // const params = {
  //     page: 1,
  //     limit: 10,
  // }
  const { data: teamsData } = useGetTeamsQuery({});

  return {
    teamsData,
  };
};

export default useUserManagement;
