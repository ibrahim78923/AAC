import { Button, Menu, MenuItem, Fade, useTheme } from '@mui/material';
import { ArrowDropDown } from '@mui/icons-material';

import useCreateDashboardOptions from './useCreateDashboardOptions';

const CreateDashboardOptions = ({ toggle }: any) => {
  const { handleCloseMenuOptions, anchorEl, openDropDown, handleClickActions } =
    useCreateDashboardOptions();
  const theme = useTheme();
  return (
    <div>
      <Button
        className="small"
        sx={{
          border: `1px solid ${theme?.palette?.custom?.dark}`,
          color: theme?.palette?.custom?.main,
          width: '120px',
        }}
        onClick={handleClickActions}
      >
        <ArrowDropDown />
        Dashboards
      </Button>
      <Menu
        id="fade-menu"
        MenuListProps={{
          'aria-labelledby': 'fade-button',
        }}
        anchorEl={anchorEl}
        open={openDropDown}
        onClose={handleCloseMenuOptions}
        TransitionComponent={Fade}
      >
        <MenuItem onClick={() => toggle()}>Manage Dashboards</MenuItem>
      </Menu>
    </div>
  );
};
export default CreateDashboardOptions;
