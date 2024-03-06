import { Box, Button, Menu, MenuItem } from '@mui/material';
import { ArrowDropDown } from '@mui/icons-material';

// import { AlertModals } from '@/components/AlertModals';
import useCallsActionDropdown from './useCallsActionDropDown';
// import { ScheduleModals } from '@/components/ScheduleModals';

const CallsActionDropdown = (props: any) => {
  const {
    setOpenDrawer,
    isActionsDisabled,
    disabledMenuItem,
    anchorEl,
    actionMenuOpen,
    handleActionsMenuClick,
    handleActionsMenuClose,
    handleOpenDrawerEditCall,
  } = props;
  const {
    theme,
    handleOpenDeleteAlert,
    handleOpenReassignModal,
    handleOpenOutcomeModal,
  } = useCallsActionDropdown({ setOpenDrawer });

  return (
    <>
      <Box>
        <Button
          endIcon={<ArrowDropDown />}
          sx={{
            border: `1px solid ${theme?.palette?.custom?.dark}`,
            color: `${theme?.palette?.custom.main}`,
            minWidth: '0px',
            height: '35px',
          }}
          aria-controls={actionMenuOpen ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={actionMenuOpen ? 'true' : undefined}
          onClick={handleActionsMenuClick}
          disabled={isActionsDisabled}
        >
          Action
        </Button>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={actionMenuOpen}
          onClose={handleActionsMenuClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >
          <MenuItem
            disabled={!disabledMenuItem}
            onClick={() => handleOpenDrawerEditCall('View')}
          >
            View
          </MenuItem>
          <MenuItem
            disabled={!disabledMenuItem}
            onClick={() => handleOpenDrawerEditCall('Edit')}
          >
            Edit
          </MenuItem>
          <MenuItem
            disabled={!disabledMenuItem}
            onClick={handleOpenReassignModal}
          >
            Reschedule
          </MenuItem>
          <MenuItem
            disabled={!disabledMenuItem}
            onClick={handleOpenOutcomeModal}
          >
            Add outcomes
          </MenuItem>
          <MenuItem onClick={handleOpenDeleteAlert}>Delete</MenuItem>
        </Menu>
      </Box>
      {/* <AlertModals
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
      </ScheduleModals> */}
    </>
  );
};
export default CallsActionDropdown;
