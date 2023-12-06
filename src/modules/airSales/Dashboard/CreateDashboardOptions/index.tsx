import { Button, Menu, MenuItem, Fade, useTheme } from '@mui/material';
import { ArrowDropDown } from '@mui/icons-material';

import useCreateDashboardOptions from './useCreateDashboardOptions';
import { CheckMarkIcon } from '@/assets/icons';

const CreateDashboardOptions = ({ toggle }: any) => {
  const { handleCloseMenuOptions, anchorEl, openDropDown, handleClickActions } =
    useCreateDashboardOptions();
  const theme = useTheme();
  return (
    <div>
      <Button
        className="small"
        variant="outlined"
        color="inherit"
        sx={{
          padding: '0px 18px 0px 18px',
        }}
        onClick={handleClickActions}
      >
        Dashboards
        <ArrowDropDown />
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
        <MenuItem>
          Sales_1{' '}
          <Button
            sx={{ marginLeft: '30px', border: 'none' }}
            className="small"
            variant="outlined"
            onClick={handleClickActions}
          >
            Default
            <CheckMarkIcon />
          </Button>
        </MenuItem>
        <MenuItem>Sales_2</MenuItem>
        <MenuItem>Sales_3</MenuItem>
        <MenuItem>Sales_4</MenuItem>
        <MenuItem onClick={() => toggle()}>
          <Button
            sx={{
              color: theme?.palette?.grey[500],
            }}
            variant="outlined"
            color="inherit"
          >
            Manage Dashboards
          </Button>
        </MenuItem>
      </Menu>
    </div>
  );
};
export default CreateDashboardOptions;
