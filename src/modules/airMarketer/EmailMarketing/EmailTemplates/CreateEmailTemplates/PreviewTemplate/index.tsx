// import {
//     dynamicallyFormDefaultValues,
//     dynamicallyFormValidationSchema,
// } from '../CreateTemplatesForm.data';
import { useState } from 'react';
import {
  // BackArrowIcon,
  CloseDrawerIcon,
  // DeleteIcon,
  // DragSharedIcon,
  // FacebookTemplateIcon,
  // InstagramTemplateIcon,
  // LaptopIcon,
  // LaptopWhiteIcon,
  // LinkedinTemplateIcon,
  // MobileTabIcon,
  // MobileWhiteIcon,
  // TwitterTemplateIcon,
} from '@/assets/icons';
// import { isNullOrEmpty } from '@/utils';

// import { AIR_MARKETER } from '@/routesConstants/paths';
// import { useRouter } from 'next/router';
// import { TabContext, TabList, TabPanel } from '@mui/lab';
// import Link from 'next/link';
// import Image from 'next/image';
// import { LogoImage } from '@/assets/images';
import { Box, Button, Typography, useTheme } from '@mui/material';
import { deviceTypes } from './PreviewTemplate.data';

const PreviewTemplate = ({ setOpenModal }: any) => {
  const theme = useTheme();
  const [value, setValue] = useState('laptop');
  const handleChange = (newValue: string) => {
    setValue(newValue);
  };

  return (
    <Box>
      <Box
        sx={{
          marginBottom: '20px',
          display: 'flex',
          gap: 1,
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Box>
          <Typography variant="h5">Preview</Typography>
          <Typography>Your Preview will appear here</Typography>
        </Box>
        <Box
          onClick={() => setOpenModal(false)}
          sx={{ width: '30px', height: '40px', cursor: 'pointer' }}
        >
          <CloseDrawerIcon />
        </Box>
      </Box>

      <Box
        sx={{
          display: 'flex',
          backgroundColor: theme?.palette?.primary?.light,
          width: 'fit-content',
          p: 0.5,
          borderRadius: '8px',
          margin: '0 auto',
        }}
      >
        {deviceTypes(value)?.map(({ type, icon }) => (
          <Box key={type}>
            <Button
              variant={value === type ? 'contained' : 'outlined'}
              sx={{ border: 'none !important' }}
              onClick={() => handleChange(type)}
            >
              {icon}
            </Button>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default PreviewTemplate;
