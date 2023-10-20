import React from 'react';
import { Card, Typography, Box, Button, useMediaQuery } from '@mui/material';
import {
  pdfImage,
  xlsImage,
  datenImage,
  placeImage,
  croosCircleImage,
  docImage,
  plusImage,
} from '@/assets/images';
import Image from 'next/image';
import { v4 as uuidv4 } from 'uuid';
import { Grid } from '@mui/material';
import { fileAttachmentData } from './FileAttachment.data';
import { fileAttachmentStyles } from './FileAttachment.style';
const getImageByType = (type: any) => {
  switch (type) {
    case 'PDF':
      return pdfImage;
    case 'XLS':
      return xlsImage;
    case 'DATEN':
      return datenImage;
    case 'PLACE':
      return placeImage;
    case 'DOC':
      return docImage;
    default:
      return pdfImage;
  }
};

const FileAttachment = () => {
  const matches = useMediaQuery('(max-width:600px)');
  return (
    <>
      <Grid
        container
        sx={{ justifyContent: 'end', display: 'flex', mb: '2rem' }}
      >
        <label htmlFor="upload-photo">
          <input
            style={{ display: 'none' }}
            id="upload-photo"
            name="upload-photo"
            type="file"
          />

          <Button
            sx={{ ...fileAttachmentStyles.fileAttachementButton }}
            fullWidth={matches}
            startIcon={<Image src={plusImage} alt="Plus Icon" />}
            // variant="contained"
            component="span"
          >
            Attachments
          </Button>
        </label>
        ;
      </Grid>
      <Grid container spacing={2} sx={{ mb: '447px' }}>
        {fileAttachmentData.map((item) => (
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
            <Card
              sx={{
                width: '100%',
                height: '70px',
                flexShrink: 0,
                borderRadius: '8px',
                border: '1px solid  #E5E7EB',
                background: '#FFF',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '8px',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Image
                  src={getImageByType(item.type)}
                  alt={`${item.type} Icon`}
                  style={{
                    marginRight: '8px',
                  }}
                />

                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                  <Typography
                    sx={{ ...fileAttachmentStyles.fileAttachementTitle }}
                  >
                    {item.description}
                  </Typography>
                  <Typography
                    sx={{ ...fileAttachmentStyles.fileAttachementDescrpt }}
                  >
                    {item.size}
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ marginLeft: 'auto' }}>
                <Image src={croosCircleImage} />
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default FileAttachment;
