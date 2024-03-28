import { useGetDealsAssociationsQuery } from '@/services/airSales/deals';

const useAssociations = (selected: any) => {
  const { data: assocaitionsCompleteData, isLoading } =
    useGetDealsAssociationsQuery({
      id: selected,
    });
  const assocaitionData = assocaitionsCompleteData?.data;
  return {
    assocaitionData,
    isLoading,
  };
};

export default useAssociations;
