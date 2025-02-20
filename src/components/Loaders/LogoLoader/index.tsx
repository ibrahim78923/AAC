import React from 'react';
import style from './LogoLoader.module.css';
import { LogoAvatar } from '@/components/Avatars/LogoAvatar';
import { Box } from '@mui/material';
import { LogoLoaderPropsI } from '../Loaders.interface';

const LogoLoader = (props: LogoLoaderPropsI) => {
  const { height = '50vh' } = props;

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height,
      }}
    >
      <Box className={style?.logoLoader}>
        <LogoAvatar />
      </Box>
    </Box>
  );
};

export default LogoLoader;
