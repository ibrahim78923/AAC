import { Button, Grid, Menu, MenuItem } from '@mui/material';
import { ArrowDropDown } from '@mui/icons-material';

import { AlertModals } from '@/components/AlertModals';
import useCallsActionDropdown from './useCallsActionDropDown';
import { ScheduleModals } from '@/components/ScheduleModals';
import { FormProvider } from '@/components/ReactHookForm';
import {
  outcomesDataArray,
  reAssignCallDataArray,
} from './CallsActionDropDown.data';

import { v4 as uuidv4 } from 'uuid';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { SOCIAL_COMPONENTS_COMPANIES_VIEW_DETAILS_PERMISSIONS } from '@/constants/permission-keys';

const CallsActionDropdown = (props: any) => {
  const {
    setOpenDrawer,
    selectedCheckboxes,
    deleteCallsHandler,
    openAlertModal,
    setOpenAlertModal,
  } = props;
  const {
    theme,
    isMenuOpen,
    anchorEl,
    handleOpenMenu,
    handleCloseMenu,
    handleOpenEditDrawer,
    handleOpenViewDrawer,
    handleOpenDeleteAlert,
    handleCloseAlert,

    methodsReassignCall,
    handleReAssignCall,
    onSubmitReassignCall,
    handleOpenReassignModal,

    handleOutCome,
    onSubmitOutCome,
    methodsOutCome,
    handleOpenOutcomeModal,
  } = useCallsActionDropdown({
    setOpenDrawer,
    openAlertModal,
    setOpenAlertModal,
    selectedCheckboxes,
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
            SOCIAL_COMPONENTS_COMPANIES_VIEW_DETAILS_PERMISSIONS?.VIEW_CALLS,
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
            SOCIAL_COMPONENTS_COMPANIES_VIEW_DETAILS_PERMISSIONS?.EDIT_CALLS,
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
            SOCIAL_COMPONENTS_COMPANIES_VIEW_DETAILS_PERMISSIONS?.RESCHEDULE_CALLS,
          ]}
        >
          <MenuItem
            onClick={handleOpenReassignModal}
            disabled={selectedCheckboxes?.length > 1}
          >
            Reschedule
          </MenuItem>
        </PermissionsGuard>
        <PermissionsGuard
          permissions={[
            SOCIAL_COMPONENTS_COMPANIES_VIEW_DETAILS_PERMISSIONS?.ADD_CALLS_OUTCOME,
          ]}
        >
          <MenuItem
            onClick={handleOpenOutcomeModal}
            disabled={selectedCheckboxes?.length > 1}
          >
            Add outcomes
          </MenuItem>
        </PermissionsGuard>
        <PermissionsGuard
          permissions={[
            SOCIAL_COMPONENTS_COMPANIES_VIEW_DETAILS_PERMISSIONS?.ADD_CALLS_OUTCOME,
          ]}
        >
          <MenuItem onClick={handleOpenDeleteAlert}>Delete</MenuItem>
        </PermissionsGuard>
        <PermissionsGuard
          permissions={[
            SOCIAL_COMPONENTS_COMPANIES_VIEW_DETAILS_PERMISSIONS?.DELETE_CALLS,
          ]}
        >
          <MenuItem onClick={handleOpenDeleteAlert}>Delete</MenuItem>
        </PermissionsGuard>
      </Menu>

      <AlertModals
        message={
          "You're about to delete a record. Deleted records can't be restored after 90 days."
        }
        type={'delete'}
        open={openAlertModal === 'Delete'}
        handleClose={() => setOpenAlertModal('')}
        handleSubmitBtn={deleteCallsHandler}
      />
      {openAlertModal === 'outcome' && (
        <ScheduleModals
          submitButonText="Update"
          type={'outcome'}
          open={openAlertModal === 'outcome'}
          handleClose={handleCloseAlert}
          handleSubmit={handleOutCome(onSubmitOutCome)}
          isFooter={true}
        >
          <FormProvider
            methods={methodsOutCome}
            onSubmit={handleOutCome(onSubmitOutCome)}
          >
            <Grid container spacing={4}>
              {outcomesDataArray?.map((item: any) => (
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
      )}

      {openAlertModal === 'reschedule' && (
        <ScheduleModals
          submitButonText="Update"
          type={'reschedule'}
          open={openAlertModal === 'reschedule'}
          handleClose={handleCloseAlert}
          handleSubmit={handleReAssignCall(onSubmitReassignCall)}
          isFooter={true}
        >
          <FormProvider methods={methodsReassignCall}>
            <Grid container spacing={3}>
              {reAssignCallDataArray?.map((item: any) => (
                <Grid item xs={12} md={item?.md} key={uuidv4()}>
                  <item.component {...item.componentProps} size={'small'}>
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
      )}
    </div>
  );
};
export default CallsActionDropdown;
