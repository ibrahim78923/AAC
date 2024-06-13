import { Box, Typography } from '@mui/material';
import { DropdownMenuIcon } from '@/assets/icons';
import DeleteIcon from '@mui/icons-material/Delete';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { useState } from 'react';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_SERVICES_SETTINGS_ASSETS_MANAGEMENT_PERMISSIONS } from '@/constants/permission-keys';

export const LocationCard = (props: any) => {
  const {
    continents,
    handleCollapse,
    parentId,
    setDeleteRecord,
    isChild = false,
    childId,
    onEditClick,
  } = props;

  const [showIcon, setShowIcon] = useState(false);

  return (
    <>
      <Box
        display={'flex'}
        justifyContent={'space-between'}
        flexWrap={'wrap'}
        borderLeft={`.5rem solid`}
        bgcolor={'white'}
        boxShadow={isChild ? 0 : 2}
        padding={isChild ? 1 : 1.5}
        borderRadius={isChild ? 0 : 2}
        onMouseEnter={() => setShowIcon(true)}
        onMouseLeave={() => setShowIcon(false)}
        sx={{
          borderLeftColor: 'primary.main',
          cursor: 'pointer',
          ...(isChild && { border: '1px solid', borderColor: 'grey.700' }),
        }}
        my={2}
      >
        <Box display={'flex'} flexWrap={'wrap'} gap={2}>
          {isChild ? (
            <Typography color={'primary'}>L</Typography>
          ) : (
            <Box onClick={handleCollapse} display={'flex'}>
              <DropdownMenuIcon />
            </Box>
          )}
          <Typography
            borderLeft={'.2rem solid'}
            px={2}
            sx={{ borderLeftColor: 'grey.700' }}
            color="slateBlue.main"
          >
            {continents}
          </Typography>
        </Box>
        <PermissionsGuard
          permissions={[
            AIR_SERVICES_SETTINGS_ASSETS_MANAGEMENT_PERMISSIONS?.VIEW_EDIT_DELETE_LOCATIONS,
          ]}
        >
          {showIcon && (
            <Box gap={1} display={'flex'} flexWrap={'wrap'}>
              <BorderColorIcon
                fontSize="small"
                color="primary"
                onClick={() => onEditClick?.()}
              />
              <DeleteIcon
                fontSize="small"
                color="primary"
                onClick={() =>
                  setDeleteRecord?.({
                    childId: childId,
                    parentId: parentId,
                    isChild,
                  })
                }
              />
            </Box>
          )}
        </PermissionsGuard>
      </Box>
    </>
  );
};
