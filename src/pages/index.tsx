import { Button, ButtonGroup } from '@mui/material';

import Layout from '@/layout';
import TanstackTable from '@/components/Tabel/TanstackTable';

export default function Home() {
  return (
    <>
      <ButtonGroup variant="contained" color="primary">
        <Button>Add Button</Button>
      </ButtonGroup>

      <ButtonGroup variant="contained" color="error">
        <Button variant="contained" color="error">
          Add Button
        </Button>
      </ButtonGroup>
      <ButtonGroup variant="contained" color="success">
        <Button>Add Button</Button>
      </ButtonGroup>
      <ButtonGroup>
        <Button>Add Button</Button>
      </ButtonGroup>
      <TanstackTable />
    </>
  );
}
Home.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};
