import Search from '@/components/Search';
import TanstackTable from '@/components/Table/TanstackTable';
import { tiersColumns, tiersList } from './Tiers.data';
import { useTiers } from './useTiers';
import { UpsertTier } from './UpsertTier';

export const Tiers = () => {
  const { search, setSearch } = useTiers();
  return (
    <>
      <Search label="Search Here" searchBy={search} setSearchBy={setSearch} />
      <br />
      <TanstackTable isPagination data={tiersList} columns={tiersColumns} />
      <UpsertTier />
    </>
  );
};
