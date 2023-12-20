import { Box, Button, Menu, MenuItem } from '@mui/material';
import { ArrowDropDown } from '@mui/icons-material';
import useRolesAndRights from '../useRolesAndRights';
import { ORG_ADMIN } from '@/constants';
import { rolesAndRightsAPI } from '@/services/orgAdmin/roles-and-rights';

const ActionButton = (props?: any) => {
  const { checkedRows } = props;
  const { selectedValue, handleClick, handleClose, navigate } =
    useRolesAndRights();

  const { useGetPermissionsRolesByIdQuery } = rolesAndRightsAPI;

  const { data: viewPerdetails } = useGetPermissionsRolesByIdQuery(checkedRows);
  return (
    <Box sx={{ width: { xs: '100%', sm: 'auto' } }}>
      <Button
        className="small"
        variant="outlined"
        color="inherit"
        onClick={handleClick}
        disabled={checkedRows === undefined ? true : false}
        sx={{ width: { sm: '112px', xs: '100%' } }}
      >
        Actions
        <ArrowDropDown />
      </Button>
      <Menu
        sx={{
          '.MuiPopover-paper': {
            minWidth: '115px',
          },
        }}
        id="simple-menu"
        anchorEl={selectedValue}
        open={Boolean(selectedValue)}
        onClose={handleClose}
      >
        <MenuItem
          onClick={() => {
            handleClose();
            navigate?.push({
              pathname: ORG_ADMIN?.ADD_ROLE,
              query: { data: JSON.stringify(viewPerdetails), type: 'view' },
            });
          }}
        >
          View
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleClose();
            navigate?.push({
              pathname: ORG_ADMIN?.ADD_ROLE,
              query: { data: JSON.stringify(viewPerdetails), type: 'edit' },
            });
          }}
        >
          Edit
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default ActionButton;
