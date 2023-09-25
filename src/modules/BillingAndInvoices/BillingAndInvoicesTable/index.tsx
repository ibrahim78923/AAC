import Search from '@/components/Search';

function BillingAndInvoicesTable() {
  const handleSearch = () => {};
  return (
    <Search
      onChange={handleSearch}
      label="Search Here By Client Name"
      height={56}
      width="260px"
    />
  );
}

export default BillingAndInvoicesTable;
