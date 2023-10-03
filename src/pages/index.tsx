import { Button, ButtonGroup } from '@mui/material';

import Layout from '@/layouts/Layout';

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
    </>
  );
}
Home.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};
