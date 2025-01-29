import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  useGetCommonContractTemplatesByFolderQuery,
  useGetCommonContractTemplateRecentlyUsedQuery,
} from '@/services/commonFeatures/contracts';

export default function useContractTemplates() {
  const router = useRouter();
  const [searchBy, setSearchBy] = useState();

  const {
    data: contractTemplatesData,
    isLoading: loadingGetTemplates,
    isFetching: fetchingGetTemplates,
  } = useGetCommonContractTemplatesByFolderQuery({ meta: false });

  const {
    data: recentlyUsedTemplatesData,
    isLoading: loadingRecentlyUsedTemplates,
    isFetching: fetchingRecentlyUsedTemplates,
  } = useGetCommonContractTemplateRecentlyUsedQuery({});

  return {
    router,
    searchBy,
    setSearchBy,

    loadingGetTemplates,
    fetchingGetTemplates,
    contractTemplatesData,

    recentlyUsedTemplatesData,
    loadingRecentlyUsedTemplates,
    fetchingRecentlyUsedTemplates,
  };
}
