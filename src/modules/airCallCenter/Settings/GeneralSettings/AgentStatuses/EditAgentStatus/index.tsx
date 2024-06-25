import React, { useState } from 'react';
import {
  Box,
  Button,
  Grid,
  IconButton,
  Popover,
  Typography,
  useTheme,
} from '@mui/material';
import { FormProvider, RHFTextField } from '@/components/ReactHookForm';
import { EditAgentStatusPropsI } from './EditAgentStatus.interface';
import { editAgentStatusFields } from './EditAgentStatus.data';
import CommonDrawer from '@/components/CommonDrawer';
import CloseIcon from '@/assets/icons/shared/close-icon';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import EmojiPickerComponent from '../NewAgentStatus/EmojiPicker';
import CustomLabel from '@/components/CustomLabel';

const EditAgentStatus = ({
  isDrawerOpen,
  onClose,
  handleSubmit,
  formMethods, // isLoading,
  newStatusAdded,
  text,
  setText,
}: EditAgentStatusPropsI) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleFieldClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleClear = () => {
    setText('');
    setAnchorEl(null);
  };
  const handleEmojiSelect = (emoji: any) => {
    setText((prevInput: any) => prevInput + emoji?.emoji);

    handleClose();
  };

  const isOpen = Boolean(anchorEl);
  const id = isOpen ? 'emoji-popover' : undefined;
  const theme = useTheme();

  return (
    <CommonDrawer
      isDrawerOpen={isDrawerOpen}
      onClose={onClose}
      title="Edit Agent Status"
      okText="Save"
      isOk={true}
      footer={true}
      submitHandler={handleSubmit}
    >
      <FormProvider methods={formMethods}>
        <Grid container spacing={'22px'}>
          {editAgentStatusFields?.map((item: any) => (
            <Grid item xs={12} md={item?.md} key={item?.id}>
              <item.component {...item.componentProps} size={'small'}>
                {item?.componentProps?.select
                  ? item?.options?.map((option: any) => (
                      <option key={option?.value} value={option?.value}>
                        {option?.label}
                      </option>
                    ))
                  : null}
              </item.component>
            </Grid>
          ))}
        </Grid>
        <div>
          <CustomLabel label={'Emoji'} required={false} />
          <Popover
            id={id}
            open={isOpen}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
            style={{ zIndex: 9999 }}
          >
            <EmojiPickerComponent onEmojiSelect={handleEmojiSelect} />
          </Popover>
        </div>
        <Button
          onClick={handleFieldClick}
          sx={{
            background: 'none !important',
            cursor: 'pointer',
            border: '1px solid #C4C4C4', // this color is not present in theme
            '&:hover': {
              borderColor: theme.palette.grey[500],
              background: 'none !important',
            },
            '&:focus': {
              border: `2px solid ${theme.palette.primary.main}`,
              borderColor: theme.palette.primary.main,
              background: 'none !important',
            },
            '&:active': {
              border: `2px solid ${theme.palette.primary.main}`,
              borderColor: theme.palette.primary.main,
              background: 'none !important',
            },

            width: '100%',
            height: '44px',
            display: 'flex',
            justifyContent: 'space-between',
          }}
          aria-label="toggle emoji picker"
        >
          <span>{text}</span>
          {text.length > 0 ? (
            <IconButton sx={{ cursor: 'pointer' }} onClick={handleClear}>
              <CloseIcon />
            </IconButton>
          ) : (
            <IconButton sx={{ cursor: 'pointer' }} onClick={handleClear}>
              <ArrowDropDownIcon />
            </IconButton>
          )}
        </Button>

        {!newStatusAdded && (
          <Box sx={{ mt: '1rem' }}>
            <Typography variant="body2">
              After call work is defined as the process of wrapping up the
              current call before being available for the next call
            </Typography>
            <Box
              display={'flex'}
              justifyContent={'center'}
              flexDirection={'row'}
              padding={'0.8rem'}
              sx={{
                background: `${theme?.palette?.primary?.light}`,
                mt: '1rem',
              }}
              gap={3}
            >
              <Typography
                variant="body2"
                fontWeight={500}
                sx={{ mt: '0.5rem' }}
              >
                Set After Call Work Time
              </Typography>
              <Grid item xs={3} lg={2} md={2} sx={{ width: '80px' }}>
                <RHFTextField
                  name="afterCallWorkTime"
                  size="small"
                  type="number"
                />
              </Grid>
              <Typography variant="body2" sx={{ mt: '0.5rem' }}>
                seconds
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ mt: '1rem' }}>
              <span style={{ color: `${theme?.palette?.primary?.main}` }}>
                Note:
              </span>{' '}
              You can set the after call work time from 0 seconds and a maximum
              of upto 60 minutes
            </Typography>
          </Box>
        )}
      </FormProvider>
    </CommonDrawer>
  );
};

export default EditAgentStatus;
