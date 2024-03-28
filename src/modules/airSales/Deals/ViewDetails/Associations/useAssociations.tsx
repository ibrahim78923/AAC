import { useGetDealsAssociationsQuery } from '@/services/airSales/deals';
import { useState } from 'react';

const useAssociations = (selected: any) => {
  const [search, setSearch] = useState({
    searchContacts: '',
    searchCompanies: '',
  });

  const handleContactSearch = (val: string) => {
    setSearch({ ...search, searchContacts: val });
  };
  const handleComapanySearch = (val: string) => {
    setSearch({ ...search, searchCompanies: val });
  };
  const associationParams = {
    ...(search?.searchContacts && { searchContact: search?.searchContacts }),
    ...(search?.searchCompanies && { searchContact: search?.searchCompanies }),
  };
  const { data: assocaitionsCompleteData, isLoading } =
    useGetDealsAssociationsQuery({ id: selected, params: associationParams });

  const assocaitionData = assocaitionsCompleteData?.data;
  return {
    assocaitionData,
    isLoading,
    handleContactSearch,
    handleComapanySearch,
  };
};

export default useAssociations;
