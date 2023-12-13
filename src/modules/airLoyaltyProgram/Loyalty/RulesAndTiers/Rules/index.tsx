import Search from '@/components/Search';
import TanstackTable from '@/components/Table/TanstackTable';
import { rulesColumns, rulesList } from './Rules.data';
import { useRules } from './useRules';

export const Rules = () => {
  const { search, setSearch } = useRules();
  return (
    <>
      <Search label="Search Here" searchBy={search} setSearchBy={setSearch} />
      <TanstackTable isPagination data={rulesList} columns={rulesColumns} />
    </>
  );
};
