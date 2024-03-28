import { useGetDealsAssociationsQuery } from '@/services/airSales/deals';

const useAssociations = (selected: any) => {
  const { data: assocaitionsCompleteData } = useGetDealsAssociationsQuery({
    id: selected,
  });
  const assocaitionData = assocaitionsCompleteData?.data;
  return {
    assocaitionData,
  };
};

export default useAssociations;
