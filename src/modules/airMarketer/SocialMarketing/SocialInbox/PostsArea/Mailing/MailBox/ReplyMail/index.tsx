import React from 'react';

import { Box, Button, Menu, MenuItem, Typography } from '@mui/material';

import TextEditor from '@/components/TextEditor';
import useMailBox from '../useMailBox';

import { ArrowDownIcon } from '@/assets/icons';

import { styles } from '../../Mailing.style';

const ReplyMail = ({ data, customToolbar }: any) => {
  const {
    theme,
    setIsReply,
    editorValue,
    setEditorValue,
    open,
    handleClick,
    handleClose,
    anchorEl,
  } = useMailBox();

  return (
    <>
      <Box
        sx={{ borderTop: `1px solid ${theme?.palette?.custom?.dark}`, p: 2 }}
      >
        <Box
          sx={{
            background: theme?.palette?.grey[100],
            border: `1px solid ${theme?.palette?.grey[700]}`,
            p: 2,
            borderRadius: '12px',
          }}
        >
          <Typography
            variant="body2"
            dangerouslySetInnerHTML={{ __html: data?.body }}
          />
        </Box>
        <Box
          sx={{
            border: `1px solid ${theme?.palette?.grey[700]}`,
            borderRadius: '8px',
            mt: 2,
          }}
        >
          <TextEditor
            isBorder={false}
            isBackground={false}
            height={'100px'}
            value={editorValue}
            setValue={setEditorValue}
            customToolbar={customToolbar}
          />
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              paddingRight: '15px',
              paddingBottom: '15px',
            }}
          >
            <Box sx={styles?.sendMailButton}>
              <Button variant="contained" onClick={() => setIsReply(false)}>
                Send
              </Button>
              <Button
                variant="contained"
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                sx={{ padding: '0px 10px 0px 10px' }}
              >
                <ArrowDownIcon
                  size={'20'}
                  color={theme?.palette?.common?.white}
                />
              </Button>
            </Box>
          </Box>
        </Box>
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
        <MenuItem onClick={handleClose}>Send</MenuItem>
        <MenuItem onClick={handleClose}>Schedule</MenuItem>
      </Menu>
    </>
  );
};

export default ReplyMail;
