import Search from '@/components/Search';
import TanstackTable from '@/components/Table/TanstackTable';
import { tiersColumns, tiersList } from './Tiers.data';
import { useTiers } from './useTiers';
import { Box } from '@mui/material';

export const Tiers = () => {
  const { search, setSearch } = useTiers();
  return (
    <Box>
      <Search label="Search Here" searchBy={search} setSearchBy={setSearch} />
      <Box marginY={2}></Box>
      <TanstackTable isPagination data={tiersList} columns={tiersColumns} />
    </Box>
  );
};
