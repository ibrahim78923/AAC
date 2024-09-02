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
          width={data?.imageWidth || 100}
          height={data?.imageHeight || 44}
        />
      ) : (
        data?.buttonContent
      )}
    </Box>
  );
};

export default CtaViewComponent;
