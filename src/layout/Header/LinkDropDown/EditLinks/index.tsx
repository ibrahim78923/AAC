import React from 'react';
import Image from 'next/image';
import { Box, Button, Grid, Skeleton, Typography } from '@mui/material';
import { ArrowSquareLeftImage } from '@/assets/images';
import { PlusIcon } from '@/assets/icons';
import { styles } from './QuickLinks.style';
import useEditLinks from './useEditLinks';
import LinkCheckbox from './LinkCheckbox';
import { v4 as uuidv4 } from 'uuid';
import useLinkDropDown from '../useLinkDropDown';
import Loader from '@/components/Loader';

const EditLinks = ({ toggleView }: any) => {
  const skeletonArr = [1, 2, 3, 4, 5, 6];
  const {
    checkedItems,
    handleCheckboxChange,
    handleSubmitSaveQuickLinks,
    loadingSaveQuickLinks,
  } = useLinkDropDown();
  const { activeQuickLinksData, isLoading, isFetching } = useEditLinks();

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
          <Button
            variant="contained"
            sx={{ minWidth: '0px', gap: 1, height: '32px' }}
            onClick={handleSubmitSaveQuickLinks}
          >
            <PlusIcon />
            <Typography>Save</Typography>
          </Button>
        </Box>
      </Box>

      <Box sx={{ p: '10px 20px 20px', maxHeight: '190px', overflowY: 'auto' }}>
        <Grid container spacing={2} sx={{ maxWidth: '480px' }}>
          {isLoading || isFetching
            ? skeletonArr.map(() => (
                <Grid item xs={6} key={uuidv4()}>
                  <Skeleton variant="rounded" height={40} />
                </Grid>
              ))
            : activeQuickLinksData?.map((link: any) => (
                <Grid item xs={6} key={link?._id}>
                  <LinkCheckbox
                    label={link?.name}
                    name={link?._id}
                    quickLinkIds={checkedItems}
                    onChange={handleCheckboxChange}
                  />
                </Grid>
              ))}
        </Grid>
      </Box>

      <Loader isLoading={loadingSaveQuickLinks} />
    </>
  );
};

export default EditLinks;
