import { Box, Button, Card, Menu, MenuItem, Typography } from '@mui/material';

import Search from '@/components/Search';
import CustomPagination from '@/components/CustomPagination';
import TanstackTable from '@/components/Tabel/TanstackTable';
import { ORG_ADMIN } from '@/constants';

import { columns, data } from './RoleAndRights.data';
import useRolesAndRights from './useRolesAndRights';
import RoleFilters from './RoleFilters';

import { ArrowDropDown } from '@mui/icons-material';
import { FilterSharedIcon, PlusIcon } from '@/assets/icons';

const RolesAndRights = () => {
  const {
    navigate,
    theme,
    selectedValue,
    isOpenFilterDrawer,
    setIsOpenFilterDrawer,
    handleClose,
    handleClick,
  } = useRolesAndRights();

  return (
    <Card sx={{ pt: '24px' }}>
      <Box
        justifyContent="space-between"
        alignItems="center"
        sx={{ padding: '0px 24px', display: { md: 'flex' } }}
      >
        <Typography variant="h3">Roles and Rights</Typography>
        <Button
          onClick={() => {
            navigate.push(ORG_ADMIN?.ADD_ROLE);
          }}
          variant="contained"
          startIcon={<PlusIcon />}
        >
          Add Role
        </Button>
      </Box>
      <Box
        justifyContent="space-between"
        alignItems="center"
        sx={{ padding: '0px 24px', display: { md: 'flex' }, my: 2 }}
      >
        <Search placeholder="Search Here" size="small" />
        <Box sx={{ display: 'flex', gap: '10px' }}>
          <Box>
            <Button
              onClick={handleClick}
              sx={{
                border: `1px solid ${theme?.palette?.custom?.dark}`,
                color: theme?.palette?.custom?.main,
                width: '112px',
                height: '36px',
              }}
            >
              Actions
              <ArrowDropDown />
            </Button>
            <Menu
              id="simple-menu"
              anchorEl={selectedValue}
              open={Boolean(selectedValue)}
              onClose={handleClose}
            >
              <MenuItem
                onClick={() => {
                  handleClose;
                  navigate.push(ORG_ADMIN?.ADD_ROLE);
                }}
              >
                Edit
              </MenuItem>
              <MenuItem
                onClick={() => {
                  handleClose;
                  navigate.push(ORG_ADMIN?.ADD_ROLE);
                }}
              >
                View
              </MenuItem>
            </Menu>
          </Box>
          <Button
            onClick={() => {
              setIsOpenFilterDrawer(true);
            }}
            startIcon={<FilterSharedIcon />}
            sx={{
              border: `1px solid ${theme?.palette?.custom?.dark}`,
              color: theme?.palette?.custom?.main,
              width: '95px',
              height: '36px',
            }}
          >
            Filter
          </Button>
        </Box>
      </Box>
      <TanstackTable columns={columns} data={data} />
      <CustomPagination count={1} rowsPerPageOptions={[1, 2]} entriePages={1} />

      {isOpenFilterDrawer && (
        <RoleFilters
          isOpen={isOpenFilterDrawer}
          setIsOpen={() => {
            setIsOpenFilterDrawer(false);
          }}
        />
      )}
    </Card>
  );
};

export default RolesAndRights;
