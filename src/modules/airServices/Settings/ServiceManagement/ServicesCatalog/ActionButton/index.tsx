import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { Box, Button, Menu, MenuItem } from '@mui/material';
import { Permissions } from '@/constants/permissions';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useActionButton } from './useActionButton';
import { AlertModals } from '@/components/AlertModals';
import { ALERT_MODALS_TYPE } from '@/constants/strings';
import Visibility from '../Visibility';
import { UpdateServiceCategory } from '../UpdateServiceCategory';
import { ChangeServiceStatus } from '../ChangeServiceStatus';

export default function ActionButton(props: any) {
  const {
    state,
    setState,
    handleDeleteBtn,
    openMenu,
    handleClickMenu,
    handleCloseMenu,
    handleClickVisibility,
    handleCloseVisibility,
    isDisabled,
    setSelectedCheckboxes,
    deleteServiceCatalogStatus,
    actionButtonMenuData,
  } = useActionButton(props);

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
            variant={'outlined'}
            id={'demo-positioned-button'}
            aria-controls={openMenu ? 'demo-positioned-menu' : undefined}
            aria-expanded={openMenu ? 'true' : undefined}
            onClick={handleClickMenu}
            disabled={isDisabled}
            endIcon={<ArrowDropDownIcon />}
            color={'secondary'}
            sx={{ textTransform: 'capitalize' }}
            className={'small'}
          >
            Action
          </Button>
        </PermissionsGuard>

        <Box sx={{ position: 'relative' }}>
          <Menu
            id={'basic-menu'}
            anchorEl={state.anchorEl}
            open={openMenu}
            onClose={handleCloseMenu}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            {actionButtonMenuData?.map((item: any) => (
              <PermissionsGuard permissions={[item?.permission]} key={item?.id}>
                <MenuItem onClick={item?.onClick} key={item?.key}>
                  {item?.label}
                </MenuItem>
              </PermissionsGuard>
            ))}
          </Menu>
        </Box>
      </Box>

      {state?.deleteModalOpen && (
        <AlertModals
          type={ALERT_MODALS_TYPE?.DELETE}
          open={state?.deleteModalOpen}
          handleClose={() =>
            setState((prevState) => ({ ...prevState, deleteModalOpen: false }))
          }
          handleSubmitBtn={handleDeleteBtn}
          message={'Are you sure you want to delete this service?'}
          loading={deleteServiceCatalogStatus?.isLoading}
          disableCancelBtn={deleteServiceCatalogStatus?.isLoading}
        />
      )}

      {state?.open && (
        <UpdateServiceCategory
          open={state?.open}
          setOpen={(val: boolean) =>
            setState((prevState) => ({ ...prevState, open: val }))
          }
          dataProp={props}
          setSelectedCheckboxes={setSelectedCheckboxes}
        />
      )}

      {state?.openVisibilityE1 && (
        <Visibility
          openVisibilityE1={state?.openVisibilityE1}
          handleClickVisibility={handleClickVisibility}
          handleCloseVisibility={handleCloseVisibility}
          anchorEl={state?.anchorEl}
          setAnchorEl={(val: HTMLElement | null) =>
            setState((prevState) => ({ ...prevState, anchorEl: val }))
          }
          id={props}
          setSelectedCheckboxes={setSelectedCheckboxes}
        />
      )}

      {state?.openStatus && (
        <ChangeServiceStatus
          openStatus={state?.openStatus}
          setOpenStatus={(val: boolean) =>
            setState((prevState) => ({ ...prevState, openStatus: val }))
          }
          dataProp={props}
          setSelectedCheckboxes={setSelectedCheckboxes}
        />
      )}
    </>
  );
}
