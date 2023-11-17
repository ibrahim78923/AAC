import Image from 'next/image';

import {
  Box,
  Button,
  Divider,
  Grid,
  StepLabel,
  Stepper,
  SvgIcon,
  Typography,
  useTheme,
} from '@mui/material';

import CommonModal from '@/components/CommonModal';

import { styles } from './style';

import usePostBox from '../usePostBox';

import {
  ActionsIcon,
  BiAcivityIcon,
  CloseModalIcon,
  CommentIcon,
  FillCheckboxIcon,
  LikeIcon,
  MultipleUserIcon,
  ShareIcon,
} from '@/assets/icons';
import { NatureFreekImage, SeaImage } from '@/assets/images';
import { postBoxSteps } from '@/mock/modules/airMarketer/SocialMarketing';
import DeleteModalBox from '../DeleteModalBox';

import { v4 as uuidv4 } from 'uuid';

const PostBoxModalBox = ({ open, onClose }: any) => {
  const theme = useTheme();
  const { handleSubmit, isDeleteModal } = usePostBox();
  return (
    <>
      <CommonModal
        open={open}
        handleClose={onClose}
        title=""
        okText=""
        cancelText=""
        submitIcon
        footer={false}
        footerFill
        headerIcon
      >
        <Box mt="-20px" textAlign="end">
          <SvgIcon onClick={onClose} sx={{ cursor: 'pointer' }}>
            <CloseModalIcon />
          </SvgIcon>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'end', mb: '25px' }}>
          <Typography sx={styles?.postedStyle} variant="h5">
            Posted <FillCheckboxIcon />
          </Typography>
        </Box>
        <Grid container>
          <Grid item xs={8} borderRadius="8px" border="1px solid #DADDE1">
            <Box display="flex" justifyContent="space-between" padding="15px">
              <Box display="flex" gap={1.5}>
                <Box>
                  <Image src={NatureFreekImage} alt="image" />
                </Box>
                <Box>
                  <Typography sx={{ fontSize: '15px', fontWeight: 700 }}>
                    Nature Freek
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography variant="body4">5 min .</Typography>
                    <MultipleUserIcon />
                  </Box>
                </Box>
              </Box>
              <Box>
                <SvgIcon onClick={handleSubmit}>
                  <ActionsIcon />
                </SvgIcon>
              </Box>
            </Box>
            <Box sx={{ padding: '10px' }}>
              <Typography sx={{ color: '#1D2129' }}>
                {`Hey guys! I really love the city pop hit Plastic Love and I'm
                working on a new cover of it! 😊😊😊😊`}
              </Typography>
              <Typography sx={{ color: '#50ABF1' }}>
                @zackben#nature #beauty #mountain #travel
              </Typography>
            </Box>

            <Image src={SeaImage} alt="image" />

            <Divider sx={{ my: '10px' }} />

            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-around',
                mb: '10px',
                alignItems: 'center',
              }}
            >
              <Button
                disableRipple
                sx={{ color: '#606770', fontSize: '500' }}
                startIcon={<LikeIcon />}
              >
                3.6 k
              </Button>
              <Button
                sx={{ color: '#606770', fontSize: '500' }}
                startIcon={<CommentIcon />}
              >
                2.1 k
              </Button>
              <Button
                sx={{ color: '#606770', fontSize: '500' }}
                startIcon={<ShareIcon />}
              >
                2.6 k
              </Button>
            </Box>
          </Grid>

          <Grid item>
            <Typography>
              {' '}
              <BiAcivityIcon /> Activity
            </Typography>
            <Box sx={{ maxWidth: 400 }}>
              <Box sx={{ maxWidth: 400 }}>
                <Stepper activeStep={6} orientation="vertical">
                  {postBoxSteps?.map((step: any) => (
                    <StepLabel
                      key={uuidv4()}
                      sx={{ display: 'flex' }}
                      icon={step?.icon}
                    >
                      <Box
                        sx={{
                          display: 'flex',
                          gap: 8,
                          mt: '15px',
                          color: theme?.palette?.custom?.steel_blue,
                        }}
                      >
                        <Typography variant="body4">{step?.label}</Typography>
                        <Typography variant="body4">{step?.time}</Typography>
                      </Box>
                      <Typography sx={{ color: '#4E4B66' }} variant="body4">
                        {step?.description(theme)}
                      </Typography>
                    </StepLabel>
                  ))}
                </Stepper>
              </Box>
            </Box>
          </Grid>
        </Grid>
        <DeleteModalBox
          isDeleteModal={isDeleteModal}
          handleSubmit={handleSubmit}
        />
      </CommonModal>
    </>
  );
};
export default PostBoxModalBox;
