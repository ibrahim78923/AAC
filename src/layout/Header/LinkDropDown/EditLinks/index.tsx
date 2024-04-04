import React from 'react';
import Image from 'next/image';
import { Box, Button, Grid, Typography } from '@mui/material';
import { ArrowSquareLeftImage, DeleteImage } from '@/assets/images';
import { PlusIcon } from '@/assets/icons';
import { styles } from './QuickLinks.style';
import { isNullOrEmpty } from '@/utils';
import useEditLinks from './useEditLinks';
import LinkCheckbox from './LinkCheckbox';

const EditLinks = ({ toggleView }: any) => {
  const {
    dataGetQuickLinks,
    // handleCheckboxChange,
  } = useEditLinks();

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          p: '20px 20px 10px',
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'row', gap: 1 }}>
          <Box sx={styles?.menuDropDownLink} onClick={toggleView}>
            <Image src={ArrowSquareLeftImage} alt="GreenLink" />
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              gap: 0.5,
            }}
          >
            <Typography variant="subtitle1">Edit Links</Typography>
          </Box>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: 2,
          }}
        >
          <Image src={DeleteImage} alt="delete-icon" />

          <Button
            variant="contained"
            sx={{ minWidth: '0px', gap: 1, height: '32px' }}
            onClick={toggleView}
          >
            <PlusIcon />
            <Typography>Save</Typography>
          </Button>
        </Box>
      </Box>

      <Box sx={{ p: '10px 20px 20px', maxHeight: '190px', overflowY: 'auto' }}>
        <Grid container spacing={2} sx={{ maxWidth: '480px' }}>
          {!isNullOrEmpty(dataGetQuickLinks) &&
            dataGetQuickLinks?.data?.quicklinks?.map((link: any) => (
              <Grid item xs={6} key={link?._id}>
                <LinkCheckbox
                  label={link?.name}
                  name={link?._id}
                  // id={link?._id}
                  // onChange={handleCheckboxChange}
                  isActive={link?.isActive}
                />
              </Grid>
            ))}
        </Grid>
      </Box>
    </>
  );
};

export default EditLinks;
