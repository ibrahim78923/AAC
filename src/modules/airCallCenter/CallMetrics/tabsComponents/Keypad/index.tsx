import React from 'react';
import { Box, IconButton, Popover, Typography } from '@mui/material';
import { DeleteCrossIcon } from '@/assets/icons';
import Image from 'next/image';
import { AvatarCompanyImage } from '@/assets/images';
import { FormProvider, RHFTextField } from '@/components/ReactHookForm';
import { keypadData } from './Keypad.data';
import CallIcon from '@mui/icons-material/Call';
import { useKeypad } from './useKeypad';

const Keypad = ({ children, setStartPowerDialerModal }: any) => {
  const {
    anchorEl,
    open,
    id,
    method,
    phoneNo,
    handleClick,
    handleClose,
    onSubmit,
    setValue,
    theme,
  } = useKeypad();
  return (
    <>
      {React.cloneElement(children, { onClick: handleClick })}
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <Box width={343} px={3}>
          <Box
            display="flex"
            alignItems="center"
            gap={2}
            flexDirection="column"
            mt={4}
            mb={3}
          >
            <Box sx={{ width: 90, height: 90, borderRadius: '50%' }}>
              <Image
                src={AvatarCompanyImage}
                alt="Avatar"
                width={90}
                height={90}
              />
            </Box>
            <Typography variant="body1" fontWeight={600} color="custom.main">
              John Doe
            </Typography>
          </Box>
          <FormProvider
            methods={method}
            onSubmit={method?.handleSubmit(onSubmit)}
          >
            <RHFTextField
              fullWidth={true}
              size="small"
              name="phoneNo"
              InputProps={{
                endAdornment: (
                  <IconButton
                    onClick={() => method?.setValue('phoneNo', '')}
                    size="small"
                    sx={{
                      '& path': {
                        fill: theme?.palette?.custom?.grayish_blue,
                      },
                    }}
                  >
                    <DeleteCrossIcon />
                  </IconButton>
                ),
              }}
            />
            <Box display="flex" flexDirection="column" gap={2}>
              {keypadData?.map((row) => (
                <Box
                  key={row?.toString()}
                  display="flex"
                  justifyContent="center"
                  gap={2}
                >
                  {row.map((item) => (
                    <IconButton
                      sx={{ width: 40, height: 40, bgcolor: 'grey.400' }}
                      key={item?.id}
                      onClick={() =>
                        setValue('phoneNo', `${phoneNo}${item?.number}`)
                      }
                    >
                      <Box
                        width={40}
                        height={40}
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                        justifyContent="center"
                      >
                        <Typography
                          variant="formTopHeading"
                          fontWeight={400}
                          color="slateBlue.main"
                        >
                          {item?.number}
                        </Typography>
                        {item?.characters && (
                          <Typography fontSize={6} color="slateBlue.main">
                            {item?.characters}
                          </Typography>
                        )}
                      </Box>
                    </IconButton>
                  ))}
                </Box>
              ))}
            </Box>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              my={2}
            >
              <IconButton
                sx={{
                  bgcolor: 'success.main',
                  color: 'common.white',
                  '&:hover': { bgcolor: 'success.main' },
                }}
                onClick={() => setStartPowerDialerModal(true)}
              >
                <CallIcon sx={{ fontSize: 40, rotate: '-10deg' }} />
              </IconButton>
            </Box>
          </FormProvider>
        </Box>
      </Popover>
    </>
  );
};

export default Keypad;
