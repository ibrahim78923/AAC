import { useGetDealsAssociationsQuery } from '@/services/airSales/deals';

const useAssociations = () => {
  const { data } = useGetDealsAssociationsQuery({});
  return {
    assocaitionData: data?.data,
  };
};

export default useAssociations;
