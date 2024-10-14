import { useLazyGetCommonAllCompaniesQuery } from '@/services/common-APIs';

const useCompaniesEditorDrawer = () => {
  const companiesListData = useLazyGetCommonAllCompaniesQuery();

  return {
    companiesListData,
  };
};

export default useCompaniesEditorDrawer;
