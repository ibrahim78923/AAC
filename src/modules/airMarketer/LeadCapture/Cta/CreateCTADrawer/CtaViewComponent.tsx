import React from 'react';
import { Box } from '@mui/material';
import { generateImage } from '@/utils/avatarUtils';
import Image from 'next/image';

const CtaViewComponent = ({ data }: any) => {
  return (
    <Box component={'button'} sx={data?.styles}>
      {data?.buttonType === 'image' ? (
        <Image
          src={generateImage(data?.buttonImage?.url)}
          alt={data?.imageAltText}
          width={parseInt(data?.imageWidth, 10) || 100}
          height={parseInt(data?.imageHeight, 10) || 44}
        />
      ) : (
        data?.buttonContent
      )}
    </Box>
  );
};

export default CtaViewComponent;
