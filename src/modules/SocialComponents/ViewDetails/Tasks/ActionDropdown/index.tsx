import { Button, Grid, Menu, MenuItem } from '@mui/material';
import { ArrowDropDown } from '@mui/icons-material';

import { AlertModals } from '@/components/AlertModals';
import { ScheduleModals } from '@/components/ScheduleModals';

import useActionDropdown from './useActionDropdown';

import { assigneeDataArray } from './ActionDropDown.data';

import { FormProvider } from '@/components/ReactHookForm';
import { v4 as uuidv4 } from 'uuid';
import { SOCIAL_COMPONENTS_COMPANIES_VIEW_DETAILS_PERMISSIONS } from '@/constants/permission-keys';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';

const ActionDropdown = (props: any) => {
  const { setOpenDrawer, selectedCheckboxes, setSelectedCheckboxes } = props;
  const {
    theme,
    isMenuOpen,
    anchorEl,
    handleOpenMenu,
    handleCloseMenu,
    openAlertModal,
    handleOpenEditDrawer,
    handleOpenViewDrawer,
    handleOpenReassignAlert,
    handleOpenDeleteAlert,
    handleCloseAlert,
    handleSubmit,
    onSubmit,
    methodsAssignee,
    handleDeleteHandler,
  } = useActionDropdown({
    setOpenDrawer,
    selectedCheckboxes,
    setSelectedCheckboxes,
  });

  return (
    <div>
      <Button
        endIcon={<ArrowDropDown />}
        sx={{
          border: `1px solid ${theme?.palette?.custom?.dark}`,
          color: `${theme?.palette?.custom?.main}`,
          minWidth: '0px',
          height: '35px',
        }}
        aria-controls={isMenuOpen ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={isMenuOpen ? 'true' : undefined}
        onClick={handleOpenMenu}
        disabled={selectedCheckboxes?.length === 0}
      >
        Action
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={isMenuOpen}
        onClose={handleCloseMenu}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <PermissionsGuard
          permissions={[
            SOCIAL_COMPONENTS_COMPANIES_VIEW_DETAILS_PERMISSIONS?.VIEW_TASK,
          ]}
        >
          <MenuItem
            onClick={handleOpenViewDrawer}
            disabled={selectedCheckboxes?.length > 1}
          >
            View
          </MenuItem>
        </PermissionsGuard>
        <PermissionsGuard
          permissions={[
            SOCIAL_COMPONENTS_COMPANIES_VIEW_DETAILS_PERMISSIONS?.EDIT_TASK,
          ]}
        >
          <MenuItem
            onClick={handleOpenEditDrawer}
            disabled={selectedCheckboxes?.length > 1}
          >
            Edit
          </MenuItem>
        </PermissionsGuard>

        <PermissionsGuard
          permissions={[
            SOCIAL_COMPONENTS_COMPANIES_VIEW_DETAILS_PERMISSIONS?.REASSIGN_TASK,
          ]}
        >
          <MenuItem onClick={handleOpenReassignAlert}>Re-assign</MenuItem>
        </PermissionsGuard>
        <PermissionsGuard
          permissions={[
            SOCIAL_COMPONENTS_COMPANIES_VIEW_DETAILS_PERMISSIONS?.DELETE_TASK,
          ]}
        >
          <MenuItem onClick={handleOpenDeleteAlert}>Delete</MenuItem>
        </PermissionsGuard>
      </Menu>

      <ScheduleModals
        message={
          "You're about to delete a record. Deleted records can't be restored after 90 days."
        }
        submitButonText="Update"
        type={'assign'}
        open={openAlertModal === 'Reassign'}
        handleClose={handleCloseAlert}
        handleSubmit={handleCloseAlert}
        isFooter={true}
      >
        <FormProvider
          methods={methodsAssignee}
          onSubmit={handleSubmit(onSubmit)}
        >
          <Grid container>
            {assigneeDataArray?.map((item: any) => (
              <Grid item xs={12} md={item?.md} key={uuidv4()}>
                <item.component {...item?.componentProps} size={'small'}>
                  {item?.componentProps?.select
                    ? item?.options?.map((option: any) => (
                        <option key={option?.value} value={option?.value}>
                          {option?.label}
                        </option>
                      ))
                    : null}
                </item.component>
              </Grid>
            ))}
          </Grid>
        </FormProvider>
      </ScheduleModals>

      <AlertModals
        message={
          "You're about to delete a record. Deleted records can't be restored after 90 days."
        }
        type={'delete'}
        open={openAlertModal === 'Delete'}
        handleClose={handleCloseAlert}
        handleSubmitBtn={handleDeleteHandler}
      />
    </div>
  );
};
export default ActionDropdown;
