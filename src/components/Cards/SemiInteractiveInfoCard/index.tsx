import {
  FolderLargePrimaryIcon,
  FolderLargeYellowIcon,
  LockedIcon,
} from '@/assets/icons';
import { SingleDropdownButton } from '@/components/Buttons/SingleDropdownButton';
import { ConditionalPermissionGuard } from '@/GuardsAndPermissions/ConditionalPermissionGuard';
import { MoreHoriz } from '@mui/icons-material';
import { Box, Typography } from '@mui/material';
import { SemiInteractiveInfoCardPropsI } from '../Cards.interface';

export const SemiInteractiveInfoCard = (
  props: SemiInteractiveInfoCardPropsI,
) => {
  const {
    outerPaddingY = 2,
    isLocked = true,
    dropdownOptions,
    onClick,
    description,
    name,
    lockedMainIcon = <FolderLargePrimaryIcon />,
    unLockedMainIcon = <FolderLargeYellowIcon />,
    lockedIcon = <LockedIcon />,
    hasNoDropdownPermission = true,
    dropdownPermissions = [],
  } = props;

  return (
    <Box
      sx={{
        cursor: 'pointer',
        padding: 2,
        paddingY: outerPaddingY,
        gap: 1,
        height: '100%',
        border: '1px solid',
        borderColor: 'custom.off_white_three',
        borderRadius: 2,
      }}
      onClick={onClick}
    >
      <Box display="flex" justifyContent={'space-between'}>
        <Box>{isLocked ? lockedMainIcon : unLockedMainIcon}</Box>
        <Box>
          {isLocked ? (
            lockedIcon
          ) : (
            <ConditionalPermissionGuard
              hasNoPermission={hasNoDropdownPermission}
              permissions={dropdownPermissions}
            >
              <SingleDropdownButton
                dropdownOptions={dropdownOptions}
                dropdownName={
                  <MoreHoriz
                    sx={{ color: 'secondary.lighter' }}
                    fontSize="medium"
                  />
                }
                hasEndIcon={false}
                btnVariant="text"
              />
            </ConditionalPermissionGuard>
          )}
        </Box>
      </Box>
      <Box>
        <Typography
          fontWeight={700}
          color="blue.dark"
          mt={1}
          textTransform={'capitalize'}
        >
          {name}
        </Typography>

        <Typography
          fontWeight={500}
          variant="body2"
          color="custom.main"
          height={'100%'}
          overflow={'auto'}
          textTransform={isLocked ? 'capitalize' : 'none'}
        >
          {description ?? 'No Description'}
        </Typography>
      </Box>
    </Box>
  );
};
