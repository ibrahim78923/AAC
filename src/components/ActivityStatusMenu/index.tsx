import {
  Box,
  CircularProgress,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Select,
  Typography,
} from '@mui/material';
import { ChangeEvent } from 'react';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { ACTIVITY_STATUS_MENU } from '@/constants';
import { getActivityStatusItemsColor } from './ActivityStatusMenu.data';
import { IActivityStatusMenuProps } from './ActivityStatusMenu.interface';
import { useActivityStatusMenu } from './useActivityStatusMenu';

export const ActivityStatusMenu = (props: IActivityStatusMenuProps) => {
  const { info, activityStatus, MenuItemDataArray } = props;

  const { statusQuery, handleStatusChange, backgroundColor, color, textColor } =
    useActivityStatusMenu(props);

  return (
    <>
      {statusQuery?.isLoading &&
      statusQuery?.originalArgs?.queryParams === info?.row?.original?._id ? (
        <CircularProgress size={20} />
      ) : (
        <Select
          value={info?.getValue()?.toUpperCase()}
          onChange={(event: ChangeEvent<HTMLSelectElement> | any) =>
            handleStatusChange(info?.row?.original, event)
          }
          size={'small'}
          disabled={
            activityStatus === ACTIVITY_STATUS_MENU?.EXPIRED ||
            statusQuery?.isLoading
          }
          sx={{
            backgroundColor,
            borderRadius: '100px',
            width: 120,
            color,
            '.MuiSelect-select': { py: 0.3 },
            '.MuiOutlinedInput-notchedOutline': {
              border: 'none',
            },
            '.MuiSelect-icon': {
              mt: 0.1,
              display:
                activityStatus === ACTIVITY_STATUS_MENU?.EXPIRED ? 'none' : '',
              color,
            },
            '& .Mui-disabled': {
              color,
              WebkitTextFillColor: textColor,
              textAlign: 'end',
              svg: {
                color: textColor,
              },
            },
          }}
          renderValue={(selected: string) => (
            <Box display={'flex'} alignItems={'center'} gap={1}>
              <FiberManualRecordIcon sx={{ fontSize: 10 }} />
              <Typography variant={'body2'} textTransform={'capitalize'}>
                {selected?.toLowerCase()}
              </Typography>
            </Box>
          )}
        >
          {MenuItemDataArray?.map((item: any) => {
            const { colorItems, iconColorItems }: any =
              getActivityStatusItemsColor(item?.value);

            return (
              <MenuItem value={item?.value} key={item?.value}>
                <ListItemIcon
                  sx={{ '&.MuiListItemIcon-root': { minWidth: 0 } }}
                >
                  <FiberManualRecordIcon
                    sx={{ fontSize: 10 }}
                    color={iconColorItems}
                  />
                </ListItemIcon>
                <ListItemText
                  primary={item?.label}
                  sx={{
                    color: colorItems,
                  }}
                />
              </MenuItem>
            );
          })}
        </Select>
      )}
    </>
  );
};
