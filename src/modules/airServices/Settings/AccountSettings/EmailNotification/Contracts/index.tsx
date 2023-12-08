import { Box, Divider, Typography } from '@mui/material';
import { AntSwitch } from '../SwitchButton.style';
import { EditYellowBGPenIcon } from '@/assets/icons';
import { useContracts } from './useContracts';

export const Contracts = () => {
  const { contract, setShowIcon, showIcon, onSwitchChange } = useContracts();
  return (
    <Box>
      <Box>
        <Typography variant="h4">Requester Notification</Typography>
      </Box>
      <Box mt={2}>
        <Divider />
      </Box>
      {contract?.map((item) => {
        return (
          <Box
            key={item?.id}
            p={2}
            my={1}
            display={'flex'}
            bgcolor={'grey.300'}
            borderRadius={2}
            height={{ xs: 'unset', md: 50 }}
            justifyContent={'space-between'}
            onMouseEnter={() => setShowIcon(item)}
            onMouseLeave={() => setShowIcon(null)}
          >
            {item?.name}
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
