import { ImageIcon, TextIcon } from '@/assets/icons';
import UndoIcon from '@mui/icons-material/Undo';
import RedoIcon from '@mui/icons-material/Redo';
import FlipIcon from '@mui/icons-material/Flip';
import ReplayCircleFilledIcon from '@mui/icons-material/ReplayCircleFilled';
import { Box, Button, Grid, Typography } from '@mui/material';
import { useEditPhysicalCard } from './useEditPhysicalCard';
import Image from 'next/image';
import { PhysicalCardBackImage, PhysicalCardFrontImage } from '@/assets/images';

export const EditPhysicalCard = () => {
  const { theme, flip, setFlip } = useEditPhysicalCard();

  return (
    <Grid container justifyContent={'space-between'} display={'flex'}>
      <Grid
        item
        xs={12}
        lg={8.7}
        bgcolor={'white'}
        border={`.1rem solid${theme?.palette?.grey[700]}`}
        borderRadius={1}
        mt={3}
        ml={3}
        p={2}
      >
        <>
          <Box
            display={'flex'}
            justifyContent={'space-between'}
            alignItems={'center'}
          >
            <Box
              display={'flex'}
              justifyContent={'center'}
              alignItems={'center'}
              gap={1}
            >
              <ReplayCircleFilledIcon />
              <UndoIcon />
              <RedoIcon />
            </Box>
            <Button
              variant="outlined"
              color="secondary"
              startIcon={<FlipIcon />}
              onClick={flip ? () => setFlip(false) : () => setFlip(true)}
            >
              Flip
            </Button>
          </Box>
          <Box
            display={'flex'}
            justifyContent={'center'}
            alignItems={'center'}
            mt={2}
            mb={5}
          >
            {flip ? (
              <Image src={PhysicalCardBackImage} alt={'backImg'} />
            ) : (
              <Image src={PhysicalCardFrontImage} alt={'frontImg'} />
            )}
          </Box>
        </>
      </Grid>
      <Grid
        item
        xs={12}
        lg={3}
        bgcolor={'white'}
        border={`.1rem solid${theme?.palette?.grey[700]}`}
        borderRadius={1}
        height={'50rem'}
        p={2}
      >
        <Typography variant="h4">Edit Physical Card</Typography>
        <Typography variant="body1" color="secondary">
          Add logo, text or an image
        </Typography>
        <br />
        <Box
          display={'flex'}
          justifyContent={'start'}
          alignItems={'center'}
          p={1.5}
          gap={1.5}
          border={`.1rem solid${theme?.palette?.grey[700]}`}
          borderRadius={2}
          sx={{ cursor: 'pointer' }}
        >
          <TextIcon />
          <Typography variant="body1">Text</Typography>
        </Box>
        <Box
          display={'flex'}
          justifyContent={'start'}
          alignItems={'center'}
          p={1.5}
          gap={1.5}
          border={`.1rem solid${theme?.palette?.grey[700]}`}
          borderRadius={2}
          mt={1}
          sx={{ cursor: 'pointer' }}
        >
          <ImageIcon />
          <Typography variant="body1">Image</Typography>
        </Box>
        <br />
        <Box>
          <Typography variant="h6" mb={0.5}>
            Font
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
};
