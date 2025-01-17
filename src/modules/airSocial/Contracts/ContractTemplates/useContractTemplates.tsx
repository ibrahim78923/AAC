import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useGetCommonContractTemplatesByFolderQuery } from '@/services/commonFeatures/contracts';

export default function useContractTemplates() {
  const router = useRouter();
  const [searchBy, setSearchBy] = useState();

  const {
    data: contractTemplatesData,
    isLoading: loadingGetTemplates,
    isFetching: fetchingGetTemplates,
  } = useGetCommonContractTemplatesByFolderQuery({ meta: false });

  return {
    router,
    searchBy,
    setSearchBy,
    loadingGetTemplates,
    fetchingGetTemplates,
    contractTemplatesData,
  };
}
