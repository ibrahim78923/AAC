import { useState } from 'react';
import { useRouter } from 'next/router';
import { useGetCommonContractTemplatesQuery } from '@/services/commonFeatures/contracts';
import { ENUM_TEMPLATE_CATEGORIES } from '@/utils/contracts';
import { AIR_SOCIAL_CONTRACTS } from '@/constants/routes';

export default function useContractTemplates() {
  const router = useRouter();
  const { folderId } = router?.query;
  const [searchBy, setSearchBy] = useState();

  const {
    data: contractTemplatesData,
    isLoading: loadingGetTemplates,
    isFetching: fetchingGetTemplates,
  } = useGetCommonContractTemplatesQuery({ meta: false });

  const {
    data: myTemplatesData,
    isLoading: loadingMyTemplates,
    isFetching: fetchingMyTemplates,
  } = useGetCommonContractTemplatesQuery({
    meta: false,
    category: ENUM_TEMPLATE_CATEGORIES?.MY_TEMPLATES,
  });

  const {
    data: recentlyUsedTemplatesData,
    isLoading: loadingRecentlyUsedTemplates,
    isFetching: fetchingRecentlyUsedTemplates,
  } = useGetCommonContractTemplatesQuery({
    meta: false,
    category: ENUM_TEMPLATE_CATEGORIES?.RECENTLY_USED,
    limit: 5,
  });

  const handleClickTemplateView = (templateId: string) => {
    router?.push({
      pathname: AIR_SOCIAL_CONTRACTS?.CONTRACTS_CREATE,
      query: { folderId: folderId, templateId: templateId },
    });
  };

  return {
    router,
    folderId,
    searchBy,
    setSearchBy,

    myTemplatesData,
    loadingMyTemplates,
    fetchingMyTemplates,

    loadingGetTemplates,
    fetchingGetTemplates,
    contractTemplatesData,

    recentlyUsedTemplatesData,
    loadingRecentlyUsedTemplates,
    fetchingRecentlyUsedTemplates,

    handleClickTemplateView,
  };
}
