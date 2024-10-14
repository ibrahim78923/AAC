import { PAGINATION } from '@/config';
import { setSearch } from '@/redux/slices/airLoyaltyProgram/rules/slice';
import { useAppDispatch } from '@/redux/store';

export const useRules = () => {
  const dispatch = useAppDispatch();

  const handleSetSearch = (newSearch: any) => {
    dispatch(
      setSearch<any>({
        searchTerm: newSearch,
        page: PAGINATION?.CURRENT_PAGE,
      }),
    );
  };

  return {
    handleSetSearch,
  };
};
