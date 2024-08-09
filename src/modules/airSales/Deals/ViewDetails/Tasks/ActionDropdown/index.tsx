import { Button, Grid, Menu, MenuItem } from '@mui/material';
import { ArrowDropDown } from '@mui/icons-material';

import { AlertModals } from '@/components/AlertModals';
import { ScheduleModals } from '@/components/ScheduleModals';

import useActionDropdown from './useActionDropdown';

import { assigneeDataArray } from './ActionDropDown.data';

import { FormProvider } from '@/components/ReactHookForm';
import { v4 as uuidv4 } from 'uuid';
import { AIR_SALES_DEALS_PERMISSIONS } from '@/constants/permission-keys';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { useAppSelector } from '@/redux/store';
import { ActionDropdownProps } from '../Tasks-interface';

const ActionDropdown = (props: ActionDropdownProps) => {
  const {
    setOpenDrawer,
    selectedCheckboxes,
    setSelectedCheckboxes,
    selectedRecId,
  } = props;
  const {
    theme,
    isMenuOpen,
    anchorEl,
    handleOpenMenu,
    handleCloseMenu,
    openAlertModal,
    handleOpenEditDrawer,
    handleOpenViewDrawer,
    handleOpenDeleteAlert,
    handleCloseAlert,
    handleSubmit,
    handleDeleteHandler,
    onSubmit,
    methodsAssignee,
    deleteTaskLoading,
  } = useActionDropdown({
    setOpenDrawer,
    selectedCheckboxes,
    setSelectedCheckboxes,
    selectedRecId,
  });

  const selectedTaskIds: any = useAppSelector(
    (state: any) => state?.task_deals?.selectedDealsTaskIds,
  );

  return (
    <div>
      <Button
        endIcon={<ArrowDropDown />}
        sx={{
          border: `1px solid ${theme?.palette?.custom?.dark}`,
          color: `${theme?.palette?.custom?.main}`,
          minWidth: '100%',
        }}
        aria-controls={isMenuOpen ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={isMenuOpen ? 'true' : undefined}
        onClick={handleOpenMenu}
        disabled={selectedTaskIds?.length > 0 ? false : true}
        className="small"
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
          permissions={[AIR_SALES_DEALS_PERMISSIONS?.DEAL_VIEW_TASK]}
        >
          <MenuItem
            disabled={selectedTaskIds?.length > 1}
            onClick={handleOpenViewDrawer}
          >
            View
          </MenuItem>
        </PermissionsGuard>
        <PermissionsGuard
          permissions={[AIR_SALES_DEALS_PERMISSIONS?.DEAL_EDIT_TASK]}
        >
          <MenuItem
            disabled={selectedTaskIds?.length > 1}
            onClick={handleOpenEditDrawer}
          >
            Edit
          </MenuItem>
        </PermissionsGuard>
        {/* <PermissionsGuard
          permissions={[AIR_SALES_DEALS_PERMISSIONS?.DEAL_REASSIGN_TASK]}
        >
          <MenuItem onClick={handleOpenReassignAlert}>Re-assign</MenuItem>
        </PermissionsGuard> */}
        <PermissionsGuard
          permissions={[AIR_SALES_DEALS_PERMISSIONS?.DEAL_DELETE_TASK]}
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
        loading={deleteTaskLoading}
      />
    </div>
  );
};
export default ActionDropdown;
