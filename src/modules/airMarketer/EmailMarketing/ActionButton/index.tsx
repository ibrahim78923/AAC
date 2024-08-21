import { Box, Button, Menu, MenuItem } from '@mui/material';

import { ArrowDropDown } from '@mui/icons-material';

import { actionsOptions } from './ActionButton.data';

import { AlertModals } from '@/components/AlertModals';
import { AlertModalDeleteIcon, InfoBlueIcon } from '@/assets/icons';

import { v4 as uuidv4 } from 'uuid';
import useEmailMarketing from '../useEmailMarketing';
import MoveToFolder from '../MoveToFolder';
import ViewDetailsAndPerformance from '../ViewDetailsAndPerformance';
import SaveEmailAsTemplate from '../SaveEmailAsTemplate';
import ManageAccess from '../ManageAccess';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_MARKETER_EMAIL_MARKETING_EMAIL_LIST_PERMISSIONS } from '@/constants/permission-keys';
import { enqueueSnackbar } from 'notistack';
import {
  useDeleteEmailTemplateMutation,
  useUpdateEmailTemplatesMutation,
} from '@/services/airMarketer/emailMarketing';
import { EMAIL_ENUMS, indexNumbers } from '@/constants';

const ActionButton = ({ selectedRecords, setSelectedRecords }: any) => {
  const {
    selectedValue,
    handleClick,
    handleSelectedOptionValue,
    actionsModalDetails,
    setActionsModalDetails,
  } = useEmailMarketing();

  const [deleteEmailTemplate, { isLoading: loadingEmailTemplate }] =
    useDeleteEmailTemplateMutation();
  const [updateEmailTemplate, { isLoading: loadingUpdateEmailTemplate }] =
    useUpdateEmailTemplatesMutation();

  const handelDeleteRecords = async () => {
    const selectedIds = selectedRecords?.map((record: any) => record?._id);
    try {
      await deleteEmailTemplate({
        ids: selectedIds,
      })?.unwrap();
      enqueueSnackbar('Mail permanently deleted', {
        variant: 'success',
      });
      setSelectedRecords([]);
      setActionsModalDetails({
        ...actionsModalDetails,
        isDelete: false,
      });
    } catch (error: any) {
      enqueueSnackbar('Something went wrong !', { variant: 'error' });
    }
  };
  const handleArchive = async () => {
    const selectedIds = selectedRecords[indexNumbers?.ZERO];
    try {
      await updateEmailTemplate({
        id: selectedIds?._id,
        body: {
          status: EMAIL_ENUMS?.ARCHIVED,
        },
      })?.unwrap();
      enqueueSnackbar('Request Successful', {
        variant: 'success',
      });
      setSelectedRecords([]);
      setActionsModalDetails({
        ...actionsModalDetails,
        isArchive: false,
      });
    } catch (error: any) {
      enqueueSnackbar('Something went wrong !', { variant: 'error' });
    }
  };

  return (
    <Box
      sx={{
        width: { xs: '100%', sm: 'auto', md: 'auto', lg: '112px' },
      }}
    >
      <Button
        onClick={handleClick}
        variant="outlined"
        color="inherit"
        className="small"
        disabled={selectedRecords?.length < 1}
        sx={{
          width: { xs: '100%', sm: 'auto', md: 'auto', lg: '112px' },
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
        {actionsOptions({ selectedRecords })?.map((option) => {
          return (
            <MenuItem
              key={uuidv4()}
              disabled={option?.isDisabled}
              onClick={() => {
                handleSelectedOptionValue(option?.label);
              }}
            >
              {option?.label}
            </MenuItem>
          );
        })}
      </Menu>

      {actionsModalDetails?.isDelete && (
        <PermissionsGuard
          permissions={[
            AIR_MARKETER_EMAIL_MARKETING_EMAIL_LIST_PERMISSIONS?.DELETE_EMAILS,
          ]}
        >
          <AlertModals
            message={`Are you sure you want to delete ${
              selectedRecords?.length > 1 ? 'these' : 'this'
            } record? `}
            type="Delete"
            typeImage={<AlertModalDeleteIcon />}
            open={actionsModalDetails?.isDelete}
            loading={loadingEmailTemplate}
            handleClose={() =>
              setActionsModalDetails({
                ...actionsModalDetails,
                isDelete: false,
              })
            }
            handleSubmitBtn={handelDeleteRecords}
          />
        </PermissionsGuard>
      )}
      {actionsModalDetails?.isDuplicate && (
        <PermissionsGuard
          permissions={[
            AIR_MARKETER_EMAIL_MARKETING_EMAIL_LIST_PERMISSIONS.DUPLICATE_EMAILS,
          ]}
        >
          <AlertModals
            message="Are you sure you want to duplicate this email?"
            type="Information"
            typeImage={<InfoBlueIcon />}
            open={actionsModalDetails?.isDuplicate}
            handleClose={() =>
              setActionsModalDetails({
                ...actionsModalDetails,
                isDuplicate: false,
              })
            }
            handleSubmitBtn={() =>
              setActionsModalDetails({
                ...actionsModalDetails,
                isDuplicate: false,
              })
            }
          />
        </PermissionsGuard>
      )}
      {actionsModalDetails?.isArchive && (
        <PermissionsGuard
          permissions={[
            AIR_MARKETER_EMAIL_MARKETING_EMAIL_LIST_PERMISSIONS.ARCHIVED_EMAILS,
          ]}
        >
          <AlertModals
            message="Are you sure you want to archive this email?"
            type="Information"
            typeImage={<InfoBlueIcon />}
            open={actionsModalDetails?.isArchive}
            loading={loadingUpdateEmailTemplate}
            handleClose={() =>
              setActionsModalDetails({
                ...actionsModalDetails,
                isArchive: false,
              })
            }
            handleSubmitBtn={handleArchive}
          />
        </PermissionsGuard>
      )}
      {actionsModalDetails?.isMoveToFolder && (
        <PermissionsGuard
          permissions={[
            AIR_MARKETER_EMAIL_MARKETING_EMAIL_LIST_PERMISSIONS.MOVE_TO_FOLDERS,
          ]}
        >
          <MoveToFolder
            openMoveToFolderModal={actionsModalDetails?.isMoveToFolder}
            handleCloseMoveToFolderModal={() =>
              setActionsModalDetails({
                ...actionsModalDetails,
                isMoveToFolder: false,
              })
            }
          />
        </PermissionsGuard>
      )}
      {actionsModalDetails?.isViewDetails && (
        <ViewDetailsAndPerformance
          openViewDetails={actionsModalDetails?.isViewDetails}
          handleCloseViewDetails={() =>
            setActionsModalDetails({
              ...actionsModalDetails,
              isViewDetails: false,
            })
          }
          selectedRecords={selectedRecords[indexNumbers?.ZERO]}
        />
      )}
      {actionsModalDetails?.isSaveAsTemplate && (
        <PermissionsGuard
          permissions={[
            AIR_MARKETER_EMAIL_MARKETING_EMAIL_LIST_PERMISSIONS.SAVE_AS_TEMPLATE,
          ]}
        >
          <SaveEmailAsTemplate
            openSaveEmailAsTemplateModal={actionsModalDetails?.isSaveAsTemplate}
            handleCloseSaveEmailAsTemplateModal={() =>
              setActionsModalDetails({
                ...actionsModalDetails,
                isSaveAsTemplate: false,
              })
            }
          />
        </PermissionsGuard>
      )}
      {actionsModalDetails?.isManageAccess && (
        <PermissionsGuard
          permissions={[
            AIR_MARKETER_EMAIL_MARKETING_EMAIL_LIST_PERMISSIONS.MANAGE_ACCESS,
          ]}
        >
          <ManageAccess
            isOpenManageAccessModal={actionsModalDetails?.isManageAccess}
            handleCloseManageAccessModal={() =>
              setActionsModalDetails({
                ...actionsModalDetails,
                isManageAccess: false,
              })
            }
          />
        </PermissionsGuard>
      )}
    </Box>
  );
};

export default ActionButton;
