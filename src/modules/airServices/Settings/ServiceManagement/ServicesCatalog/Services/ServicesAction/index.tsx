import { AlertModals } from '@/components/AlertModals';
import { ALERT_MODALS_TYPE } from '@/constants/strings';
import { MoveToCategory } from '../MoveToCategory';
import { ChangeStatus } from '../ChangeStatus';
import { useServicesAction } from './useServicesAction';
import { Box, Button } from '@mui/material';
import React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { ArrowDropDownIcon } from '@mui/x-date-pickers';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { VisibilityAction } from './VisibilityAction';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_SERVICES_SETTINGS_SERVICE_MANAGEMENT_PERMISSIONS } from '@/constants/permission-keys';
import { Permissions } from '@/constants/permissions';
export const ServicesAction = (props: any) => {
  const {
    deleteModalOpen,
    setDeleteModalOpen,
    handleDeleteBtn,
    open,
    setOpen,
    openStatus,
    setOpenStatus,
    openMenu,
    anchorEl,
    handleCloseMenu,
    handleClickMenu,
    handleDelete,
    handleStatus,
    handleCategory,
    openVisibilityE1,
    handleClickVisibility,
    handleCloseVisibility,
    handleVisibility,
    setAnchorEl,
    isDisabled,
  } = useServicesAction(props);

  return (
    <>
      <Box
        display={'flex'}
        justifyContent={'space-between'}
        alignItems={'center'}
        flexWrap={'wrap'}
        gap={2}
      >
        <PermissionsGuard
          permissions={
            Permissions?.AIR_SERVICES_SETTINGS_SERVICE_MANAGEMENT_SERVICE_CATALOG_ACTION
          }
        >
          <Button
            variant="outlined"
            id="demo-positioned-button"
            aria-controls={openMenu ? 'demo-positioned-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={openMenu ? 'true' : undefined}
            onClick={handleClickMenu}
            disabled={isDisabled}
            endIcon={<ArrowDropDownIcon />}
            color="secondary"
            sx={{ textTransform: 'capitalize' }}
          >
            Action
          </Button>
        </PermissionsGuard>
        <Box sx={{ position: 'relative' }}>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={openMenu}
            onClose={handleCloseMenu}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            <PermissionsGuard
              permissions={[
                AIR_SERVICES_SETTINGS_SERVICE_MANAGEMENT_PERMISSIONS?.DELETE_MOVE_CATALOG_SERVICE,
              ]}
            >
              <MenuItem onClick={handleCategory} key="moveToCategory">
                Move To Category
              </MenuItem>
            </PermissionsGuard>
            <PermissionsGuard
              permissions={[
                AIR_SERVICES_SETTINGS_SERVICE_MANAGEMENT_PERMISSIONS?.CHANGE_STATUS_OF_CATALOG_SERVICES,
              ]}
            >
              <MenuItem onClick={handleStatus} key="changeStatus">
                Change Status
              </MenuItem>
            </PermissionsGuard>
            <PermissionsGuard
              permissions={[
                AIR_SERVICES_SETTINGS_SERVICE_MANAGEMENT_PERMISSIONS?.SET_VISIBILITY_OF_CATALOG_SERVICES,
              ]}
            >
              <MenuItem onClick={handleVisibility} key="visibility">
                Visibility
                <ArrowForwardIosIcon fontSize="small" sx={{ ml: '2.5rem' }} />
              </MenuItem>
            </PermissionsGuard>
            <PermissionsGuard
              permissions={[
                AIR_SERVICES_SETTINGS_SERVICE_MANAGEMENT_PERMISSIONS?.DELETE_MOVE_CATALOG_SERVICE,
              ]}
            >
              <MenuItem onClick={handleDelete} key="delete">
                Delete
              </MenuItem>
            </PermissionsGuard>
          </Menu>
          {openVisibilityE1 && (
            <VisibilityAction
              openVisibilityE1={openVisibilityE1}
              handleClickVisibility={handleClickVisibility}
              handleCloseVisibility={handleCloseVisibility}
              anchorEl={anchorEl}
              setAnchorEl={setAnchorEl}
              id={props}
            />
          )}
        </Box>
      </Box>
      <br />
      {deleteModalOpen && (
        <AlertModals
          type={ALERT_MODALS_TYPE?.DELETE}
          open={deleteModalOpen}
          handleClose={() => setDeleteModalOpen(false)}
          handleSubmitBtn={handleDeleteBtn}
          message="Are you sure you want to delete this field ?"
        />
      )}
      {open && <MoveToCategory open={open} setOpen={setOpen} id={props} />}
      {openStatus && (
        <ChangeStatus
          openStatus={openStatus}
          setOpenStatus={setOpenStatus}
          id={props}
        />
      )}
    </>
  );
};
