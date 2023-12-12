import TanstackTable from '@/components/Table/TanstackTable';
import { columns, data } from './Table.data';
import { Grid } from '@mui/material';
import ActionButton from '../ActionButton';
import Search from '@/components/Search';
import { useState } from 'react';

const Table = () => {
  const [seacrhBy, setSearchBy] = useState('');
  return (
    <Grid container>
      <Grid md={6}>
        <Search
          searchBy={seacrhBy}
          label="Search Here"
          width="260px"
          size="small"
          setSearchBy={setSearchBy}
        />
      </Grid>
      <Grid md={6}>
        <ActionButton />
      </Grid>
      <Grid md={12}>
        <TanstackTable columns={columns} data={data} isPagination />,
      </Grid>
    </Grid>
  );
};
export default Table;
