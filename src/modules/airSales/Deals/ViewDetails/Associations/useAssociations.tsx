import { useGetDealsAssociationsQuery } from '@/services/airSales/deals';
import { useState } from 'react';

const useAssociations = (selected: any) => {
  const [searchContacts, setSearchContacts] = useState('');
  const [searchCompanies, setSearchCompanies] = useState('');
  const [searchQuotes, setSearchQuotes] = useState('');

  const associationParams = {
    searchContact: searchContacts ? searchContacts : undefined,
    searchCompany: searchCompanies ? searchCompanies : undefined,
    searchQuote: searchQuotes ? searchQuotes : undefined,
  };

  const {
    data: assocaitionsCompleteData,
    isLoading,
    isFetching: associationDataFetching,
  } = useGetDealsAssociationsQuery({ id: selected, params: associationParams });

  const assocaitionData = assocaitionsCompleteData?.data;

  return {
    assocaitionData,
    isLoading,
    setSearchContacts,
    setSearchCompanies,
    setSearchQuotes,
    associationDataFetching,
  };
};

export default useAssociations;
