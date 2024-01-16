import { MoreHoriz } from '@mui/icons-material';
import { Box, IconButton, Menu, MenuItem } from '@mui/material';
import { useDepartmentMenu } from './useDepartmentMenu';

export const DepartmentMenu = (props: any) => {
  const {
    handleActionClick,
    openAction,
    handleActionClose,
    actionPop,
    handleEditClick,
    handleDeleteClick,
  } = useDepartmentMenu(props);
  return (
    <>
      <Box display="flex" justifyContent="end">
        <IconButton onClick={handleActionClick}>
          <MoreHoriz sx={{ color: 'secondary.lighter' }} fontSize="medium" />
        </IconButton>
        <Menu
          open={openAction}
          anchorEl={actionPop}
          onClose={handleActionClose}
          sx={{
            '& .MuiPaper-root': { boxShadow: 5, width: '7%' },
          }}
          transformOrigin={{ vertical: 10, horizontal: 100 }}
        >
          <MenuItem onClick={handleEditClick}>Edit</MenuItem>
          <MenuItem onClick={handleDeleteClick}>Delete</MenuItem>
        </Menu>
      </Box>
    </>
  );
};
