import { Box, Button, Menu, MenuItem } from '@mui/material';
import { ArrowDropDown } from '@mui/icons-material';
import { DeleteIcon } from '@/assets/icons';
import { enqueueSnackbar } from 'notistack';
import { NOTISTACK_VARIANTS } from '@/constants/strings';
import useCompanies from '../useCompanies';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { SOCIAL_COMPONENTS_COMPANIES_PERMISSIONS } from '@/constants/permission-keys';

const ActionButton = (props?: any) => {
  const { checkedRows, setCheckedRows, isOpen, setIsOpen } = props;
  const { selectedValue, handleClick, handleClose, deleteCompanies } =
    useCompanies();

  return (
    <Box sx={{ width: { xs: '100%', sm: 'auto' } }}>
      {checkedRows?.length > 1 ? (
        <PermissionsGuard
          permissions={[
            SOCIAL_COMPONENTS_COMPANIES_PERMISSIONS?.DELETE_ALL_COMPANIES,
          ]}
        >
          <Button
            className="small"
            variant="outlined"
            color="inherit"
            startIcon={<DeleteIcon />}
            onClick={() => {
              deleteCompanies({ ids: checkedRows });
              setCheckedRows([]);
              enqueueSnackbar(`Companies deleted successfully`, {
                variant: NOTISTACK_VARIANTS?.SUCCESS,
              });
            }}
          >
            Delete
          </Button>
        </PermissionsGuard>
      ) : (
        <>
          <Button
            className="small"
            variant="outlined"
            color="inherit"
            onClick={handleClick}
            disabled={checkedRows?.length < 1 ? true : false}
            sx={{ width: { sm: '112px', xs: '100%' } }}
          >
            Actions
            <ArrowDropDown />
          </Button>
          <Menu
            sx={{
              '.MuiPopover-paper': {
                minWidth: '115px',
              },
            }}
            id="simple-menu"
            anchorEl={selectedValue}
            open={Boolean(selectedValue)}
            onClose={handleClose}
          >
            <PermissionsGuard
              permissions={[
                SOCIAL_COMPONENTS_COMPANIES_PERMISSIONS?.PREVIEW_ALL_COMPANIES,
              ]}
            >
              <MenuItem
                onClick={() => {
                  handleClose();
                  setIsOpen({ ...isOpen, previewDrawer: true });
                }}
              >
                Preview
              </MenuItem>
            </PermissionsGuard>
            <PermissionsGuard
              permissions={[
                SOCIAL_COMPONENTS_COMPANIES_PERMISSIONS?.REASSIGN_ALL_COMPANIES,
              ]}
            >
              <MenuItem
                onClick={() => {
                  handleClose();
                  setIsOpen({ ...isOpen, reassignModal: true });
                }}
              >
                Re-assign
              </MenuItem>
            </PermissionsGuard>

            <PermissionsGuard
              permissions={[
                SOCIAL_COMPONENTS_COMPANIES_PERMISSIONS?.EXPORT_ALL_COMPANIES,
              ]}
            >
              <MenuItem
                onClick={() => {
                  handleClose();
                  setIsOpen({ ...isOpen, exportModal: true });
                }}
              >
                Export
              </MenuItem>
            </PermissionsGuard>

            <PermissionsGuard
              permissions={[
                SOCIAL_COMPONENTS_COMPANIES_PERMISSIONS?.DELETE_ALL_COMPANIES,
              ]}
            >
              <MenuItem
                onClick={() => {
                  handleClose();
                  setIsOpen({ ...isOpen, deleteModal: true });
                }}
              >
                Delete
              </MenuItem>
            </PermissionsGuard>
            <PermissionsGuard
              permissions={[
                SOCIAL_COMPONENTS_COMPANIES_PERMISSIONS?.MERGE_ALL_COMPANIES,
              ]}
            >
              <MenuItem
                onClick={() => {
                  handleClose();
                  setIsOpen({ ...isOpen, mergeModal: true });
                }}
              >
                Merge
              </MenuItem>
            </PermissionsGuard>
          </Menu>
        </>
      )}
    </Box>
  );
};

export default ActionButton;
