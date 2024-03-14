import { Box, Divider, Typography } from '@mui/material';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import DeleteIcon from '@mui/icons-material/Delete';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { AlertModals } from '@/components/AlertModals';
import { ALERT_MODALS_TYPE } from '@/constants/strings';
import router from 'next/router';
import { AIR_SERVICES } from '@/constants';
import { useSubListLocation } from './useSubListLocation';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_SERVICES_SETTINGS_ASSETS_MANAGEMENT_PERMISSIONS } from '@/constants/permission-keys';

export const SubListLocation = (props: any) => {
  const { country, childId, parentId } = props;
  const {
    showIcon,
    setShowIcon,
    theme,
    setIsOpenAlert,
    isOpenAlert,
    handleDeleteSubmit,
  } = useSubListLocation(props);
  return (
    <>
      <Box
        display={'flex'}
        justifyContent={'space-between'}
        alignItems={'center'}
        sx={{ cursor: 'pointer' }}
        onMouseEnter={() => setShowIcon(true)}
        onMouseLeave={() => setShowIcon(false)}
        border={`.1rem solid ${theme?.palette?.grey[700]}`}
        bgcolor={'white'}
        padding={1}
        mt={1}
      >
        <Box display={'flex'} justifyContent={'start'} flexWrap={'wrap'}>
          <Typography color={'primary'}>L</Typography>
          <Divider
            orientation="vertical"
            flexItem
            sx={{
              margin: '0 2rem',
              border: `.1rem solid ${theme?.palette?.grey[700]}`,
              backgroundColor: 'transparent',
            }}
          />
          <Typography>{country}</Typography>
        </Box>
        <PermissionsGuard
          permissions={[
            AIR_SERVICES_SETTINGS_ASSETS_MANAGEMENT_PERMISSIONS?.VIEW_EDIT_DELETE_LOCATIONS,
          ]}
        >
          <Box gap={1} display={'flex'}>
            {showIcon && (
              <AddCircleRoundedIcon
                color="primary"
                fontSize="small"
                onClick={() =>
                  router?.push({
                    pathname: AIR_SERVICES?.ADD_NEW_LOCATION,
                    query: {
                      parentId: parentId,
                    },
                  })
                }
              />
            )}
            {showIcon && (
              <BorderColorIcon
                fontSize="small"
                color="primary"
                onClick={() =>
                  router?.push({
                    pathname: AIR_SERVICES?.ADD_NEW_LOCATION,
                    query: {
                      type: 'child-edit',
                      parentId: parentId,
                      childId: childId,
                    },
                  })
                }
              />
            )}
            {showIcon && (
              <DeleteIcon
                fontSize="small"
                color="primary"
                onClick={() => setIsOpenAlert(true)}
              />
            )}
          </Box>
        </PermissionsGuard>
      </Box>
      <AlertModals
        message={'Are you sure you want to delete this list?'}
        type={ALERT_MODALS_TYPE?.DELETE}
        open={isOpenAlert}
        handleClose={() => setIsOpenAlert(false)}
        handleSubmitBtn={() => {
          handleDeleteSubmit(parentId, childId);
        }}
      />
    </>
  );
};
