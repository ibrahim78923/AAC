import { Card, Typography, Box, Grid } from '@mui/material';
import {
  pdfImage,
  xlsImage,
  datenImage,
  placeImage,
  croosCircleImage,
  docImage,
} from '@/assets/images';
import Image from 'next/image';
import { v4 as uuidv4 } from 'uuid';
import { AttachmentDetailsData } from './AttachmentDetails.data';
import { styles } from './AttachmentDetails.style';

const getImageByType = (type: 'PDF' | 'XLS' | 'DATEN' | 'PLACE' | 'DOC') => {
  const imageData = {
    PDF: pdfImage,
    XLS: xlsImage,
    DATEN: datenImage,
    PLACE: placeImage,
    DOC: docImage,
  };
  return imageData[type] || pdfImage;
};
const AttachmentDetails = () => {
  return (
    <>
      <Grid container spacing={2} sx={{ mt: '25px' }}>
        {AttachmentDetailsData.map((item: any) => (
          <Grid
            item
            lg={4}
            sm={6}
            xs={12}
            key={uuidv4()}
            sx={{
              display: 'flex',
              justifyContent: { lg: 'flex-start', xs: 'center' },
            }}
          >
            <Card sx={{ ...styles.AttachmentDetailsCards }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Image
                  src={getImageByType(item.type)}
                  alt={`${item.type} Icon`}
                  style={{
                    marginRight: '8px',
                  }}
                />
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                  <Typography sx={{ ...styles.AttachmentDetailsTitle }}>
                    {item.description}
                  </Typography>
                  <Typography
                    sx={{
                      ...styles.AttachmentDetailsTitleDescript,
                    }}
                  >
                    {item.size}
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ marginLeft: 'auto' }}>
                <Image src={croosCircleImage} alt={`${item.type} Icon`} />
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
};
export default AttachmentDetails;
