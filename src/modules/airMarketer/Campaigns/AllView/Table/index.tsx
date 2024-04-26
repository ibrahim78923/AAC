import TanstackTable from '@/components/Table/TanstackTable';
import { columns, data } from './Table.data';
import { Grid, Stack, Typography } from '@mui/material';
import ActionButton from '../ActionButton';
import Search from '@/components/Search';
import { useState } from 'react';
import { BackArrowIcon } from '@/assets/icons';
import { useRouter } from 'next/router';

const Table = () => {
  const [seacrhBy, setSearchBy] = useState('');
  const router = useRouter();
  return (
    <Grid container>
      <Grid item md={12} lg={12} style={{ justifyContent: 'space-between' }}>
        <Typography variant="h3" onClick={() => router?.back()}>
          <BackArrowIcon /> &nbsp; All View
        </Typography>
      </Grid>
      <Grid xs={12} mt={2}>
        <Stack direction={{ sm: 'row' }} gap={1} justifyContent="space-between">
          <Search
            searchBy={seacrhBy}
            label="Search Here"
            width="260px"
            size="small"
            setSearchBy={setSearchBy}
          />
          <ActionButton />
        </Stack>
      </Grid>

      <Grid md={12} xs={12} mt={2}>
        <TanstackTable columns={columns} data={data} isPagination />,
      </Grid>
    </Grid>
  );
};
export default Table;
