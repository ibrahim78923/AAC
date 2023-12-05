import { Box, Divider, Typography } from '@mui/material';
import { AntSwitch } from '../SwitchButton.style';
import { EditYellowBGPenIcon } from '@/assets/icons';
import { useAssets } from './useAssets';

export const Assets = () => {
  const { asset, setShowIcon, showIcon, onSwitchChange } = useAssets();

  return (
    <Box>
      <Box>
        <Typography variant="h4">Asset Notification</Typography>
      </Box>
      <Divider />
      {asset?.map((item) => {
        return (
          <Box
            key={item?.id}
            p={2}
            my={1}
            bgcolor={'grey.300'}
            borderRadius={2}
            height={{ xs: 'unset', md: 50 }}
            display={'flex'}
            justifyContent={'space-between'}
            onMouseEnter={() => setShowIcon(item)}
            onMouseLeave={() => setShowIcon(null)}
          >
            <Typography>Hardware Warranty Expiry Notification</Typography>
            <Box display={'flex'} alignItems={'center'} gap={1}>
              {showIcon === item ? <EditYellowBGPenIcon /> : null}
              <AntSwitch
                onChange={() => {
                  onSwitchChange(item?.id);
                }}
                checked={item?.value}
              />
            </Box>
          </Box>
        );
      })}
    </Box>
  );
};
