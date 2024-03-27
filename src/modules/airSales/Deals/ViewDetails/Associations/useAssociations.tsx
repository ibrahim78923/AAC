import { useGetDealsAssociationsQuery } from '@/services/airSales/deals';

const useAssociations = (selected: any) => {
  // const [searchName, setSearchName] = useState('');
  // const associationsParams = {
  //   search: '',
  // };
  const { data: assocaitionsCompleteData } = useGetDealsAssociationsQuery({
    id: selected,
  });
  const assocaitionData = assocaitionsCompleteData?.data;
  return {
    assocaitionData,
  };
};

export default useAssociations;
