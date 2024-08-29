import Link from 'next/link';
import { Box, Button, Menu, MenuItem, Tooltip, useTheme } from '@mui/material';
import { styles } from './ActionsBar.style';
import { AIR_SOCIAL } from '@/routesConstants/paths';
import Search from '@/components/Search';
import {
  CutomizeIcon,
  DownIcon,
  ExportCloudIcon,
  FilterIcon,
  RefreshTasksIcon,
  RestoreIcon,
} from '@/assets/icons';
import { useRouter } from 'next/router';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { SOCIAL_COMPONENTS_CONTACTS_PERMISSIONS } from '@/constants/permission-keys';

const ActionsBar = (props: any) => {
  const router = useRouter();
  const theme = useTheme();
  const {
    setSearchValue,
    isActionsDisabled,
    anchorEl,
    handleActionsMenuClick,
    actionMenuOpen,
    handleActionsMenuClose,
    disabledMenuItem,
    rowId,
    handleOpenModalReAssign,
    handleOpenModalDelete,
    handleOpenCustomize,
    handleOpenFilters,
    handleRefresh,
    handleOpenModalExport,
  } = props;

  return (
    <Box sx={styles?.wrapper}>
      <Box sx={styles?.search}>
        <Search
          setSearchBy={setSearchValue}
          label="Search Here"
          size="small"
          width={'100%'}
        />
      </Box>

      <Box sx={styles?.actionsBtn}>
        <Box>
          <Button
            variant="outlined"
            className="small"
            color="inherit"
            onClick={handleActionsMenuClick}
            disabled={isActionsDisabled}
            classes={{ outlined: 'outlined_btn' }}
          >
            Actions &nbsp; <DownIcon />
          </Button>
          <Menu
            anchorEl={anchorEl}
            open={actionMenuOpen}
            onClose={handleActionsMenuClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
            PaperProps={{
              style: {
                width: '112px',
              },
            }}
          >
            <MenuItem
              disabled={disabledMenuItem}
              onClick={() => router.push(`${AIR_SOCIAL?.CONTACTS}/${rowId}`)}
            >
              View Details
            </MenuItem>
            <MenuItem
              disabled={disabledMenuItem}
              onClick={handleOpenModalReAssign}
            >
              Re-assign
            </MenuItem>
            <MenuItem onClick={handleOpenModalDelete}>Delete</MenuItem>
          </Menu>
        </Box>
        <Link href={AIR_SOCIAL?.CONTACTS_RESTORE}>
          <PermissionsGuard
            permissions={[SOCIAL_COMPONENTS_CONTACTS_PERMISSIONS?.RESTORE]}
          >
            <Button
              variant="outlined"
              className="small"
              color="inherit"
              sx={{ color: theme?.palette?.custom['main'] }}
              startIcon={<RestoreIcon />}
            >
              Restore
            </Button>
          </PermissionsGuard>
        </Link>
        <>
          <PermissionsGuard
            permissions={[
              SOCIAL_COMPONENTS_CONTACTS_PERMISSIONS?.CUSTOMIZE_COLUMNS,
            ]}
          >
            <Button
              onClick={handleOpenCustomize}
              variant="outlined"
              className="small"
              color="inherit"
              sx={{ color: theme?.palette?.custom['main'] }}
            >
              <CutomizeIcon /> &nbsp; Customize
            </Button>
          </PermissionsGuard>
        </>

        <PermissionsGuard
          permissions={[SOCIAL_COMPONENTS_CONTACTS_PERMISSIONS?.FILTER]}
        >
          <Button
            variant="outlined"
            className="small"
            color="inherit"
            sx={{ color: theme?.palette?.custom['main'] }}
            onClick={handleOpenFilters}
          >
            <FilterIcon />
            &nbsp; Filter
          </Button>
        </PermissionsGuard>

        <PermissionsGuard
          permissions={[SOCIAL_COMPONENTS_CONTACTS_PERMISSIONS?.FILTER]}
        >
          <Tooltip title={'Refresh Filter'} placement="top-start" arrow>
            <Button
              variant="outlined"
              color="inherit"
              className="small"
              onClick={handleRefresh}
            >
              <RefreshTasksIcon />
            </Button>
          </Tooltip>
        </PermissionsGuard>

        <PermissionsGuard
          permissions={[
            SOCIAL_COMPONENTS_CONTACTS_PERMISSIONS?.EXPORT_CONTACTS,
          ]}
        >
          <Button
            variant="outlined"
            className="small"
            color="inherit"
            sx={{ color: theme?.palette?.custom['main'] }}
            onClick={handleOpenModalExport}
          >
            <ExportCloudIcon />
            &nbsp; Export
          </Button>
        </PermissionsGuard>
      </Box>
    </Box>
  );
};

export default ActionsBar;
