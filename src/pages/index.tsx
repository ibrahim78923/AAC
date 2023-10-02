import { Button, ButtonGroup } from '@mui/material';

import SuperAdminLayout from '@/layouts/SuperAdminLayout/SuperAdminLayout';

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
  return <SuperAdminLayout>{page}</SuperAdminLayout>;
};
