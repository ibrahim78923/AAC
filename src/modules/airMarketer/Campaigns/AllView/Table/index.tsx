import TanstackTable from '@/components/Table/TanstackTable';
import { columns, data } from './Table.data';
import { Grid, Typography } from '@mui/material';
import ActionButton from '../ActionButton';
import Search from '@/components/Search';
import { useState } from 'react';

const Table = () => {
  const [seacrhBy, setSearchBy] = useState('');
  return (
    <Grid container>
      <Grid
        item
        md={12}
        lg={12}
        style={{ display: 'flex', justifyContent: 'space-between' }}
      >
        <Typography variant="h4">All View</Typography>
      </Grid>
      <Grid md={6}>
        <Search
          searchBy={seacrhBy}
          label="Search Here"
          width="260px"
          size="small"
          setSearchBy={setSearchBy}
        />
      </Grid>
      <Grid md={6} style={{ textAlign: 'end' }}>
        <ActionButton />
      </Grid>
      <Grid md={12} mt={2}>
        <TanstackTable columns={columns} data={data} isPagination />,
      </Grid>
    </Grid>
  );
};
export default Table;
