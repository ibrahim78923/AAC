import { Box, Divider, Typography } from '@mui/material';
import { Fragment } from 'react';
import { assetsData } from './Assets.data';
import { AntSwitch } from '@/components/AntSwitch';

export const Assets = () => {
  const onSwitchChange = (id: any) => {
    alert(id);
  };

  return (
    <>
      {assetsData?.map((head: any) => (
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
            >
              {item.value}
              <Typography
                color={'custom.dim_blue'}
                variant={'body1'}
                fontWeight={500}
              >
                {item?.title}
              </Typography>

              <AntSwitch
                onChange={() => onSwitchChange(item?._id)}
                checked={item?.value}
              />
            </Box>
          ))}
        </Fragment>
      ))}
    </>
  );
};
