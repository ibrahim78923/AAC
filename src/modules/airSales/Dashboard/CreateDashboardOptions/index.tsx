import { Button } from '@mui/material';
import { ArrowDropDown } from '@mui/icons-material';

const CreateDashboardOptions = () => {
  return (
    <div>
      <Button sx={{ border: '1px solid #D1D5DB', color: '#6B7280' }}>
        <ArrowDropDown />
        Dashboards
      </Button>
    </div>
  );
};
export default CreateDashboardOptions;
