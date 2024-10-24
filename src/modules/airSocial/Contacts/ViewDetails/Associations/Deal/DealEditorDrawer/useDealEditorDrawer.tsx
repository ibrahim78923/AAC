import { useLazyGetCommonDealsListQuery } from '@/services/common-APIs';

const useDealEditorDrawer = () => {
  const dealsListData = useLazyGetCommonDealsListQuery();

  return {
    dealsListData,
  };
};

export default useDealEditorDrawer;
