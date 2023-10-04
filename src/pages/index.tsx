import { Button, ButtonGroup } from '@mui/material';

import Layout from '@/layout';
import Coversation from '@/modules/ServicesTicket/SingleTicketDetail/Coversation';

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
      <Coversation />
    </>
  );
}
Home.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};
