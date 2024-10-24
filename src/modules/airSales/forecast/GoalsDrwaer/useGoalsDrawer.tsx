import { useLazyGetCommonDealPipeLineQuery } from '@/services/common-APIs';

const useGoalsDrawer = () => {
  const dealsListData = useLazyGetCommonDealPipeLineQuery();

  return {
    dealsListData,
  };
};

export default useGoalsDrawer;
