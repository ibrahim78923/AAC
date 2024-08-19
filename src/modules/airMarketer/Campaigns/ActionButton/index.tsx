import { Box, Button, Menu, MenuItem } from '@mui/material';
import { ArrowDropDown } from '@mui/icons-material';
import useCampaigns from '../useCampaigns';
import { actionsOptions } from './ActionButton.data';
import CloneModal from '../CloneModal';
import EditGoalDrawer from '../EidtGoalDrawer';
import ExportCompaignDrawer from '../ExportCampaignDrawer';
import EditCompaign from '../EditCampaign';
import { AlertModals } from '@/components/AlertModals';
import { AlertModalDeleteIcon, DeleteIcon } from '@/assets/icons';
import { v4 as uuidv4 } from 'uuid';
import CompaignDetails from '../CampaignDetails';
import EditTask from '../Tasks/EditTask';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_MARKETER_CAMPAIGNS_PERMISSIONS } from '@/constants/permission-keys';
import { enqueueSnackbar } from 'notistack';
import { NOTISTACK_VARIANTS } from '@/constants/strings';
import { ActionButtonI } from '../Campaigns.interface';

const ActionButton = ({ selectedRows, setSelectedRows }: ActionButtonI) => {
  const {
    selectedValue,
    handleClick,
    handleSelectedOptionValue,
    actionsModalDetails,
    setActionsModalDetails,
    deleteCampaigns,
    deleteCampaignsLoading,
  } = useCampaigns();

  const handleDeleteCampaigns = async (id: string[]) => {
    try {
      await deleteCampaigns({ ids: id })?.unwrap();
      enqueueSnackbar('Campaigns deleted successfully', {
        variant: NOTISTACK_VARIANTS?.SUCCESS,
      });
      setSelectedRows([]);
      setActionsModalDetails({ ...actionsModalDetails, isDelete: false });
    } catch (error) {
      enqueueSnackbar('Error while deleting campaigns', {
        variant: NOTISTACK_VARIANTS?.ERROR,
      });
    }
  };
  return (
    <Box>
      {selectedRows?.length >= 2 ? (
        <Button
          className="small"
          variant="outlined"
          color="inherit"
          startIcon={<DeleteIcon />}
          onClick={() => handleDeleteCampaigns(selectedRows)}
        >
          Delete
        </Button>
      ) : (
        <Button
          onClick={handleClick}
          className="small"
          variant="outlined"
          color="inherit"
          disabled={selectedRows?.length === 0 ? true : false}
          sx={{
            width: { sm: '112px', xs: '100%' },
            height: '36px',
          }}
        >
          Actions
          <ArrowDropDown />
        </Button>
      )}
      <Menu
        id="simple-menu"
        anchorEl={selectedValue}
        open={Boolean(selectedValue)}
        onClose={handleSelectedOptionValue}
      >
        {actionsOptions?.map((option) => {
          return (
            <MenuItem
              key={uuidv4()}
              onClick={() => {
                handleSelectedOptionValue(option, selectedRows);
              }}
            >
              {option}
            </MenuItem>
          );
        })}
      </Menu>

      {actionsModalDetails?.isDelete && (
        <PermissionsGuard
          permissions={[AIR_MARKETER_CAMPAIGNS_PERMISSIONS?.CLONE_DELETE]}
        >
          <AlertModals
            message="Are you sure you want to delete?"
            type="Delete"
            typeImage={<AlertModalDeleteIcon />}
            open={actionsModalDetails?.isDelete}
            handleClose={() =>
              setActionsModalDetails({
                ...actionsModalDetails,
                isDelete: false,
              })
            }
            handleSubmitBtn={() => handleDeleteCampaigns(selectedRows)}
            loading={deleteCampaignsLoading}
          />
        </PermissionsGuard>
      )}

      {actionsModalDetails?.isClone && (
        <CloneModal
          openCloneModal={actionsModalDetails?.isClone}
          handleCloseFeaturesModal={() =>
            setActionsModalDetails({
              ...actionsModalDetails,
              isClone: false,
            })
          }
          selectedRows={selectedRows}
          setSelectedRows={setSelectedRows}
        />
      )}

      {actionsModalDetails?.isOpenFilterDrawer && (
        <PermissionsGuard
          permissions={[AIR_MARKETER_CAMPAIGNS_PERMISSIONS?.EDIT_GOALS]}
        >
          <EditGoalDrawer
            isOpenDrawer={actionsModalDetails?.isOpenFilterDrawer}
            onClose={() =>
              setActionsModalDetails({
                ...actionsModalDetails,
                isOpenFilterDrawer: false,
              })
            }
          />
        </PermissionsGuard>
      )}

      {actionsModalDetails?.isExportCompaign && (
        <PermissionsGuard
          permissions={[AIR_MARKETER_CAMPAIGNS_PERMISSIONS?.EXPORT_CAMPAIGNS]}
        >
          <ExportCompaignDrawer
            isOpenDrawer={actionsModalDetails?.isExportCompaign}
            onClose={() =>
              setActionsModalDetails({
                ...actionsModalDetails,
                isExportCompaign: false,
              })
            }
          />
        </PermissionsGuard>
      )}

      {actionsModalDetails?.isCreateCampaign && (
        <PermissionsGuard
          permissions={[AIR_MARKETER_CAMPAIGNS_PERMISSIONS?.EDIT_CAMPAIGNS]}
        >
          <EditCompaign
            isOpenDrawer={actionsModalDetails?.isCreateCampaign}
            selectedRows={selectedRows}
            onClose={() =>
              setActionsModalDetails({
                ...actionsModalDetails,
                isCreateCampaign: { isToggle: false, type: '' },
              })
            }
          />
        </PermissionsGuard>
      )}

      {actionsModalDetails?.isViewDeatsils && (
        <PermissionsGuard
          permissions={[AIR_MARKETER_CAMPAIGNS_PERMISSIONS?.VIEW_DETAILS]}
        >
          <CompaignDetails
            open={actionsModalDetails?.isViewDeatsils}
            onClose={() =>
              setActionsModalDetails({
                ...actionsModalDetails,
                isViewDeatsils: false,
              })
            }
            selectedRows={selectedRows}
          />
        </PermissionsGuard>
      )}

      {actionsModalDetails?.isCreateTask && (
        <EditTask
          isOpenDrawer={actionsModalDetails?.isCreateTask}
          isType={'create'}
          onClose={() =>
            setActionsModalDetails({
              ...actionsModalDetails,
              isCreateTask: false,
            })
          }
        />
      )}
    </Box>
  );
};

export default ActionButton;
