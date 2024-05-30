import { useLazyGetDealsQuery } from '@/services/common-APIs';

const useDealEditorDrawer = () => {
  const dealsListData = useLazyGetDealsQuery();

  return {
    dealsListData,
  };
};

export default useDealEditorDrawer;
