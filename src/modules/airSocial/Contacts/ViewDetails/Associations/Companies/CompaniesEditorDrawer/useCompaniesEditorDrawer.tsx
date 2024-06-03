import { useLazyGetAllCompaniesQuery } from '@/services/common-APIs';

const useCompaniesEditorDrawer = () => {
  const companiesListData = useLazyGetAllCompaniesQuery();

  return {
    companiesListData,
  };
};

export default useCompaniesEditorDrawer;
