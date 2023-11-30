import React from 'react';

import Image from 'next/image';

import {
  Box,
  Button,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from '@mui/material';

import useMailBox from './useMailBox';

import {
  ArrowDownIcon,
  DotsBoldIcon,
  ReplyAllIcon,
  ReplyMailIcon,
} from '@/assets/icons';

import { styles } from '../Mailing.style';
import ReplyMail from './ReplyMail';

const MailBox = ({ data, type }: any) => {
  const { theme, isToggleOpen, setIsToggleOpen, isReply, setIsReply } =
    useMailBox();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event?.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const customToolbar = [
    ['bold', 'italic', 'underline'],
    [{ align: 'center' }, { align: 'right' }, { align: 'justify' }],
    [{ list: 'bullet' }, { list: 'ordered' }],
    [{ color: [] }],
    ['capitalize'],
    ['emoji'],
  ];

  return (
    <Box sx={styles?.mainMailingWrapper}>
      <Box sx={styles?.contentContainer}>
        <Box
          sx={{
            padding: '20px',
            '@media (max-width:1247px)': {
              padding: '55px 20px 20px 20px',
            },
            '@media (max-width:500px)': {
              padding: '80px 20px 20px 20px',
            },
          }}
        >
          <Grid container spacing={1}>
            <Grid item xs={2} sm={12} md={2} lg={1}>
              <Box sx={styles?.mailMenu}>
                <Typography
                  variant="body3"
                  sx={{ color: theme?.palette?.grey[900] }}
                >
                  {data?.timeStamp}
                </Typography>
                <Box sx={styles?.menuItems}>
                  <Box sx={{ cursor: 'pointer' }}>
                    <Tooltip title="Reply all" placement="bottom" arrow>
                      <IconButton>
                        <ReplyAllIcon />
                      </IconButton>
                    </Tooltip>
                  </Box>
                  <Box
                    sx={{ cursor: 'pointer' }}
                    onClick={() => setIsReply(true)}
                  >
                    <Tooltip title="Reply" placement="bottom" arrow>
                      <IconButton>
                        <ReplyMailIcon />
                      </IconButton>
                    </Tooltip>
                  </Box>

                  <Box
                    sx={{
                      transform: 'scaleX(-1)',
                      width: 'fit-content',
                      cursor: 'pointer',
                    }}
                  >
                    <Tooltip title="Forward" placement="bottom" arrow>
                      <IconButton>
                        <ReplyMailIcon />
                      </IconButton>
                    </Tooltip>
                  </Box>

                  <Button
                    sx={styles?.unStyledButton}
                    id="basic-button"
                    aria-controls={open ? 'basic-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}
                  >
                    <DotsBoldIcon />
                  </Button>

                  <Box
                    onClick={() => setIsToggleOpen(!isToggleOpen)}
                    sx={{ cursor: 'pointer', paddingTop: '5px' }}
                  >
                    <ArrowDownIcon size={'20'} />
                  </Box>
                </Box>
              </Box>
              <Box>
                <Image
                  src={data?.userImage}
                  width={50}
                  height={50}
                  alt="user"
                />
              </Box>
            </Grid>
            <Grid item xs={10} sm={12} md={10} lg={11}>
              <Box>
                <Typography variant="h5">{data?.userName}</Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                  {type === 'main' && (
                    <Typography
                      variant="body3"
                      sx={{
                        color: theme?.palette?.grey[600],
                        fontWeight: '600',
                      }}
                    >
                      {isToggleOpen && type === 'main' && 'From :'} {data?.from}{' '}
                    </Typography>
                  )}
                  <Typography
                    variant="body3"
                    sx={{ color: theme?.palette?.grey[600], fontWeight: '600' }}
                  >
                    {type === 'main' && isToggleOpen && <>To : {data?.to}</>}
                    {type === 'reply' && <>To : {data?.to}</>}
                  </Typography>
                </Box>

                <Box mt={1}>
                  <Typography variant="h6" fontWeight={400}>
                    <strong>Email Subject : </strong>
                    {data?.subject}
                  </Typography>
                </Box>
                {isToggleOpen ? (
                  <Box mt={2}>
                    <Typography
                      variant="body2"
                      dangerouslySetInnerHTML={{ __html: data?.body }}
                    />
                  </Box>
                ) : (
                  <Box
                    sx={{ transform: 'rotate(90deg)', width: 'fit-content' }}
                  >
                    <DotsBoldIcon />
                  </Box>
                )}
              </Box>
            </Grid>
          </Grid>
        </Box>
        {type === 'reply' && isReply && (
          <>
            <ReplyMail data={data} customToolbar={customToolbar} />
          </>
        )}
      </Box>

      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleClose}>Delete</MenuItem>
        <MenuItem onClick={handleClose}>Report As Spam</MenuItem>
      </Menu>
    </Box>
  );
};

export default MailBox;
