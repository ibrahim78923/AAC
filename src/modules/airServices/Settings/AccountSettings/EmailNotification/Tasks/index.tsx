import { Box, Divider, Typography } from '@mui/material';
import { AntSwitch } from '../SwitchButton.style';
import { EditYellowBGPenIcon } from '@/assets/icons';
import { useTask } from './useTask';

export const Tasks = () => {
  const { tasks, setShowIcon, showIcon, onSwitchChange } = useTask();

  return (
    <Box>
      <Box>
        <Typography variant="h4">Requester Notification</Typography>
      </Box>
      <Box mt={2}>
        <Divider />
      </Box>

      {tasks?.map((item) => {
        return (
          <Box
            key={item?.id}
            p={2}
            my={1}
            display={'flex'}
            height={{ xs: 'unset', md: 50 }}
            bgcolor={'grey.300'}
            borderRadius={2}
            justifyContent={'space-between'}
            onMouseEnter={() => setShowIcon(item)}
            onMouseLeave={() => setShowIcon(null)}
            sx={{ cursor: 'pointer' }}
          >
            {item?.name}
            <Box display={'flex'} alignItems={'center'} gap={1}>
              <Box>
                {showIcon === item ? (
                  <Box>
                    <EditYellowBGPenIcon />
                  </Box>
                ) : null}
              </Box>
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
