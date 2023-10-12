import { Box, IconButton, Typography, useTheme } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import CloseIcon from '@mui/icons-material/Close';
import Image from 'next/image';
import {
  pdfImage,
  // xlsImage,
  // datenImage,
  // placeImage,
  // croosCircleImage,
  // docImage,
} from '@/assets/images';
export const AttachFileCard = ({ data }: any) => {
  const theme = useTheme();
  return (
    <Box
      key={uuidv4()}
      display={'flex'}
      alignItems={'center'}
      flexWrap={'wrap'}
      border={'2px solid #EAECF0'}
      // border={`1px solid ${theme?.palette?.primary?.main}`}
      borderRadius={'.3rem'}
      gap={'.5rem'}
      marginTop={1.5}
      padding={1}
    >
      <Image src={pdfImage} alt="" width={0} height={0} />
      <Box
        display={'flex'}
        flex={'auto'}
        alignItems={'center'}
        justifyContent={'space-between'}
      >
        <div>
          <Typography variant="body2" fontWeight={600} whiteSpace={'nowrap'}>
            {data?.name}
          </Typography>
          <Typography variant="body3" whiteSpace={'nowrap'}>
            {data?.size}
          </Typography>
        </div>
        <IconButton size="small" sx={{ backgroundColor: '#EAECF0 ' }}>
          <CloseIcon sx={{ color: theme?.palette?.common?.white }} />
        </IconButton>
      </Box>
    </Box>
  );
};
