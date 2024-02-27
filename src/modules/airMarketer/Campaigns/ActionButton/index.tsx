import { Box, Button, Menu, MenuItem } from '@mui/material';

import { ArrowDropDown } from '@mui/icons-material';

import useCampaigns from '../useCampaigns';
import { actionsOptions } from './ActionButton.data';

import CloneModal from '../CloneModal';
import EditGoalDrawer from '../EidtGoalDrawer';
import ExportCompaignDrawer from '../ExportCampaignDrawer';
import EditCompaign from '../EditCampaign';

import { AlertModals } from '@/components/AlertModals';
import { AlertModalDeleteIcon } from '@/assets/icons';

import { v4 as uuidv4 } from 'uuid';
import CompaignDetails from '../CampaignDetails';
import EditTask from '../Tasks/EditTask';

const ActionButton = () => {
  const {
    selectedValue,
    handleClick,
    handleSelectedOptionValue,
    actionsModalDetails,
    setActionsModalDetails,
  } = useCampaigns();

  return (
    <Box>
      <Button
        onClick={handleClick}
        className="small"
        variant="outlined"
        color="inherit"
        sx={{
          width: { sm: '112px', xs: '100%' },
          height: '36px',
        }}
      >
        Actions
        <ArrowDropDown />
      </Button>
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
                handleSelectedOptionValue(option);
              }}
            >
              {option}
            </MenuItem>
          );
        })}
      </Menu>

      {actionsModalDetails?.isDelete && (
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
          handleSubmit={() =>
            setActionsModalDetails({
              ...actionsModalDetails,
              isDelete: false,
            })
          }
        />
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
        />
      )}
      {actionsModalDetails?.isOpenFilterDrawer && (
        <EditGoalDrawer
          isOpenDrawer={actionsModalDetails?.isOpenFilterDrawer}
          onClose={() =>
            setActionsModalDetails({
              ...actionsModalDetails,
              isOpenFilterDrawer: false,
            })
          }
        />
      )}
      {actionsModalDetails?.isExportCompaign && (
        <ExportCompaignDrawer
          isOpenDrawer={actionsModalDetails?.isExportCompaign}
          onClose={() =>
            setActionsModalDetails({
              ...actionsModalDetails,
              isExportCompaign: false,
            })
          }
        />
      )}
      {actionsModalDetails?.isEditCompaign && (
        <EditCompaign
          isOpenDrawer={actionsModalDetails?.isEditCompaign}
          onClose={() =>
            setActionsModalDetails({
              ...actionsModalDetails,
              isEditCompaign: false,
            })
          }
        />
      )}
      {actionsModalDetails?.isViewDeatsils && (
        <CompaignDetails
          open={actionsModalDetails?.isViewDeatsils}
          onClose={() =>
            setActionsModalDetails({
              ...actionsModalDetails,
              isViewDeatsils: false,
            })
          }
        />
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
