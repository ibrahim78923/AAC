import TanstackTable from '@/components/Table/TanstackTable';
import { columns, data } from './Table.data';
import { Grid } from '@mui/material';
import ActionButton from '../ActionButton';

const Table = () => {
  return (
    <Grid container>
      <Grid md={12}>
        <ActionButton />
      </Grid>
      <Grid md={12}>
        <TanstackTable columns={columns} data={data} isPagination />,
      </Grid>
    </Grid>
  );
};
export default Table;
