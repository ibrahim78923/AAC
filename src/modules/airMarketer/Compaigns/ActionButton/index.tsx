import { Box, Button, Menu, MenuItem } from '@mui/material';

import { ArrowDropDown } from '@mui/icons-material';

import useCompaigns from '../useCompaigns';
import { actionsOptions } from './ActionButton.data';

import CloneModal from '../CloneModal';
import EditGoalDrawer from '../EidtGoalDrawer';
import ExportCompaignDrawer from '../ExportCompaignDrawer';
import EditCompaign from '../EditCompaign';

import { AlertModals } from '@/components/AlertModals';
import { AlertModalDeleteIcon } from '@/assets/icons';

import { v4 as uuidv4 } from 'uuid';

const ActionButton = () => {
  const {
    theme,
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
        sx={{
          border: `1px solid ${theme?.palette?.custom?.dark}`,
          color: theme?.palette?.custom?.main,
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
    </Box>
  );
};

export default ActionButton;
