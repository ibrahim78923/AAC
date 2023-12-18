import Search from '@/components/Search';
import TanstackTable from '@/components/Table/TanstackTable';
import { rulesColumns, rulesList } from './Rules.data';
import { useRules } from './useRules';
import { Box } from '@mui/material';

export const Rules = (props: any) => {
  const { search, setSearch } = useRules(props);
  return (
    <>
      <Search label="Search Here" searchBy={search} setSearchBy={setSearch} />
      <Box marginY={2}></Box>
      <TanstackTable isPagination data={rulesList} columns={rulesColumns} />
    </>
  );
};
