import { Button, Grid, Menu, MenuItem } from '@mui/material';
import { ArrowDropDown } from '@mui/icons-material';

import { AlertModals } from '@/components/AlertModals';
import useMeetingsDropDown from './useMeetingsDropDown';
import { ScheduleModals } from '@/components/ScheduleModals';
import { FormProvider } from '@/components/ReactHookForm';
import {
  outcomesDataArray,
  reAssignCallDataArray,
} from './MeetingsDropDown.data';

import { v4 as uuidv4 } from 'uuid';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_SALES_DEALS_PERMISSIONS } from '@/constants/permission-keys';

const MeetingsDropDown = (props: any) => {
  const { setOpenDrawer } = props;
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

    methodsReassignCall,
    handleReAssignCall,
    onSubmitReassignCall,
    handleOpenReassignModal,

    handleOutCome,
    onSubmitOutCome,
    methodsOutCome,
    handleOpenOutcomeModal,
  } = useMeetingsDropDown({ setOpenDrawer });

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
          permissions={[AIR_SALES_DEALS_PERMISSIONS?.DEAL_VIEW_MEETING]}
        >
          <MenuItem onClick={handleOpenViewDrawer}>View</MenuItem>
        </PermissionsGuard>
        <PermissionsGuard
          permissions={[AIR_SALES_DEALS_PERMISSIONS?.DEAL_EDIT_MEETING]}
        >
          <MenuItem onClick={handleOpenEditDrawer}>Edit</MenuItem>
        </PermissionsGuard>
        <PermissionsGuard
          permissions={[AIR_SALES_DEALS_PERMISSIONS?.DEAL_REASSIGN_MEETING]}
        >
          <MenuItem onClick={handleOpenReassignModal}>Reschedule</MenuItem>
        </PermissionsGuard>

        <MenuItem onClick={handleOpenOutcomeModal}>Add outcomes</MenuItem>
        <PermissionsGuard
          permissions={[AIR_SALES_DEALS_PERMISSIONS?.DEAL_DELETE_MEETING]}
        >
          <MenuItem onClick={handleOpenDeleteAlert}>Delete</MenuItem>
        </PermissionsGuard>
      </Menu>

      <AlertModals
        message={
          "You're about to delete a record. Deleted records can't be restored after 90 days."
        }
        type={'delete'}
        open={Boolean(openAlertModal)}
        handleClose={handleCloseAlert}
        handleSubmit={handleCloseAlert}
      />

      <ScheduleModals
        message={
          "You're about to delete a record. Deleted records can't be restored after 90 days."
        }
        submitButonText="Update"
        type={'outcome'}
        open={openAlertModal === 'outcome'}
        handleClose={handleCloseAlert}
        handleSubmit={handleCloseAlert}
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

      <ScheduleModals
        message={
          "You're about to delete a record. Deleted records can't be restored after 90 days."
        }
        submitButonText="Update"
        type={'reschedule'}
        open={openAlertModal === 'reschedule'}
        handleClose={handleCloseAlert}
        handleSubmit={handleCloseAlert}
        isFooter={true}
      >
        <FormProvider
          methods={methodsReassignCall}
          onSubmit={handleReAssignCall(onSubmitReassignCall)}
        >
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
    </div>
  );
};
export default MeetingsDropDown;
