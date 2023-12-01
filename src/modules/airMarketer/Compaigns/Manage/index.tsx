import CustomPagination from '@/components/CustomPagination';

import TanstackTable from '@/components/Table/TanstackTable';

import { columns, data } from './Manage.data';
import { Box, Button } from '@mui/material';

const Manage = () => {
  return (
    <>
      <Box style={{ paddingBottom: '15px' }}>
        <Button variant="outlined" color="inherit" className="small">
          All Compaigns
        </Button>
        <Button variant="outlined" color="inherit" className="small">
          Starting this quarter
        </Button>
        <Button variant="outlined" color="inherit" className="small">
          Recently created
        </Button>
        <Button variant="outlined" color="inherit" className="small">
          Matt Anderson first view
        </Button>
      </Box>
      <TanstackTable columns={columns} data={data} />
      <CustomPagination count={1} rowsPerPageOptions={[1, 2]} entriePages={1} />
    </>
  );
};

export default Manage;
