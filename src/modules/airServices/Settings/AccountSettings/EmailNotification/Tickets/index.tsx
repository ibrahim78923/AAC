import { Box, Divider, Typography } from '@mui/material';
import { AntSwitch } from '@/components/AntSwitch';
import { Fragment, useState } from 'react';
import { ticketDataArray } from './Tickets.data';
import BorderColorIcon from '@mui/icons-material/BorderColor';

export const Tickets = () => {
  const [showIcon, setShowIcon] = useState<any>(null);

  const onSwitchChange = (id: any) => {
    alert(id);
  };

  return (
    <>
      {ticketDataArray?.map((head: any) => (
        <Fragment key={head?._id}>
          <Typography variant={'h5'} color={'blue.main'}>
            {head?.heading}
          </Typography>

          <Divider sx={{ my: 2, borderColor: 'custom.dark' }} />

          {head?.details?.map((item: any) => (
            <Box
              key={item?._id}
              p={2}
              my={1}
              borderRadius={2}
              bgcolor={'custom.white_fifty'}
              display={'flex'}
              justifyContent={'space-between'}
              onMouseEnter={() => setShowIcon(item)}
              onMouseLeave={() => setShowIcon(null)}
              sx={{ cursor: 'pointer' }}
            >
              {item.value}
              <Typography
                color={'custom.dim_blue'}
                variant={'body1'}
                fontWeight={500}
              >
                {item?.title}
              </Typography>

              <Box display={'flex'} alignItems={'center'} gap={1}>
                {showIcon === item && (
                  <BorderColorIcon sx={{ color: 'custom.dim_blue' }} />
                )}

                <AntSwitch
                  onChange={() => onSwitchChange(item?._id)}
                  checked={item?.value}
                />
              </Box>
            </Box>
          ))}
        </Fragment>
      ))}
    </>
  );
};
