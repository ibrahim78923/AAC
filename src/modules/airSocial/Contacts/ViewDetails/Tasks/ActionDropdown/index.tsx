import { Button, Grid, Menu, MenuItem } from '@mui/material';
import { ArrowDropDown } from '@mui/icons-material';

import { AlertModals } from '@/components/AlertModals';
import { ScheduleModals } from '@/components/ScheduleModals';

import useActionDropdown from './useActionDropdown';

import { assigneeDataArray } from './ActionDropDown.data';

import { FormProvider } from '@/components/ReactHookForm';

import { v4 as uuidv4 } from 'uuid';

const ActionDropdown = (props: any) => {
  const {
    anchorEl,
    isActionMenuOpen,
    handleOpenActionMenu,
    handleCloseActionMenu,
    handleOpenDrawer,
    isActionsDisabled,
    isMenuItemDisabled,
  } = props;
  const {
    theme,
    openAlertModal,
    handleOpenReassignAlert,
    handleOpenDeleteAlert,
    handleCloseAlert,
    handleSubmit,
    onSubmit,
    methodsAssignee,
  } = useActionDropdown();

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
        onClick={handleOpenActionMenu}
        disabled={isActionsDisabled}
      >
        Action
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={isActionMenuOpen}
        onClose={handleCloseActionMenu}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem
          disabled={!isMenuItemDisabled}
          onClick={() => handleOpenDrawer('View')}
        >
          View
        </MenuItem>
        <MenuItem
          disabled={!isMenuItemDisabled}
          onClick={() => handleOpenDrawer('Edit')}
        >
          Edit
        </MenuItem>
        <MenuItem
          disabled={!isMenuItemDisabled}
          onClick={handleOpenReassignAlert}
        >
          Re-assign
        </MenuItem>
        <MenuItem onClick={handleOpenDeleteAlert}>Delete</MenuItem>
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
        handleSubmit={handleCloseAlert}
      />
    </div>
  );
};
export default ActionDropdown;
