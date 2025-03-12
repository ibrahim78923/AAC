import { useState } from 'react';
import { useRouter } from 'next/router';
import { useGetCommonContractTemplatesQuery } from '@/services/commonFeatures/contracts';
import { ENUM_TEMPLATE_CATEGORIES } from '@/utils/contracts';
import { AIR_SOCIAL_CONTRACTS } from '@/constants/routes';

export default function useContractTemplates() {
  const router = useRouter();
  const { folderId } = router?.query;
  const [searchBy, setSearchBy] = useState();

  let searchParams;
  if (searchBy) {
    searchParams = { search: searchBy };
  }

  const {
    data: contractTemplatesData,
    isLoading: loadingGetTemplates,
    isFetching: fetchingGetTemplates,
  } = useGetCommonContractTemplatesQuery({ meta: false, ...searchParams });

  const {
    data: myTemplatesData,
    isLoading: loadingMyTemplates,
    isFetching: fetchingMyTemplates,
  } = useGetCommonContractTemplatesQuery({
    meta: false,
    category: ENUM_TEMPLATE_CATEGORIES?.MY_TEMPLATES,
    ...searchParams,
  });

  const {
    data: recentlyUsedTemplatesData,
    isLoading: loadingRecentlyUsedTemplates,
    isFetching: fetchingRecentlyUsedTemplates,
  } = useGetCommonContractTemplatesQuery({
    meta: false,
    category: ENUM_TEMPLATE_CATEGORIES?.RECENTLY_USED,
    limit: 5,
    ...searchParams,
  });

  const handleClickTemplateView = (data: any) => {
    if (data?.contractType === 'PDF') {
      router?.push({
        pathname: AIR_SOCIAL_CONTRACTS?.CONTRACTS_CREATE,
        query: {
          contractType: 'PDF',
          folderId: folderId,
          templateId: data?._id,
        },
      });
    } else {
      router?.push({
        pathname: AIR_SOCIAL_CONTRACTS?.CONTRACTS_CREATE,
        query: { folderId: folderId, templateId: data?._id },
      });
    }
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
