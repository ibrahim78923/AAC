import { Box, Typography } from '@mui/material';
import { AntSwitch } from '../SwitchButton.style';
import { Fragment } from 'react';
import { EditYellowBGPenIcon } from '@/assets/icons';
import { useTickets } from './useTickets';

export const Tickets = () => {
  const { ticketData, setShowIcon, showIcon, onSwitchChange } = useTickets();

  return (
    <Fragment>
      {ticketData?.map((item: any) => (
        <Box key={item?.id}>
          <Typography variant="h4">{item?.heading}</Typography>
          {item?.detail?.map((val: any) => (
            <Box
              p={2}
              my={1}
              borderRadius={2}
              bgcolor={'grey.300'}
              height={{ xs: 'unset', md: 50 }}
              display={'flex'}
              justifyContent={'space-between'}
              key={val?.id}
              onMouseEnter={() => setShowIcon(val)}
              onMouseLeave={() => setShowIcon(null)}
              sx={{ cursor: 'pointer' }}
            >
              <Box display={'flex'} alignItems={'center'} gap={'.5rem'}>
                <Typography>{val?.name}</Typography>
              </Box>
              <Box display={'flex'} alignItems={'center'} gap={1}>
                {showIcon === val ? (
                  <Box>
                    <EditYellowBGPenIcon />
                  </Box>
                ) : null}

                <AntSwitch
                  onChange={() => {
                    onSwitchChange(val?.id);
                  }}
                  checked={val?.value}
                />
              </Box>
            </Box>
          ))}
        </Box>
      ))}
    </Fragment>
  );
};
