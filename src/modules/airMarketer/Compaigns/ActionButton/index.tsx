import { Box, Button, Menu, MenuItem } from '@mui/material';

import { ArrowDropDown } from '@mui/icons-material';

import useCompaigns from '../useCampaigns';
import { actionsOptions } from './ActionButton.data';

import CloneModal from '../CloneModal';
import EditGoalDrawer from '../EidtGoalDrawer';
import ExportCompaignDrawer from '../ExportCompaignDrawer';
import EditCompaign from '../EditCompaign';

import { AlertModals } from '@/components/AlertModals';
import { AlertModalDeleteIcon } from '@/assets/icons';

import { v4 as uuidv4 } from 'uuid';
import EditColumns from '../EditColumns';
import CompaignDetails from '../CompaignDetails';

const ActionButton = () => {
  const {
    selectedValue,
    handleClick,
    handleSelectedOptionValue,
    actionsModalDetails,
    setActionsModalDetails,
    isDelete,
    setIsDelete,
  } = useCompaigns();

  return (
    <Box>
      <Button
        onClick={handleClick}
        className="small"
        variant="outlined"
        color="inherit"
        sx={{
          width: '112px',
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

      {isDelete && (
        <AlertModals
          message="Are you sure you want to delete this broadcast?"
          type="Delete SMS Broadcast"
          typeImage={<AlertModalDeleteIcon />}
          open={isDelete}
          handleClose={() => setIsDelete(false)}
          handleSubmit={() => setIsDelete(false)}
        />
      )}
      {actionsModalDetails?.isClone && (
        <CloneModal openCloneModal={actionsModalDetails?.isClone} />
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
      {actionsModalDetails?.isEditColumns && (
        <EditColumns
          open={actionsModalDetails?.isEditColumns}
          onClose={() =>
            setActionsModalDetails({
              ...actionsModalDetails,
              isEditColumns: false,
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
    </Box>
  );
};

export default ActionButton;
