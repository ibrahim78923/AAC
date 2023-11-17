import {
  Card,
  CardHeader,
  CardMedia,
  Typography,
  Avatar,
  CardContent,
  Box,
  Grid,
  Button,
  Popover,
  FormControlLabel,
  Checkbox,
} from '@mui/material';

import SwitchableDatepicker from '@/components/SwitchableDatepicker';

import PostBoxModalBox from './PostBoxModalBox';
import usePostBox from './usePostBox';
import ContactsActions from './PostBoxActions';
import { customizeData } from './Customize/Cutomize.data';
import { postCardsData } from './PostCards.data';

import { SettingsIcon } from '@/assets/icons';

import { v4 as uuidv4 } from 'uuid';

const PostBox = () => {
  const {
    handlePostBox,
    isPostModal,
    open,
    handleClose,
    handleClick,
    anchorEl,
    handleDatePicker,
    showDatePicker,
  } = usePostBox();
  const postBoxColor: any = {
    posted: 'rgba(58, 131, 126, 0.20)',
    scheduled: 'rgba(121, 94, 199, 0.20)',
    drafts: 'rgba(235, 222, 48, 0.20)',
    pendingApproval: 'rgba(2, 182, 119, 0.20)',
    rejected: 'rgba(52, 155, 248, 0.20)',
    failed: 'rgba(255, 30, 30, 0.20)',
  };
  return (
    <>
      <Box
        sx={{
          mb: '15px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <ContactsActions />
        <Box>
          <Button
            sx={{ gap: 1, height: '35px' }}
            variant="outlined"
            onClick={handleClick}
          >
            <SettingsIcon />
            Customize
          </Button>
          <Popover
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
          >
            {customizeData?.map((data) => (
              <Box sx={{ ml: 1 }} key={uuidv4()}>
                <FormControlLabel control={<Checkbox />} label={data?.label} />
              </Box>
            ))}
          </Popover>
          <Button
            onClick={handleDatePicker}
            sx={{ ml: '10px', height: '35px' }}
            variant="outlined"
          >
            Date
          </Button>
          {showDatePicker && <SwitchableDatepicker />}
        </Box>
      </Box>
      <Grid container spacing={2}>
        {postCardsData?.map(({ category, data }: any) => (
          <Grid item lg={2} key={category}>
            <Box border="1px solid #E5E7EB" borderRadius="5px">
              <Box
                p="10px"
                display={'flex'}
                alignItems={'center'}
                justifyContent={'space-between'}
              >
                <Typography
                  sx={{ textTransform: 'capitalize', fontWeight: 500 }}
                  variant="h6"
                >
                  {category}
                </Typography>
                <Typography
                  sx={{
                    background: '#4CCFBC',
                    color: '#FFFFFF',
                    borderRadius: '4px',
                    padding: '3px',
                  }}
                >
                  {data?.length < 10 ? `0${data?.length}` : data?.length}
                </Typography>
              </Box>
              <Box sx={{ p: '10px', background: postBoxColor[category] }}>
                {data?.map((item: any) => (
                  <Card
                    sx={{
                      width: '100%',
                      p: '10px',
                      position: 'relative',
                      mt: '10px',
                    }}
                    onClick={handlePostBox}
                    key={uuidv4()}
                  >
                    <Box
                      sx={{
                        position: 'absolute',
                        right: '5px',
                        top: '6px',
                        backgroundColor: 'white',
                        borderRadius: '50%',
                        width: '20px',
                        height: '20px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    >
                      <Avatar
                        src="https://static.vecteezy.com/system/resources/previews/023/986/613/non_2x/facebook-logo-facebook-logo-transparent-facebook-icon-transparent-free-free-png.png"
                        alt="icon"
                        sx={{ width: '15px', height: '15px' }}
                      ></Avatar>
                    </Box>
                    <CardMedia
                      component="img"
                      height="81"
                      image={item?.image}
                    />
                    <CardHeader
                      avatar={
                        <Avatar
                          src={item?.avatar}
                          sx={{ width: '30px', height: '30px' }}
                        >
                          R
                        </Avatar>
                      }
                      title={
                        <Typography variant="body4" fontWeight={600}>
                          {item?.heading}
                        </Typography>
                      }
                      subheader={
                        <Typography fontSize={8}>{item?.date}</Typography>
                      }
                      sx={{ py: '6px', px: '0px' }}
                    />
                    <CardContent sx={{ p: '0px' }}>
                      <Typography variant="body4">
                        {item?.description}
                      </Typography>
                    </CardContent>
                  </Card>
                ))}
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
      <PostBoxModalBox open={isPostModal} onClose={handlePostBox} />
    </>
  );
};

export default PostBox;
