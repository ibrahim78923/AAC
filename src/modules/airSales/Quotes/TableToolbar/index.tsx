import React, { FC } from 'react';
import { Box, Button, Menu, MenuItem, Tooltip } from '@mui/material';
import Search from '@/components/Search';
import {
  CustomizeIcon,
  DropdownIcon,
  FilterSharedIcon,
  RefreshSharedIcon,
} from '@/assets/icons';
import useQuotes from '../useQuotes';
import { TableToolbarI } from './TableToolbar.interface';
import { styles } from './TableToolbar.style';
import { AIR_SALES_QUOTES_MANAGE_QUOTES_PERMISSIONS } from '@/constants/permission-keys';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';

const TableToolbar: FC<TableToolbarI> = ({
  setSearchValue,
  handleFilters,
  handleCustomizeColumns,
  handleResetFilters,
  handleEditQuote,
  handleViewQuote,
  handleOpenDeleteQuote,
  isActionsDisabled,
  rowId,
}) => {
  const {
    actionsEl,
    openActionsDropdown,
    handleActionsDropdown,
    handleActionsDropdownClose,
  } = useQuotes();

  return (
    <Box sx={styles?.tableToolbar}>
      <Box>
        <PermissionsGuard
          permissions={[
            AIR_SALES_QUOTES_MANAGE_QUOTES_PERMISSIONS?.SEARCH_FILTER,
          ]}
        >
          <Search
            setSearchBy={setSearchValue}
            label="Search Here"
            size="small"
            width={'100%'}
          />
        </PermissionsGuard>
      </Box>
      <Box
        sx={{
          display: 'flex',
          gap: '8px',
          flexWrap: 'wrap',
          marginTop: { xs: '5px', md: '15px', lg: '0px' },
        }}
      >
        <Box sx={{ width: { xs: '100%', sm: 'fit-Content' } }}>
          <Button
            className="small"
            sx={styles?.actionButton}
            endIcon={<DropdownIcon />}
            onClick={handleActionsDropdown}
            disabled={isActionsDisabled}
            style={{ width: '100%' }}
          >
            Actions
          </Button>
          <Menu
            anchorEl={actionsEl}
            open={openActionsDropdown}
            onClose={handleActionsDropdownClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            sx={{
              '& .MuiList-root': {
                minWidth: '112px',
              },
            }}
          >
            <PermissionsGuard
              permissions={[
                AIR_SALES_QUOTES_MANAGE_QUOTES_PERMISSIONS?.EDIT_QUOTE,
              ]}
            >
              <MenuItem disabled={!rowId} onClick={handleEditQuote}>
                Edit
              </MenuItem>
            </PermissionsGuard>
            <PermissionsGuard
              permissions={[
                AIR_SALES_QUOTES_MANAGE_QUOTES_PERMISSIONS?.VIEW_QUOTE,
              ]}
            >
              <MenuItem disabled={!rowId} onClick={handleViewQuote}>
                View
              </MenuItem>
            </PermissionsGuard>
            <PermissionsGuard
              permissions={[
                AIR_SALES_QUOTES_MANAGE_QUOTES_PERMISSIONS?.DELETE_QUOTE,
              ]}
            >
              <MenuItem onClick={handleOpenDeleteQuote}>Delete</MenuItem>
            </PermissionsGuard>
          </Menu>
        </Box>

        <Tooltip title={'Refresh Filter'} placement="top-start" arrow>
          <PermissionsGuard
            permissions={[
              AIR_SALES_QUOTES_MANAGE_QUOTES_PERMISSIONS?.REFRESH_FILTERS,
            ]}
          >
            <Button
              variant="outlined"
              color="inherit"
              className="small"
              onClick={handleResetFilters}
              sx={{
                width: { xs: '100%', sm: 'fit-Content' },
                marginTop: { xs: '10px !important', sm: '0px !important' },
                marginLeft: { xs: '0px !important', sm: '10px !important' },
              }}
            >
              <RefreshSharedIcon />
            </Button>
          </PermissionsGuard>
        </Tooltip>
        <PermissionsGuard
          permissions={[AIR_SALES_QUOTES_MANAGE_QUOTES_PERMISSIONS?.CUSTOMIZE]}
        >
          <Button
            className="small"
            sx={styles?.actionButton}
            startIcon={<CustomizeIcon />}
            onClick={handleCustomizeColumns}
          >
            Customize
          </Button>
        </PermissionsGuard>
        <PermissionsGuard
          permissions={[
            AIR_SALES_QUOTES_MANAGE_QUOTES_PERMISSIONS?.SEARCH_FILTER,
          ]}
        >
          <Button
            className="small"
            sx={styles?.actionButton}
            startIcon={<FilterSharedIcon />}
            onClick={handleFilters}
          >
            Filter
          </Button>
        </PermissionsGuard>
      </Box>
    </Box>
  );
};

export default TableToolbar;
